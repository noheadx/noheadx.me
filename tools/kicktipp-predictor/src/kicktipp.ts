import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

export interface Game {
  homeTeam: string;
  awayTeam: string;
  matchday: string;
  kickoff: string;
  inputIndex: number;
}

export interface TipSubmission {
  inputIndex: number;
  homeScore: number;
  awayScore: number;
}

const BASE_URL = 'https://www.kicktipp.de';

export class KicktippClient {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private community: string;
  private headless: boolean;

  constructor(community: string, headless = true) {
    this.community = community;
    this.headless = headless;
  }

  private findChromiumExecutable(): string | undefined {
    const candidates = [
      '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
      '/opt/pw-browsers/chromium-1223/chrome-linux64/chrome',
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) return p;
    }
    return undefined; // let Playwright find it
  }

  async init(): Promise<void> {
    const executablePath = this.findChromiumExecutable();
    this.browser = await chromium.launch({
      headless: this.headless,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader'],
    });
    const context = await this.browser.newContext({
      locale: 'de-DE',
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    });
    this.page = await context.newPage();
  }

  private async screenshot(name: string): Promise<void> {
    if (!this.page) return;
    const dir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await this.page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true });
    console.log(`  [Screenshot saved: screenshots/${name}.png]`);
  }

  async login(username: string, password: string): Promise<void> {
    if (!this.page) throw new Error('Client not initialized');

    console.log('  Navigating to login page...');
    await this.page.goto(`${BASE_URL}/info/profil/login`, { waitUntil: 'networkidle' });

    const kennungInput = this.page.locator('input[name="kennung"]');
    const passwortInput = this.page.locator('input[name="passwort"]');

    await kennungInput.fill(username);
    await passwortInput.fill(password);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }),
      this.page.click('input[type="submit"]'),
    ]);

    const currentUrl = this.page.url();
    if (currentUrl.includes('/login')) {
      await this.screenshot('login-failed');
      throw new Error('Login fehlgeschlagen. Bitte Zugangsdaten prüfen.');
    }

    console.log('  Login erfolgreich!');
  }

  async getUpcomingGames(): Promise<Game[]> {
    if (!this.page) throw new Error('Client not initialized');

    const tippUrl = `${BASE_URL}/${this.community}/tippabgabe`;
    console.log(`  Navigating to: ${tippUrl}`);
    await this.page.goto(tippUrl, { waitUntil: 'networkidle', timeout: 20000 });

    // Aktiven Spieltag-Header ermitteln
    let matchday = 'Nächster Spieltag';
    for (const sel of ['.spieltagHeader', '.aktuellerSpieltag', 'h2.spieltag', '.matchday-header', 'h2']) {
      const el = this.page.locator(sel).first();
      if (await el.count() > 0) {
        const text = (await el.textContent())?.trim();
        if (text) { matchday = text; break; }
      }
    }
    console.log(`  Spieltag: ${matchday}`);

    // Tipping-Zeilen finden: Zeilen mit mind. 2 numerischen Eingabefeldern
    const games: Game[] = [];
    const allRows = await this.page.$$('form tr, .tippTable tr, table tr');
    let inputIndex = 0;

    for (const row of allRows) {
      const inputs = await row.$$('input[type="text"], input[type="number"], input.tipp-input');
      if (inputs.length < 2) continue;

      // Beide Inputs sollten Tipp-Felder sein (kein hidden, kein submit)
      const firstType = await inputs[0].getAttribute('type');
      if (firstType === 'hidden' || firstType === 'submit') continue;

      // Team-Namen aus der Zeile extrahieren
      const cells = await row.$$('td');
      const cellTexts: string[] = [];
      for (const cell of cells) {
        const text = (await cell.textContent())?.trim().replace(/\s+/g, ' ') || '';
        if (text && !text.match(/^\d+:\d+$/) && text.length > 1) {
          cellTexts.push(text);
        }
      }

      // Heim- und Gastmannschaft ermitteln
      // Typisches Layout: [Datum/Zeit, Heim, Tipp, Gast, Odds/Punkte...]
      let homeTeam = '';
      let awayTeam = '';
      let kickoff = '';

      // Heuristic: erstes zelltext-ähnliches, zweites zellentext-ähnliches
      const teamCandidates = cellTexts.filter(
        (t) =>
          !t.match(/^\d{2}:\d{2}$/) && // kein reines Uhrzeitformat
          !t.match(/^\d+\.\d+\.$/) &&  // kein Datum
          t.length > 2
      );

      if (teamCandidates.length >= 2) {
        // Suche nach Uhrzeitfeld für kickoff
        const timeCell = cellTexts.find((t) => t.match(/\d{2}:\d{2}/));
        if (timeCell) kickoff = timeCell;

        homeTeam = teamCandidates[0];
        awayTeam = teamCandidates[1];
      }

      if (homeTeam && awayTeam && homeTeam !== awayTeam) {
        games.push({ homeTeam, awayTeam, matchday, kickoff, inputIndex });
        inputIndex++;
      }
    }

    if (games.length === 0) {
      await this.screenshot('no-games-found');
      console.warn('  Keine offenen Spiele gefunden. Möglicherweise sind alle Spiele bereits getippt oder die Tippabgabe ist geschlossen.');
    }

    return games;
  }

  async submitTips(tips: TipSubmission[]): Promise<void> {
    if (!this.page) throw new Error('Client not initialized');

    // Alle Tipp-Eingabefelder auf der Seite sammeln (gepaart: Heim, Gast)
    const allInputPairs = await this.collectInputPairs();

    if (allInputPairs.length === 0) {
      throw new Error('Keine Eingabefelder auf der Seite gefunden.');
    }

    for (const tip of tips) {
      const pair = allInputPairs[tip.inputIndex];
      if (!pair) {
        console.warn(`  Kein Eingabefeld für Index ${tip.inputIndex} gefunden`);
        continue;
      }

      await pair.home.fill(String(tip.homeScore));
      await pair.away.fill(String(tip.awayScore));
      console.log(`  Tipp eingetragen: ${tip.homeScore}:${tip.awayScore} (Index ${tip.inputIndex})`);
    }

    await this.screenshot('before-submit');

    // Speichern-Button klicken
    const submitSelectors = [
      'input[type="submit"][value="Speichern"]',
      'input[type="submit"]',
      'button[type="submit"]',
      '.submitButton',
      'button:has-text("Speichern")',
    ];

    let submitted = false;
    for (const sel of submitSelectors) {
      const btn = this.page.locator(sel).first();
      if (await btn.count() > 0) {
        await Promise.all([
          this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
          btn.click(),
        ]);
        submitted = true;
        break;
      }
    }

    if (!submitted) {
      await this.screenshot('submit-button-not-found');
      throw new Error('Speichern-Button nicht gefunden.');
    }

    await this.screenshot('after-submit');
  }

  private async collectInputPairs(): Promise<Array<{ home: ReturnType<Page['locator']>; away: ReturnType<Page['locator']> }>> {
    if (!this.page) throw new Error('Client not initialized');

    // Suche in Zeilen nach Paaren von Text-Inputs
    const allRows = await this.page.$$('form tr, table tr');
    const pairs: Array<{ home: ReturnType<Page['locator']>; away: ReturnType<Page['locator']> }> = [];

    for (const row of allRows) {
      const inputs = await row.$$('input[type="text"], input[type="number"]');
      if (inputs.length >= 2) {
        const type0 = await inputs[0].getAttribute('type');
        if (type0 === 'hidden') continue;

        // Namen der Inputs für stabile Selektion ermitteln
        const name0 = await inputs[0].getAttribute('name') || await inputs[0].getAttribute('id') || '';
        const name1 = await inputs[1].getAttribute('name') || await inputs[1].getAttribute('id') || '';

        const homeLocator = name0
          ? this.page.locator(`[name="${name0}"], [id="${name0}"]`).first()
          : this.page.locator('input').nth(pairs.length * 2);
        const awayLocator = name1
          ? this.page.locator(`[name="${name1}"], [id="${name1}"]`).first()
          : this.page.locator('input').nth(pairs.length * 2 + 1);

        pairs.push({ home: homeLocator, away: awayLocator });
      }
    }

    return pairs;
  }

  async close(): Promise<void> {
    await this.browser?.close();
  }
}
