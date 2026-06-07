import * as dotenv from 'dotenv';
import * as path from 'path';
import { KicktippClient } from './kicktipp';
import { predictGame, Prediction } from './predictor';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

interface Config {
  username: string;
  password: string;
  community: string;
  headless: boolean;
}

function loadConfig(): Config {
  const username = process.env.KICKTIPP_USERNAME;
  const password = process.env.KICKTIPP_PASSWORD;
  const community = process.env.KICKTIPP_COMMUNITY || 'wm-tippspiel-i-wm-tippspiel';
  const headless = process.env.HEADLESS !== 'false';

  if (!username || !password) {
    console.error('Fehler: KICKTIPP_USERNAME und KICKTIPP_PASSWORD müssen in der .env-Datei gesetzt sein.');
    console.error('Kopiere .env.example zu .env und trage deine Zugangsdaten ein.');
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Fehler: ANTHROPIC_API_KEY muss in der .env-Datei gesetzt sein.');
    process.exit(1);
  }

  return { username, password, community, headless };
}

function printBanner(): void {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   WM 2026 Kicktipp-Predictor  🤖⚽           ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
}

function printSummary(
  games: Array<{ homeTeam: string; awayTeam: string; matchday: string; kickoff: string; inputIndex: number }>,
  predictions: Map<number, Prediction>
): void {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('ZUSAMMENFASSUNG DER TIPPS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  for (const game of games) {
    const pred = predictions.get(game.inputIndex);
    if (pred) {
      const conf = { hoch: '●●●', mittel: '●●○', niedrig: '●○○' }[pred.confidence];
      console.log(`  ${game.homeTeam.padEnd(20)} ${pred.homeScore}:${pred.awayScore}  ${game.awayTeam.padEnd(20)} [${conf}]`);
      console.log(`    → ${pred.reasoning}`);
    }
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}

async function main(): Promise<void> {
  printBanner();

  const config = loadConfig();
  console.log(`Community: ${config.community}`);
  console.log(`Modus: ${config.headless ? 'Headless' : 'Sichtbar (Debug)'}`);
  console.log('');

  const client = new KicktippClient(config.community, config.headless);

  try {
    // 1. Browser initialisieren
    console.log('[1/4] Browser wird gestartet...');
    await client.init();

    // 2. Einloggen
    console.log('[2/4] Einloggen bei Kicktipp.de...');
    await client.login(config.username, config.password);

    // 3. Nächsten Spieltag laden
    console.log('[3/4] Spiele werden geladen...');
    const games = await client.getUpcomingGames();

    if (games.length === 0) {
      console.log('');
      console.log('Keine offenen Spiele zum Tippen gefunden.');
      console.log('Mögliche Gründe:');
      console.log('  • Alle Spiele sind bereits getippt');
      console.log('  • Die Tippabgabe ist noch nicht geöffnet');
      console.log('  • Die Tippfrist ist bereits abgelaufen');
      console.log('');
      console.log('Tipp: Öffne die Seite im Browser um den aktuellen Stand zu sehen:');
      console.log(`  https://www.kicktipp.de/${config.community}/tippabgabe`);
      return;
    }

    console.log('');
    console.log(`Gefundene Spiele (${games[0]?.matchday}):`);
    games.forEach((g) => console.log(`  • ${g.homeTeam} vs ${g.awayTeam}${g.kickoff ? ' (' + g.kickoff + ')' : ''}`));
    console.log('');

    // 4. KI-Vorhersagen einholen
    console.log('[4/4] KI-Analyse und Tippabgabe...');
    console.log('');

    const predictions = new Map<number, Prediction>();
    const tipsToSubmit: Array<{ inputIndex: number; homeScore: number; awayScore: number }> = [];

    for (const game of games) {
      console.log(`Analysiere: ${game.homeTeam} vs ${game.awayTeam}`);
      const prediction = await predictGame(game.homeTeam, game.awayTeam, game.matchday);

      console.log(`  Tipp: ${prediction.homeScore}:${prediction.awayScore} (Konfidenz: ${prediction.confidence})`);
      console.log(`  Begründung: ${prediction.reasoning}`);
      console.log('');

      predictions.set(game.inputIndex, prediction);
      tipsToSubmit.push({
        inputIndex: game.inputIndex,
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
      });
    }

    // Zusammenfassung anzeigen
    printSummary(games, predictions);

    // Tipps abgeben
    console.log('Tipps werden auf Kicktipp.de eingetragen und gespeichert...');
    await client.submitTips(tipsToSubmit);

    console.log('');
    console.log('Alle Tipps wurden erfolgreich abgegeben!');
    console.log(`Ergebnis prüfen: https://www.kicktipp.de/${config.community}/tippabgabe`);
    console.log('');
  } catch (error) {
    console.error('');
    console.error('Fehler aufgetreten:', error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
    console.error('');
    console.error('Screenshots (falls vorhanden) im Ordner ./screenshots/');
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
