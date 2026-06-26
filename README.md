# Website Data Scraper Chrome Extension

A lightweight Chrome extension that scrapes the current page for:
- **Page title**
- **Headings** (`h1`‑`h6`)
- **Links**

The data can be exported as JSON, CSV or plain‑text, copied to the clipboard, or cleared/reset.

## Features
- **Monochrome UI** – a clean gray design with a dark‑mode toggle (click the moon icon). No more gold/green color scheme.
- **Responsive popup** – scales up to 90 % of the viewport width and works on any screen size.
- **Glass‑morphism cards** for stats, title, headings and links.
- **Export & copy** utilities are built‑in and use a small helper (`exportData`).
- **Refresh** button to re‑run the scrape instantly.

## Installation
1. Clone the repository or copy the folder to your machine:
   ```bash
   git clone <repo‑url>  # or just download the folder
   ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top‑right toggle).
4. Click **Load unpacked** and select the folder
   `website‑scraper‑extension`.
5. The extension icon appears next to the address bar.

## Usage
1. Navigate to any web page you want to inspect.
2. Click the extension icon → the popup opens.
3. Press **Scrape** – the title, headings, and links are displayed.
4. Use the **JSON / CSV / TXT** buttons to download the data.
5. **Copy** copies a formatted text version to the clipboard.
6. **Clear** removes all results.
7. **Refresh** runs the scrape again without reopening the popup.
8. Click the **moon icon** (dark toggle) to switch between light and dark monochrome themes.

## Development
- The UI is styled with vanilla CSS variables (`--color‑*`) that define both light and dark palettes.
- The main logic lives in `popup.js`; helpers `exportData` and `formatData` keep the code DRY.
- `content.js` extracts the DOM data and sends it back to the popup via `chrome.tabs.sendMessage`.

## Customisation
- **Theme** – edit `popup.css` → modify the `:root` variables for a different colour palette.
- **Buttons** – add more export formats by extending the `exportData` helper in `popup.js`.
- **Icons** – replace the inline SVGs with your own assets if desired.

## License
MIT © 2026 – Feel free to fork, modify, and use this extension.
