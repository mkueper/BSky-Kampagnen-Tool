# notes/codex-remember.md

## Zweck

Projektbezogenes Gedächtnis für Informationen, die **sessionübergreifend** wichtig sind.

* **Keine** Prozessregeln (Git, Lint/Test/Build, Ausgaberegeln, Rückfragepflichten etc.) – diese stehen in `AGENTS.md` bzw. `.codex/AGENTS.project.md`.
* Wenn etwas wie eine Regel klingt, gehört es in AGENTS – hier stehen nur stabile, inhaltliche Leitplanken und Kontext.

---

## Produkt-/UI-Leitplanken

* Bei UI-Labels nach Möglichkeit die Original-Bezeichnungen von Bluesky beibehalten.
* Bei der Kernfunktionalität möglichst dem Original (Bluesky / bsky.app) folgen, sofern nichts anderes festgelegt ist.

---

## Dokumentation

* Nach nennenswerten Erweiterungen oder Änderungen **`changelog-unreleased`** zeitnah aktualisieren.
* Als „nennenswert“ gelten typischerweise: neue Features, i18n-Umbauten oder UI-Refactors.
- Offene Entscheidung: Im ProfileConnectionsModal soll die Follower/Folge-Ich-Anzahl weiterhin angezeigt werden, aber nicht als Subtitle im Header (verursacht Springen). Morgen klären, wo/how stattdessen platzieren. Außerdem Radien-Mismatch zwischen DetailPaneHeader und BskyDetailPane-Body prüfen.
- Erweiterungen gemerkt: Übersetzungsfunktion ins Unroll-Modal integrieren; eingebettete Medien im Unroll anzeigen.
