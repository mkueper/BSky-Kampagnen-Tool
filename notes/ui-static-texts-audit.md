# UI- und ARIA-Text Audit (ohne electron)

Stand: 2026-01-?? (automatischer Scan, manuell gefiltert)

Hinweis:
- Erfasst wurden harte String-Literale in UI/ARIA-Attributen sowie reine Textknoten in JSX/HTML.
- Strings in `t(...)` wurden nicht gelistet.
- Technische Token/Kommandos sind trotzdem aufgefuehrt, damit du entscheiden kannst, ob sie uebersetzt werden sollen.

## Harte UI/ARIA-Attribute (Literalstrings)

### dashboard
- `dashboard/src/components/ConfigPanel.jsx:2284` placeholder: `https://bsky.social`
- `dashboard/src/components/ConfigPanel.jsx:2303` placeholder: `handle.bsky.social`
- `dashboard/src/components/ConfigPanel.jsx:2402` placeholder: `https://mastodon.social`
- `dashboard/src/components/views/LoginView.jsx:197` placeholder: `••••••••`
- `dashboard/src/components/views/ThreadDashboardView.jsx:148` title: `Neu zuerst`
- `dashboard/src/components/views/ThreadDashboardView.jsx:159` title: `Alt zuerst`
- `dashboard/src/components/SkeetForm.jsx:960` aria-label: `Hinweis zur Vorschau anzeigen`
- `dashboard/src/components/SkeetForm.jsx:962` title: `Hinweis anzeigen`
- `dashboard/src/components/SkeetForm.jsx:976` placeholder: `(kein Inhalt)`
- `dashboard/src/components/ContentWithLinkPreview.jsx:32` placeholder: `(kein Inhalt)`
- `dashboard/src/components/layout/AppLayout.jsx:142` aria-label: `Navigation einklappen`
- `dashboard/src/components/layout/AppLayout.jsx:143` title: `Navigation einklappen`

### shared-ui
- `packages/shared-ui/src/components/ThreadComposer.jsx:902` title: `Emoji einfuegen`
- `packages/shared-ui/src/components/ThreadComposer.jsx:903` aria-label: `Emoji einfuegen`
- `packages/shared-ui/src/components/MediaDialog.jsx:151` aria-label: `Alt-Text bearbeiten`
- `packages/shared-ui/src/components/MediaDialog.jsx:160` alt: `Vorschau`
- `packages/shared-ui/src/components/MediaDialog.jsx:190` placeholder: `Beschreibender Alt-Text`

### media-pickers
- `packages/media-pickers/src/components/GifPicker.jsx:395` alt: `GIF`

## Harte Textknoten (Literalstrings)

### dashboard
- `dashboard/src/components/ConfigPanel.jsx:1112` `Deutsch`
- `dashboard/src/components/ConfigPanel.jsx:1113` `English`
- `dashboard/src/components/views/LoginView.jsx:144` `npm run tools:hash-password`
- `dashboard/src/components/views/LoginView.jsx:149` `AUTH_PASSWORD_HASH`
- `dashboard/src/components/views/LoginView.jsx:160` `AUTH_TOKEN_SECRET`
- `dashboard/src/components/LinkPreviewCard.jsx:45` `Vorschau wird geladen …`
- `dashboard/src/components/skeets/SkeetHistoryTimeline.jsx:57` `Noch keine Sendehistorie vorhanden.`
- `dashboard/src/components/ThreadOverview.jsx:793` `Post {segment.sequence + 1}`
- `dashboard/src/components/ThreadForm.jsx:791` `Thread wird geladen…`

### shared-ui
- `packages/shared-ui/src/components/ThreadComposer.jsx:987` `Bild`
- `packages/shared-ui/src/components/ThreadComposer.jsx:1007` `GIF`
- `packages/shared-ui/src/components/MediaDialog.jsx:87` `Abbrechen`
- `packages/shared-ui/src/components/MediaDialog.jsx:88` `Uebernehmen`
- `packages/shared-ui/src/components/MediaDialog.jsx:174` `Alt-Text (Pflicht)`

### media-pickers
- `packages/media-pickers/src/components/GifPicker.jsx:488` `Keine weiteren GIFs verfuegbar.`
