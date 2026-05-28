import { defineStore } from 'pinia'
import { fetchFinancialNews } from 'src/services/newsApi'

// ============================================================
// CRM Store - Central state management
// ============================================================

export const useCRMStore = defineStore('crm', {
  state: () => ({
    // Auth
    currentUser: {
      name: 'Carl',
      email: 'carl@finary.com',
      role: 'Advisor'
    },

    // Dashboard KPIs
    kpis: {
      activeClients: 45,
      assetsUnderManagement: 2431321212,
      pendingTransactions: 123
    },

    // Market data
    marketData: [
      { symbol: 'S&P 500',   change: -3.42, direction: 'down' },
      { symbol: 'NASDAQ',    change:  2.12, direction: 'up'   },
      { symbol: 'DOWJONES',  change: -1.13, direction: 'down' },
      { symbol: '10YR BOND', change: -0.13, direction: 'down' }
    ],

    topGainers: [
      { name: 'Apple Inc.',    change: +2.35 },
      { name: 'Microsoft',     change: +1.33 },
      { name: 'Southern Co.',  change: +1.32 },
      { name: 'British...',    change: +1.32 },
      { name: 'Amazon Inc.',   change: +2.35 },
      { name: 'New York...',   change: +2.35 }
    ],

    topLosers: [
      { name: 'Northwest Utilities', change: -2.35 },
      { name: 'Pacific Gas &...',    change: -1.33 },
      { name: 'Coinbase',            change: -1.32 },
      { name: 'Duke Energy',         change: -1.32 },
      { name: 'Carl Car Co.',        change: -2.35 },
      { name: 'Canadanian...',       change: -2.35 }
    ],

    // News feed (populated by fetchNews action)
    newsItems: [],
    newsLoading: false,
    newsError: null,
    newsPage: 1,
    newsPerPage: 5,

    // Schedule events
    scheduleEvents: [
      { id: 1, day: 'Mon', title: 'Team Meeting',   startHour: 9,  duration: 1.5, type: 'blue'    },
      { id: 2, day: 'Tue', title: 'Working Lunch',  startHour: 12, duration: 1.0, type: 'neutral' },
      { id: 3, day: 'Wed', title: 'Research w/ A.', startHour: 10, duration: 1.0, type: 'neutral' },
      { id: 4, day: 'Thu', title: 'Release QA',     startHour: 14, duration: 1.5, type: 'neutral' }
    ],

    // Book of business performance chart data
    performanceData: [
      { month: 'January',  value: 45000 },
      { month: 'January',  value: 72000 },
      { month: 'January',  value: 38000 },
      { month: 'January',  value: 95000 },
      { month: 'February', value: 68000 },
      { month: 'February', value: 110000 },
      { month: 'February', value: 85000 },
      { month: 'March',    value: 92000 },
      { month: 'March',    value: 78000 },
      { month: 'March',    value: 118000 }
    ],

  }),

  getters: {
    formattedAUM: (state) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(state.kpis.assetsUnderManagement)
    },

    newsTotalPages: (state) => Math.ceil(state.newsItems.length / state.newsPerPage),

    pagedNews: (state) => {
      const start = (state.newsPage - 1) * state.newsPerPage
      return state.newsItems.slice(start, start + state.newsPerPage)
    }
  },

  actions: {
    async fetchNews() {
      this.newsLoading = true
      this.newsError = null
      try {
        this.newsItems = await fetchFinancialNews()
        this.newsPage = 1
      } catch (e) {
        this.newsError = e.message
      } finally {
        this.newsLoading = false
      }
    },

  }
})
