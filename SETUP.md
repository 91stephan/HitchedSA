# HitchedSA — Setup Guide

## Prerequisites

You need **Node.js** installed on your machine.

1. Go to **https://nodejs.org/en/download**
2. Download the **LTS version** (recommended)
3. Run the installer (default options are fine)
4. Restart your computer or open a new terminal

## Running the App

**Option A — Double-click:**
Double-click `START.bat` in this folder. It will install dependencies and launch the app automatically.

**Option B — Terminal:**
```bash
cd client
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

## Project Structure

```
HitchedSA/
├── START.bat                   ← Double-click to run
├── client/
│   ├── src/
│   │   ├── pages/              ← All 8 app pages
│   │   ├── components/         ← Shared UI components
│   │   ├── context/            ← ThemeContext + AppContext
│   │   ├── hooks/              ← useCountdown, useLocalStorage, useSampleData
│   │   └── themes/             ← Theme variable definitions
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
```

## Features

- **4 Themes**: Blossom, Sapphire, Garden, Noir
- **8 Pages**: Dashboard, Venues, Suppliers, Ideas Board, Guest List, Budget, Checklist, Settings
- **localStorage** for all data — no backend required
- **Fully responsive** — works on mobile and desktop
- All prices in **South African Rand (R)**
- South African venues, cities, and suppliers pre-loaded

## Placeholders for Future Integration

Search the codebase for these comments to find integration points:
- `// WEATHER WIDGET - wire up later` — Dashboard weather card
- `// PAYMENT REMINDERS - wire up later` — Budget reminders
- `// SUPABASE - wire up cloud sync later` — Settings & data persistence
- `// GOOGLE PLACES API - wire up supplier search later` — Suppliers page
- `// AD SLOT - ADSENSE` — Revenue placement markers
- `// ADSENSE UNIT — wire up slot ID later` — AdBanner component
- `// EVITE SERVICE - wire up later` — Guest list bulk email
