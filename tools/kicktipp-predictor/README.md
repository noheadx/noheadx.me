# WM 2026 Kicktipp-Predictor

Automatischer Tipp-Bot für Kicktipp.de – nutzt Claude AI (mit Web-Suche) um Spielergebnisse zu recherchieren und zu tippen.

## Setup

### 1. Abhängigkeiten installieren
```bash
cd tools/kicktipp-predictor
npm install
```

### 2. Konfiguration
```bash
cp .env.example .env
# Dann .env bearbeiten:
nano .env
```

Folgende Werte eintragen:
- `KICKTIPP_USERNAME` – deine Kicktipp.de E-Mail
- `KICKTIPP_PASSWORD` – dein Kicktipp.de Passwort
- `KICKTIPP_COMMUNITY` – Community-Name aus der URL (Standard: `wm-tippspiel-i-wm-tippspiel`)
- `ANTHROPIC_API_KEY` – API-Key von https://console.anthropic.com

## Verwendung

```bash
# Tipps für nächsten Spieltag abgeben
npm run predict

# Mit sichtbarem Browser (zum Debuggen)
npm run predict:visible
```

## Ablauf

1. Bot loggt sich bei Kicktipp.de ein
2. Öffnet die Tippabgabe-Seite
3. Ermittelt alle offenen Spiele des nächsten Spieltags
4. Für jedes Spiel: Claude AI recherchiert via Web-Suche und analysiert
   - Aktuelle Form beider Teams
   - Head-to-Head Statistiken
   - Verletzungen/Sperren
   - WM-Kontext (Gruppe, K.O.-Phase)
5. Trägt alle Tipps ein und speichert

## Debug-Tipps

Bei Problemen:
- `HEADLESS=false npm run predict` – Browser sichtbar schalten
- Screenshots werden unter `screenshots/` gespeichert
- Logs zeigen welche Selektoren gefunden wurden

## Hinweis

Die Tipp-Automatisierung funktioniert nur wenn:
- Die Tippabgabe für den Spieltag noch offen ist
- Spiele noch nicht getippt wurden (oder Änderungen noch möglich sind)
