## React LeetCode Calendar

A beautiful, customizable React component that renders your LeetCode submission activity as a GitHub‑style contribution calendar.

[![npm version](https://img.shields.io/npm/v/react-leetcode-calendar.svg)](https://www.npmjs.com/package/react-leetcode-calendar)
[![npm downloads](https://img.shields.io/npm/dm/react-leetcode-calendar.svg)](https://www.npmjs.com/package/react-leetcode-calendar)
[![npm downloads (total)](https://img.shields.io/npm/dt/react-leetcode-calendar.svg)](https://www.npmjs.com/package/react-leetcode-calendar)
[![GitHub stars](https://img.shields.io/github/stars/saurabhhh777/react-leetcode-calendar?style=social)](https://github.com/saurabhhh777/react-leetcode-calendar/stargazers)
[![license](https://img.shields.io/npm/l/react-leetcode-calendar.svg)](./LICENSE)

---

### ✨ Highlights
- **Custom Date Range**: Provide a `startDate` to render one year of activity from that date
- **Flexible Sizing**: Choose preset sizes or pass custom `width`/`height`
- **11 Polished Themes**: From classic to vibrant modern palettes
- **Full Color & Label Control**: Override any color or label text
- **Border‑Free, Modern UI**: Clean, legible, and responsive

---

### 📦 Installation
```bash
npm install react-leetcode-calendar
```

---

### ⚡ Quick Start
```jsx
import Leetcodecalendar from 'react-leetcode-calendar';

function App() {
  return <Leetcodecalendar username="your-leetcode-username" />;
}
```

---

### 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `username` | `string` | — (required) | Your LeetCode username |
| `graph` | `'default' \| 'yearly'` | `'default'` | Graph mode |
| `showTitle` | `boolean` | `true` | Toggles the heading/title |
| `size` | `'small' \| 'medium' \| 'large' \| 'xl' \| { width: number, height: number }` | `'medium'` | Preset size or exact dimensions |
| `startDate` | `string` | `undefined` | Custom start date (`YYYY-MM-DD`), renders one year from this date |
| `ui` | `string` | `'default'` | Built‑in theme name (see below) |
| `colors` | `object` | `undefined` | Override colors (see Color Properties) |
| `labels` | `object` | `undefined` | Override labels (see Label Customization) |

---

### 🆕 Recent Updates — v2.6.0
- Added `startDate` for custom date range (one year window)
- Added custom size dimensions (`{ width, height }`)
- Expanded and refined themes (11 total)
- Cleaner, border‑free appearance
- Documentation improvements

---

### 🎨 Available UI Themes
1. `default`
2. `purple-cyan`
3. `rainbow`
4. `ocean`
5. `sunset`
6. `forest`
7. `midnight`
8. `candy`
9. `matrix`
10. `masculine`
11. `deep-forest`

Example:
```jsx
<Leetcodecalendar username="saurabhhh777" ui="purple-cyan" />
```

---

### 📏 Size Options
```jsx
// Presets
<Leetcodecalendar username="saurabhhh777" size="small" />
<Leetcodecalendar username="saurabhhh777" size="medium" />
<Leetcodecalendar username="saurabhhh777" size="large" />
<Leetcodecalendar username="saurabhhh777" size="xl" />

// Custom dimensions
<Leetcodecalendar username="saurabhhh777" size={{ width: 300, height: 200 }} />
```

---

### 📅 Custom Date Range
```jsx
// Renders activity from Jan 1, 2023 to Jan 1, 2024
<Leetcodecalendar 
  username="saurabhhh777"
  graph="yearly"
  startDate="2023-01-01"
  ui="purple-cyan"
/>
```

---

### 🎨 Complete Color Customization
```jsx
<Leetcodecalendar 
  username="saurabhhh777"
  colors={{
    noActivity: "#1a1a1a",
    activity: ["#00ff00", "#00cc00", "#009900", "#006600", "#003300"],
    text: "#ffffff",
    title: "#00ff00",
    months: "#00ff00",
    weekdays: "#00ff00",
    totalCount: "#00ff00",
    legend: "#00ff00",
    background: "#000000",
    calendarBackground: "#0a0a0a",
    border: "#00ff00",
    hover: "#00cc00",
    loading: "#00ff00",
    error: "#ff0000",
    noData: "#00ff00"
  }}
/>
```

---

### 🏷️ Label Customization
```jsx
<Leetcodecalendar 
  username="saurabhhh777"
  labels={{
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    totalCount: "Total submissions: 1234",
    legend: { less: "Few submissions", more: "Many submissions" }
  }}
/>
```

---

### 🎛️ Color Properties
- **noActivity**: Color for days with no submissions
- **activity**: Array for activity levels (0–4)
- **text**: General text color
- **title**: Title text color
- **months**: Month labels color
- **weekdays**: Weekday labels color
- **totalCount**: Total submissions text color
- **legend**: Legend text color
- **background**: App background
- **calendarBackground**: Calendar area background
- **border**: Optional border color
- **hover**: Hover color
- **loading**: Loading text color
- **error**: Error text color
- **noData**: No‑data text color

---

### 🌐 Data Source
The component fetches from a public LeetCode submissions endpoint:

```
https://leetcode-sub-endpoint.vercel.app/leetcode/{username}
```

Response format:
```json
{
  "2024-08-31": 2,
  "2024-09-03": 4,
  "2024-09-09": 1
}
```

Note: This is a community endpoint and may be subject to rate limits or occasional changes. Consider caching responses in your app for resilience.

---

### 🧪 Development
```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Run demo
cd demo && npm start
```

---

### 📚 Dependencies
- React 18+
- TypeScript
- Axios (API requests)
- TanStack Query (React Query)
- React Activity Calendar (base calendar UI)

---

### 🤝 Contributing
Contributions are welcome! Please open an issue or submit a PR with a clear description of the change. For larger updates, consider discussing your proposal in an issue first.

---

### 👤 Developer
Maintained by [@askbunnyyy](https://x.com/askbunnyyy).

---

### 📄 License
MIT License. See the [LICENSE](./LICENSE) file for details.

---

### 🗒️ Changelog

#### v2.6.0
- Added custom date range via `startDate`
- Added custom size dimensions
- Enhanced themes (11 options) and refined visual design
- Removed deprecated neon theme
- Documentation improvements

#### v2.5.0
- Added multiple UI themes
- Enhanced color customization and styling
- Added size control options

#### v2.4.0
- Added custom colors, title control, and labels support
- Improved theming system

#### Earlier
- Initial LeetCode calendar with GitHub‑style graph
- Yearly and default graph modes


