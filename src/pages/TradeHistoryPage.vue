<template>
  <div class="trade-history-page">
    <!-- Breadcrumb tabs -->
    <div class="page-tabs">
      <span class="tab-link" @click="$router.push('/clients')">Client List</span>
      <q-icon name="chevron_right" size="20px" color="grey-5" />
      <span class="tab-link" @click="$router.push(`/clients/${route.params.id}`)">
        {{ client?.name || 'Client' }}
      </span>
      <q-icon name="chevron_right" size="20px" color="grey-5" />
      <span class="tab-active">Trade History</span>
    </div>

    <!-- Toolbar -->
    <div class="trade-toolbar">
      <div class="toolbar-left">
        <h3 class="crm-h3">{{ client?.name }}'s Recent Trades</h3>
      </div>
      <div class="toolbar-right">
        <!-- Toggle: Buys / Sells -->
        <div class="toggle-group">
          <label class="toggle-item">
            <div class="crm-toggle" :class="{ on: showBuys }" @click="showBuys = !showBuys">
              <div class="toggle-knob"></div>
            </div>
            <span class="toggle-label">BUYS</span>
          </label>
          <label class="toggle-item">
            <div class="crm-toggle" :class="{ on: showSells }" @click="showSells = !showSells">
              <div class="toggle-knob"></div>
            </div>
            <span class="toggle-label">SELLS</span>
          </label>
        </div>
        <button class="btn-tertiary" @click="downloadStatement">
          Download Statement
          <q-icon name="download" size="14px" />
        </button>
      </div>
    </div>

    <!-- Trade table -->
    <div class="crm-card trade-table-card">
      <!-- Column headers with sort -->
      <div class="trade-table-header">
        <div
          v-for="col in columns"
          :key="col.key"
          class="th-cell"
          @click="sortBy(col.key)"
        >
          {{ col.label }}
          <q-icon name="arrow_drop_down" size="20px" class="sort-icon" />
        </div>
      </div>

      <!-- Rows -->
      <div
        v-for="trade in filteredTrades"
        :key="trade.id"
        class="trade-row"
      >
        <div class="td-cell">
          <div class="trade-type-cell">
            <q-icon
              :name="trade.type === 'BUY' ? 'add' : 'remove'"
              size="16px"
              :color="trade.type === 'BUY' ? 'positive' : 'negative'"
            />
            <span :class="trade.type === 'BUY' ? 'text-green' : 'text-red'">
              {{ trade.type }}
            </span>
          </div>
        </div>
        <div class="td-cell">{{ trade.date }}</div>
        <div class="td-cell">{{ trade.company }}</div>
        <div class="td-cell">{{ trade.ticker }}</div>
        <div class="td-cell font-medium">{{ formatCurrency(trade.amount) }}</div>
      </div>

      <!-- Empty state -->
      <div v-if="!filteredTrades.length" class="empty-trades">
        <q-icon name="swap_horiz" size="48px" color="grey-4" />
        <p>No trades to display</p>
        <p class="text-muted" style="font-size:13px">
          {{ !showBuys && !showSells ? 'Enable Buys or Sells above to see trades' : 'No trades found for this client' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCRMStore } from 'stores/crm'

const route = useRoute()
const router = useRouter()
const store = useCRMStore()

const showBuys = ref(true)
const showSells = ref(false)
const sortKey = ref('date')

const client = computed(() => store.getClientById(route.params.id))

const columns = [
  { key: 'type',    label: 'Trade Type'   },
  { key: 'date',    label: 'Trade Date'   },
  { key: 'company', label: 'Company Name' },
  { key: 'ticker',  label: 'Ticker Symbol'},
  { key: 'amount',  label: 'Trade Amount' }
]

// Mock trade data seeded for demo
const mockTrades = [
  { id: 1, type: 'BUY',  date: '7-11-2022', company: 'APPLE, INC',    ticker: 'AAPL', amount: 55000 },
  { id: 2, type: 'BUY',  date: '7-11-2022', company: 'APPLE, INC',    ticker: 'AAPL', amount: 55000 },
  { id: 3, type: 'BUY',  date: '6-15-2022', company: 'MICROSOFT',     ticker: 'MSFT', amount: 32000 },
  { id: 4, type: 'BUY',  date: '5-20-2022', company: 'AMAZON, INC',   ticker: 'AMZN', amount: 88000 },
  { id: 5, type: 'SELL', date: '4-10-2022', company: 'TESLA, INC',    ticker: 'TSLA', amount: 41000 },
  { id: 6, type: 'SELL', date: '3-08-2022', company: 'COINBASE',      ticker: 'COIN', amount: 15000 },
  { id: 7, type: 'BUY',  date: '2-22-2022', company: 'ALPHABET, INC', ticker: 'GOOG', amount: 72000 },
  { id: 8, type: 'SELL', date: '1-30-2022', company: 'NETFLIX, INC',  ticker: 'NFLX', amount: 28000 }
]

const filteredTrades = computed(() => {
  return mockTrades.filter(t => {
    if (t.type === 'BUY'  && !showBuys.value)  return false
    if (t.type === 'SELL' && !showSells.value) return false
    return true
  })
})

function sortBy(key) {
  sortKey.value = key
}

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
}

function downloadStatement() {
  // In production: trigger PDF download
  alert('Downloading statement...')
}
</script>

<style lang="scss" scoped>
.trade-history-page {
  max-width: 1400px;
}

// Breadcrumb tabs (matching Figma large tab style)
.page-tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.tab-link {
  font-size: 28px;
  font-weight: 600;
  color: rgba(17, 21, 31, 0.45);
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: color 0.2s;

  &:hover { color: var(--crm-text); }
}

.tab-active {
  font-size: 28px;
  font-weight: 600;
  color: var(--crm-text);
  font-family: 'Roboto', sans-serif;
  border-bottom: 2px solid var(--crm-primary-shape);
  padding-bottom: 4px;
}

// Toolbar
.trade-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

// Toggle
.toggle-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toggle-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.crm-toggle {
  width: 32px;
  height: 16px;
  border-radius: 100px;
  background: #b8c4e5;
  border: 1px solid #a7b5da;
  position: relative;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &.on {
    background: var(--crm-primary-shape);
    border-color: var(--crm-border-blue);

    .toggle-knob {
      left: 18px;
    }
  }
}

.toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  transition: left 0.2s;
}

.toggle-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--crm-text);
  font-family: 'Inter', sans-serif;
}

// Table
.trade-table-card {
  overflow: hidden;
}

.trade-table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr;
  padding: 12px 24px;
  border-bottom: 1px solid var(--crm-border);
  background: #fafafa;
}

.th-cell {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: rgba(17, 21, 31, 0.7);
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  user-select: none;

  &:hover { color: var(--crm-text); }

  .sort-icon { opacity: 0.6; }
}

.trade-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr;
  padding: 0 24px;
  border-bottom: 1px solid var(--crm-border);
  min-height: 72px;
  align-items: center;
  transition: background 0.15s;

  &:hover { background: #fafafa; }
  &:last-child { border-bottom: none; }
}

.td-cell {
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  color: var(--crm-text);
}

.trade-type-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.font-medium { font-weight: 500; }

.empty-trades {
  padding: 60px;
  text-align: center;
  color: var(--crm-text-secondary);
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
