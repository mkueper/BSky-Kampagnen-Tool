# UI-Design-Konsistenz – Referenz

## Zweck

Dieses Dokument definiert **verbindliche UI-Patterns** für das Dashboard.
Ziel ist **visuelle Konsistenz**, nicht ein Redesign.

Abweichungen sind zulässig **nur mit bewusster Begründung** (z. B. andere semantische Rolle).

---

## Grundprinzipien

* **Gleiche Rolle ⇒ gleiches Pattern**
* Layout-Breite wird **über Wrapper**, nicht über Inputs gesteuert
* Überschriften ≠ Labels
* „Kompakter“ Stil ist ein **eigenes Pattern**, kein Zufall

---

## 1. Form-Elemente

### 1.1 Standard-Input

*(Text, Number, Date, Time)*

```
w-full rounded-2xl border border-border bg-background-subtle
px-4 py-3 text-sm text-foreground shadow-soft
focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30
disabled:opacity-50 disabled:cursor-not-allowed
```

**Hinweise**

* `w-full` ist verpflichtend
* Breitenbegrenzung erfolgt über den umgebenden Container
* Kein alternatives Padding ohne eigenes Pattern

---

### 1.2 Textarea / Composer

```
w-full rounded-2xl border border-border bg-background-subtle
px-4 py-3 text-sm text-foreground shadow-soft
focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30
```

**Typografie-Abweichungen** (z. B. `font-mono`) sind **nur erlaubt**, wenn semantisch begründet.

---

### 1.3 Labels

```
text-sm font-medium text-foreground
```

**Wichtig**

* Labels sind **keine Überschriften**
* `font-semibold` oder größere Schrift nur für Headings

---

### 1.4 Helper / Hint-Texte

```
text-xs text-foreground-muted
```

---

## 2. Container-Elemente

### 2.1 Panels / Sections

*(oberste Inhaltsebene einer View)*

```
rounded-3xl border border-border shadow-soft p-6
```

---

### 2.2 Sub-Cards

*(Inhalt innerhalb eines Panels)*

```
rounded-2xl border border-border-muted bg-background-subtle/60 p-4
```

---

## 3. Alerts & Banner

### 3.1 Alert (Fehler / Warnung, z. B. destructive)

```
rounded-2xl border border-destructive/30 bg-destructive/10
p-3 text-sm text-foreground
```

---

### 3.2 Banner (neutral / informativ, z. B. Session-Warnung)

```
rounded-2xl border border-border-muted bg-background-subtle
p-4 text-sm text-foreground
```

**Hinweis**

* Banner sind **nicht blockierend**
* Keine Modals für diese Rolle

---

## 4. Inline-Chips & Tool-Buttons

### 4.1 Chip (nicht interaktiv)

```
rounded-full border border-border bg-background
px-2 py-1 text-xs text-foreground
```

---

### 4.2 Chip-Button (interaktiv)

```
rounded-full border border-border bg-background
px-2 py-1 text-xs text-foreground
hover:bg-background-elevated
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
```

---

## 5. Buttons (Hinweis)

Primary/Secondary Buttons folgen den bestehenden **Shared-UI-Button-Varianten**.
Lokale Abweichungen ohne semantischen Grund sind zu vermeiden.

---

## Verbindlichkeit

* Dieses Dokument ist **Referenz für Reviews**
* Abweichungen sind **bewusst zu begründen**
* Neue UI-Patterns sind **explizit zu dokumentieren**

---

## Beobachtete Referenzen (Quelle im Code)

Diese Stellen entsprechen dem **bevorzugten Standard-Pattern** und dienen als Referenz
für Reviews und Harmonisierungsvorschläge.

### Inputs (Standard)

* `dashboard/src/components/ConfigPanel.jsx`
* `dashboard/src/components/ThreadForm.jsx`
* `dashboard/src/components/SkeetForm.jsx`

### Panels / Sections

* `dashboard/src/components/ui/ActivityPanel.jsx`
* `dashboard/src/components/ui/SummaryCard.jsx`
* `dashboard/src/components/ThreadForm.jsx`
* `dashboard/src/components/ThreadOverview.jsx`

### Sub-Cards

* `dashboard/src/components/ui/ActivityPanel.jsx`
* `dashboard/src/components/ui/SummaryCard.jsx`
* `dashboard/src/components/views/MainOverviewView.jsx`

### Alerts (destructive)

* `dashboard/src/components/views/LoginView.jsx`
* `dashboard/src/components/PublishedSkeetList.jsx`
* `dashboard/src/components/ThreadOverview.jsx`

### Banner (neutral)

* `dashboard/src/App.jsx` (Session-Warnbanner)

### Inline-Chips / Info-Buttons

* `dashboard/src/App.jsx`
* `dashboard/src/components/SkeetForm.jsx`
* `dashboard/src/components/ThreadForm.jsx`
* `dashboard/src/components/views/MainOverviewView.jsx`

---

### Anmerkung

Dieses Dokument beschreibt **Ist-Stand-Konsolidierung**, kein visuelles Redesign.
Es dient der Wartbarkeit, nicht der ästhetischen Neuausrichtung.
