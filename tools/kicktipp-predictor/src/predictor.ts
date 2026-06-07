import Anthropic from '@anthropic-ai/sdk';

export interface Prediction {
  homeScore: number;
  awayScore: number;
  confidence: 'hoch' | 'mittel' | 'niedrig';
  reasoning: string;
}

const client = new Anthropic();

const SYSTEM_PROMPT = `Du bist ein erfahrener Fußball-Analyst und Tipp-Experte, spezialisiert auf die FIFA WM 2026.
Deine Aufgabe ist es, für Kicktipp-Tiprunden das wahrscheinlichste Spielergebnis vorherzusagen.

Gehe bei jeder Vorhersage wie folgt vor:
1. Nutze die Web-Suche, um aktuelle Informationen zu sammeln:
   - Aktuelle Form beider Mannschaften (letzte 3-5 Spiele)
   - Head-to-Head Geschichte (besonders bei Turnieren)
   - Verletzungen und Sperren
   - WM 2026 Gruppenphase-Kontext (steht eine Mannschaft unter Druck?)
   - FIFA-Weltrangliste und aktuelle Verfassung

2. Analysiere die Faktoren und wähle ein realistisches, wahrscheinliches Ergebnis
   - Bevorzuge typische Turnier-Ergebnisse (1:0, 2:0, 1:1, 2:1, 0:0)
   - Bei klarem Favoriten: Klarer Sieg
   - Bei ausgeglichenen Teams: Knappes Ergebnis oder Unentschieden

3. Antworte AUSSCHLIESSLICH mit einem JSON-Objekt in diesem Format (kein anderer Text davor oder danach):
{
  "homeScore": <Zahl zwischen 0 und 5>,
  "awayScore": <Zahl zwischen 0 und 5>,
  "confidence": "<hoch|mittel|niedrig>",
  "reasoning": "<Kurze Begründung auf Deutsch, max. 2 Sätze>"
}`;

export async function predictGame(
  homeTeam: string,
  awayTeam: string,
  matchday: string,
  date: string = new Date().toLocaleDateString('de-DE')
): Promise<Prediction> {
  console.log(`  Recherchiere: ${homeTeam} vs ${awayTeam}...`);

  const userMessage = `Tippe das WM 2026 Spiel: ${homeTeam} vs ${awayTeam}
Spieltag/Runde: ${matchday}
Datum: ${date}

Suche nach aktuellen Informationen zu beiden Teams bei der WM 2026 und gib dann deine Vorhersage als JSON zurück.`;

  let messages: Anthropic.Beta.BetaMessageParam[] = [{ role: 'user', content: userMessage }];
  let finalText = '';

  // Agentic loop: Claude kann mehrfach web_search aufrufen
  for (let round = 0; round < 8; round++) {
    const response = await client.beta.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      betas: ['web-search-2025-03-05'],
      tools: [
        {
          type: 'web_search_20250305',
          name: 'web_search',
        },
      ],
      messages,
    });

    // Tool-Use verarbeiten
    const toolUseBlocks = response.content.filter((b) => b.type === 'tool_use');
    const textBlocks = response.content.filter((b) => b.type === 'text');

    if (response.stop_reason === 'end_turn' || toolUseBlocks.length === 0) {
      const lastText = textBlocks[textBlocks.length - 1];
      if (lastText && lastText.type === 'text') {
        finalText = lastText.text;
      }
      break;
    }

    // Anzahl der Suchanfragen loggen
    if (toolUseBlocks.length > 0) {
      console.log(`  [Runde ${round + 1}] Web-Suchen: ${toolUseBlocks.length}`);
    }

    // Assistant-Nachricht anhängen
    messages.push({ role: 'assistant', content: response.content as Anthropic.Beta.BetaContentBlock[] });

    // Tool-Ergebnisse werden vom Server verarbeitet (serverseitige Suche)
    // Für server-side tools fügen wir leere tool_result zurück
    const toolResults: Anthropic.Beta.BetaToolResultBlockParam[] = toolUseBlocks
      .filter((b) => b.type === 'tool_use')
      .map((block) => {
        const toolUse = block as Anthropic.Beta.BetaToolUseBlock;
        return {
          type: 'tool_result' as const,
          tool_use_id: toolUse.id,
          content: '',
        };
      });

    messages.push({ role: 'user', content: toolResults });
  }

  return parseJsonPrediction(finalText, homeTeam, awayTeam);
}

function parseJsonPrediction(text: string, homeTeam: string, awayTeam: string): Prediction {
  // JSON-Block aus dem Text herausschneiden
  const jsonMatch = text.match(/\{[\s\S]*?"homeScore"[\s\S]*?\}/);
  if (!jsonMatch) {
    console.warn(`  Kein gültiges JSON in der Antwort. Fallback-Tipp wird verwendet.`);
    if (text.length > 0) {
      console.warn(`  Antwort-Anfang: ${text.slice(0, 200)}`);
    }
    return fallbackPrediction(homeTeam, awayTeam);
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      homeScore: Math.max(0, Math.min(9, Math.round(Number(parsed.homeScore)))),
      awayScore: Math.max(0, Math.min(9, Math.round(Number(parsed.awayScore)))),
      confidence: (['hoch', 'mittel', 'niedrig'].includes(parsed.confidence) ? parsed.confidence : 'mittel') as
        | 'hoch'
        | 'mittel'
        | 'niedrig',
      reasoning: parsed.reasoning || 'Keine Begründung verfügbar.',
    };
  } catch {
    console.warn(`  JSON-Parsing fehlgeschlagen. Fallback-Tipp wird verwendet.`);
    return fallbackPrediction(homeTeam, awayTeam);
  }
}

function fallbackPrediction(homeTeam: string, awayTeam: string): Prediction {
  return {
    homeScore: 1,
    awayScore: 1,
    confidence: 'niedrig',
    reasoning: `Fallback-Tipp für ${homeTeam} vs ${awayTeam}: 1:1 (KI-Analyse nicht verfügbar).`,
  };
}
