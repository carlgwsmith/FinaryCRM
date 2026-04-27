# Finary — Financial CRM

A Vue 3 + Quasar 2 frontend for the Financial CRM, built from the Figma design.

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Framework   | Vue 3 (Composition API)       |
| UI Library  | Quasar 2 (component system)   |
| State       | Pinia                         |
| Routing     | Vue Router 4                  |
| Styling     | SCSS + Quasar theming         |
| Build       | Vite (via @quasar/app-vite)   |

## Design Tokens (from Figma)

| Token               | Value     |
|---------------------|-----------|
| Primary Blue        | `#0066FF` |
| Primary Shape       | `#0243EC` |
| Nav Gradient Start  | `#001A5E` |
| Nav Gradient End    | `#002DA5` |
| Text Primary        | `#11151F` |
| Text Tertiary       | `#445275` |
| Success             | `#03BB4C` |
| Error               | `#D20319` |
| Border              | `#DCDCDC` |
| Border Blue         | `#B6C2E2` |

## Project Structure

```
src/
├── css/
│   └── app.scss              # Global styles & design tokens
├── layouts/
│   └── MainLayout.vue        # Sidebar + topbar shell
├── pages/
│   ├── LoginPage.vue         # Login screen
│   ├── DashboardPage.vue     # Main dashboard
│   ├── ClientListPage.vue    # Client list with search/filter
│   ├── ClientDetailPage.vue  # Individual client analysis
│   ├── CreateClientPage.vue  # Add new client form
│   ├── TradeHistoryPage.vue  # Client trade history table
│   ├── QuickAnalysisPage.vue # Financial planning tool
│   ├── SettingsPage.vue      # User settings
│   ├── SupportPage.vue       # Help & support
│   └── ErrorNotFound.vue     # 404 page
├── components/
│   ├── PerformanceChart.vue  # SVG line chart
│   ├── GoalGauge.vue         # SVG semicircle gauge
│   ├── ScheduleGrid.vue      # Weekly schedule grid
│   ├── NewsItem.vue          # News feed row
│   └── DataTable.vue         # Reusable sortable table
├── stores/
│   └── crm.js                # Pinia store (clients, KPIs, market data)
├── router/
│   └── index.js              # All app routes
└── main.js                   # App bootstrap
```

## Setup & Run

### Prerequisites
- Node.js >= 18
- npm or yarn

### Install
```bash
# Install Quasar CLI globally
npm install -g @quasar/cli

# Install dependencies
npm install
```

### Development
```bash
quasar dev
# Opens at http://localhost:9000
```

### Production Build
```bash
quasar build
# Output in dist/spa/
```

## Pages & Routes

| Route                    | Page                | Description                          |
|--------------------------|---------------------|--------------------------------------|
| `/login`                 | LoginPage           | Authentication screen                |
| `/dashboard`             | DashboardPage       | Main overview with KPIs & charts     |
| `/clients`               | ClientListPage      | Searchable/filterable client table   |
| `/clients/:id`           | ClientDetailPage    | Client analysis with goal tracker    |
| `/clients/create`        | CreateClientPage    | Create a new client                  |
| `/clients/:id/trades`    | TradeHistoryPage    | Client trade history with toggle     |
| `/quick-analysis`        | QuickAnalysisPage   | Multi-step financial planning tool   |
| `/settings`              | SettingsPage        | Profile & notification preferences   |
| `/support`               | SupportPage         | FAQ and contact support              |

## Next Steps

- [ ] Connect to real API (replace Pinia mock data)
- [ ] Add authentication guard to router
- [ ] Integrate real charting library (ECharts or Chart.js)
- [ ] Add trade entry form modal
- [ ] Implement PDF report generation
- [ ] Add mobile sidebar overlay animations
- [ ] Connect to market data API (e.g. Polygon.io)
