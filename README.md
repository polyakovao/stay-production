# STAY Production — Portfolio Site

Minimal cinematic portfolio site in HTML + CSS + JS. English only.

## Run locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Structure

```
├── index.html
├── css/
├── js/
│   └── config.js   ← all content & settings
└── assets/
```

## Customize

Edit `js/config.js`:
- Name, bio, hero slides, portfolio videos
- Navigation, process steps, testimonials
- API endpoints for Laravel backend

## Features

- **Hero carousel** — Gemini Omni–style horizontal slides (intro + featured work)
- **Portfolio** — category filters + grouped blocks
- **Contact** — calendar booking (API stubs ready for Laravel)
- **Dark theme** — mobile optimized
