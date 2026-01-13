# PR-Review-Checkliste – UI-Konsistenz

## Zweck

Diese Checkliste dient als **verbindliche Prüfbasis** für Pull Requests mit UI‑Änderungen.
Sie prüft **Konsistenz mit der UI‑Design‑Referenz**, nicht Designgeschmack oder neue Features.

Referenzdokument:

* *UI-Design-Konsistenz – Referenz*

---

## Anwendungsbereich

Diese Checkliste ist anzuwenden bei PRs mit:

* neuen oder geänderten Formularfeldern
* neuen UI‑Containern (Panels, Cards)
* Alerts, Bannern, Hinweisen
* Inline‑Buttons, Chips, Tool‑Buttons
* Layout‑ oder Spacing‑Änderungen

---

## 1. Form-Elemente

### Inputs / Textareas

* [ ] Verwenden Inputs/Textareas das **Standard‑Input‑Pattern**?
* [ ] Kein abweichendes Padding (`p-2`, `px-3`) ohne dokumentierte Begründung
* [ ] Keine alternative Rundung (`rounded-md`, `rounded-xl`) ohne Begründung
* [ ] Focus‑State vorhanden (`focus:ring-2`, Farbe korrekt)
* [ ] Breite wird über **Wrapper**, nicht über das Input selbst gesteuert

### Labels & Hints

* [ ] Labels nutzen `text-sm font-medium`
* [ ] Labels werden **nicht** als Überschriften missbraucht
* [ ] Hint‑Texte nutzen konsistent `text-xs text-foreground-muted`

---

## 2. Container & Layout

### Panels / Sections

* [ ] Panels nutzen das definierte Panel‑Pattern (`rounded-3xl p-6 …`)
* [ ] Keine willkürlichen Abweichungen bei Padding/Rundung

### Sub‑Cards

* [ ] Sub‑Cards folgen dem Sub‑Card‑Pattern (`rounded-2xl p-4 …`)
* [ ] Hierarchieebene ist konsistent zu vergleichbaren Views

---

## 3. Alerts & Banner

* [ ] Rolle klar: **Alert** (destructive) oder **Banner** (neutral)
* [ ] Alert/Banner nutzt das definierte Pattern (Padding, Rundung, Border‑Opacity)
* [ ] Keine modalen Warnungen für Banner‑Rollen

---

## 4. Inline‑Chips & Tool‑Buttons

* [ ] Inline‑Elemente nutzen das definierte **Chip‑ oder Chip‑Button‑Pattern**
* [ ] Einheitliche Typografie (`text-xs`, kein `text-[11px]` o. Ä.)
* [ ] Interaktive Varianten haben einen sichtbaren Focus‑State

---

## 5. Buttons

* [ ] Shared‑UI‑Button‑Varianten werden genutzt, sofern vorhanden
* [ ] Lokale Button‑Styles nur bei klarer semantischer Abweichung

---

## 6. Abweichungen

* [ ] Jede Abweichung vom Referenz‑Pattern ist **bewusst** und **begründet**
* [ ] Begründung ist im PR‑Text oder Code‑Kommentar dokumentiert

---

## Review‑Ergebnis

* [ ] PR ist **konform** mit der UI‑Design‑Referenz
* [ ] PR enthält **bewusste, dokumentierte Abweichungen**
* [ ] PR ist **nicht konform** (Änderungen erforderlich)

---

### Hinweis

Diese Checkliste ersetzt keine funktionale oder technische Code‑Review‑Prüfung.
Sie dient ausschließlich der **UI‑Konsistenz und Wartbarkeit**.
