# BC Frankfurt 1912 Website

A modern, elegant website for BC Frankfurt 1912 e.V. billiards club.

## Features

- **Modern Design**: Clean, brass & felt color scheme inspired by billiards
- **Responsive**: Works beautifully on all devices
- **Interactive**: Smooth animations and hover effects
- **Games Section**: Displays match schedules and league standings
- **Tweaks Panel**: Live color and typography customization

## Tech Stack

- **React 18** (via CDN)
- **Babel Standalone** (JSX compilation in browser)
- **Vanilla CSS** (no framework needed)
- **Static Site** (no build step required)

## Project Structure

```
BCFrankfurt1912/
├── index.html                  # Main entry point
├── README.md                   # This file
│
├── src/
│   ├── components/
│   │   ├── app.jsx            # Main React app
│   │   ├── sections.jsx       # Website sections (Hero, About, Contact, etc.)
│   │   ├── games.jsx          # Games/matches display with season selector
│   │   ├── visuals.jsx        # Visual effects and decorations
│   │   └── tweaks-panel.jsx   # Live customization panel
│   │
│   ├── styles/
│   │   └── styles.css         # All styling (design system + components)
│   │
│   └── data/
│       ├── bcf_season_3.json  # Sample game data (2022/2023)
│       ├── bcf_season_4.json  # Sample game data (2023/2024)
│       └── bcf_season_5.json  # Sample game data (2024/2025)
│
├── docs/
│   ├── design_brief.md        # Design system documentation
│   └── Claude.md              # Development guidelines
│
└── assets/
    ├── Related Websites/      # Reference materials
    ├── calendar.html          # Alternative calendar view
    └── calendar.jsx           # Calendar component
```

## Running Locally

```bash
# Using Python (recommended)
python3 -m http.server 8000

# Using Node.js
npx http-server

# Then open: http://localhost:8000
```

## Game Data

The games section displays match schedules and league standings. Sample data is provided in `src/data/`.

### Data Format

Each season JSON file contains:
- Season information
- Team listings
- League standings  
- Match results

Example structure:
```json
{
  "season_id": "5",
  "season_name": "2024/2025",
  "club_name": "BC Frankfurt 1912 e.V.",
  "teams": [
    {
      "team_id": "376",
      "team_name": "BC Frankfurt 1912 e.V. 2",
      "league": "Bezirksliga",
      "standings": [
        {
          "rank": "1",
          "team_name": "BC Frankfurt 1912 e.V. 2",
          "matches_played": "12",
          "wins": "11",
          "points": "33"
        }
      ],
      "matches": [
        {
          "date": "2025-03-15",
          "home_team": "BC Frankfurt 1912 e.V. 2",
          "away_team": "BC Darmstadt 1974 e.V. 1",
          "home_score": 6,
          "away_score": 2
        }
      ]
    }
  ]
}
```

### Updating Game Data

To update with real data:
1. Create/update JSON files in `src/data/`
2. Follow the format above
3. Update season list in `src/components/games.jsx` if needed

## Customization

### Colors

The site uses CSS custom properties defined in `src/styles/styles.css`:
- `--brass-*` for accent colors (warm gold)
- `--felt-*` for green tones (billiard table)
- `--ink-*` for dark backgrounds
- `--bone-*` for light text

### Live Tweaking

Open the site and click the settings icon (⚙️) in the bottom-right corner to:
- Adjust accent hue (brass color)
- Change felt color tone
- Try different display fonts

Changes are temporary (refresh to reset).

## Design System

See `docs/design_brief.md` for complete design system documentation:
- Color palette rationale
- Typography scale
- Spacing system
- Component patterns
- Animation guidelines

## Development

This is a static site with no build process needed:

1. **Edit components**: Modify `.jsx` files in `src/components/`
2. **Edit styles**: Update `src/styles/styles.css`
3. **Refresh browser**: Changes appear immediately

**Note:** Uses Babel Standalone for JSX compilation, so no webpack/vite required.

## Components

### Main Sections (sections.jsx)
- `Nav` - Navigation header
- `Hero` - Landing section with title
- `Marquee` - Animated text banner
- `About` - Club history
- `Disciplines` - Pool, Snooker, Carom info
- `Experience` - What to expect
- `Membership` - Join information
- `Gallery` - Photo showcase
- `Contact` - Contact form & info
- `Footer` - Footer with links

### Games Section (games.jsx)
- Season selector dropdown
- League standings tables
- Match results grid
- Color-coded win/loss indicators

### Tweaks Panel (tweaks-panel.jsx)
- Live color customization
- Font selection
- Settings persistence (localStorage)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires ES6+ support for React 18.

## Performance

- **No build step**: Instant reload during development
- **CDN assets**: React/Babel loaded from unpkg
- **Minimal dependencies**: Only 3 external libraries
- **Pure CSS**: No CSS-in-JS overhead

## License

© BC Frankfurt 1912 e.V.
