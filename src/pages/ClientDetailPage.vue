<template>
  <div class="client-detail-page" v-if="client">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <span class="bc-link" @click="$router.push('/clients')">Clients</span>
      <q-icon name="chevron_right" size="16px" color="grey-5" />
      <span class="bc-current">{{ client.name }}</span>
    </div>

    <!-- Header card -->
    <div class="crm-card client-header-card">
      <div class="client-hero">
        <div class="client-avatar-lg">{{ initials(client.name) }}</div>
        <div class="client-info">
          <h1 class="crm-h1">{{ client.name }}</h1>
          <p class="client-meta">{{ client.email }} &nbsp;·&nbsp; {{ client.phone }}</p>
          <p class="client-meta">Advisor: {{ client.advisor }} &nbsp;·&nbsp; Last Updated: {{ client.lastUpdated }}</p>
        </div>
        <div class="header-actions">
          <button class="btn-primary" @click="$router.push(`/clients/${client.id}/trades`)">
            <q-icon name="swap_horiz" size="16px" style="margin-right:6px" />
            Trade History
          </button>
        </div>
      </div>
    </div>

    <!-- KPI row -->
    <div class="crm-stat-strip client-kpis">
      <div class="crm-stat-item">
        <div class="stat-value blue">{{ formatCurrency(client.portfolioValue) }}</div>
        <div class="stat-label">Portfolio Value</div>
      </div>
      <div class="crm-stat-item">
        <div class="stat-value" :style="{ color: riskColor(client.riskScore) }">{{ client.riskScore }}</div>
        <div class="stat-label">Risk Score</div>
      </div>
      <div class="crm-stat-item">
        <div class="stat-value green">{{ client.goalProgress }}%</div>
        <div class="stat-label">Goal Progress</div>
      </div>
    </div>

    <!-- Analysis grid -->
    <div class="analysis-grid">
      <!-- Goal tracker -->
      <div class="crm-card">
        <div class="crm-card-header">
          <span class="crm-card-title">Goal Tracker</span>
        </div>
        <div class="crm-card-body" style="display:flex;flex-direction:column;align-items:center">
          <GoalGauge :value="client.goalProgress" />
          <p class="goal-stat">
            <strong>{{ client.goalProgress }}%</strong> likely to meet goals
          </p>
        </div>
      </div>

      <!-- Portfolio performance -->
      <div class="crm-card">
        <div class="crm-card-header">
          <span class="crm-card-title">Portfolio Performance</span>
        </div>
        <div class="crm-card-body">
          <PerformanceChart :data="samplePerformance" />
        </div>
      </div>
    </div>

    <!-- Trade history preview -->
    <div class="crm-card trade-preview">
      <div class="crm-card-header">
        <span class="crm-card-title">Recent Trades</span>
        <button class="btn-tertiary" @click="$router.push(`/clients/${client.id}/trades`)">
          View All
          <q-icon name="arrow_forward" size="14px" />
        </button>
      </div>
      <div class="crm-card-body">
        <p class="text-muted" style="font-size:14px;text-align:center;padding:24px 0">
          No recent trades to display
        </p>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <q-icon name="person_off" size="64px" color="grey-4" />
    <p>Client not found</p>
    <button class="btn-primary" @click="$router.push('/clients')">Back to Clients</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientsStore } from 'stores/clients'
import GoalGauge from 'components/GoalGauge.vue'
import PerformanceChart from 'components/PerformanceChart.vue'

const route = useRoute()
const clientsStore = useClientsStore()

const client = computed(() => clientsStore.getClientById(route.params.id))

const samplePerformance = [
  { month: 'Jan', value: 40000 }, { month: 'Jan', value: 65000 },
  { month: 'Feb', value: 52000 }, { month: 'Feb', value: 88000 },
  { month: 'Mar', value: 74000 }, { month: 'Mar', value: 95000 }
]

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
}

function riskColor(score) {
  if (score >= 80) return '#D20319'
  if (score >= 60) return '#FF8C00'
  return '#03BB4C'
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  font-size: 14px;

  .bc-link {
    color: var(--crm-primary);
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }

  .bc-current {
    color: var(--crm-text-secondary);
  }
}

.client-header-card {
  margin-bottom: 24px;
}

.client-hero {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
}

.client-avatar-lg {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--crm-surface-blue);
  color: var(--crm-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 22px;
  flex-shrink: 0;
}

.client-info {
  flex: 1;

  h1 { margin-bottom: 6px; }
}

.client-meta {
  font-size: 14px;
  color: var(--crm-text-secondary);
  margin: 3px 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.client-kpis {
  margin-bottom: 24px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.goal-stat {
  font-size: 20px;
  text-align: center;
  margin: 12px 0;
  color: var(--crm-text);

  strong { font-weight: 800; }
}

.trade-preview .crm-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--crm-border);
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 80px 0;
  color: var(--crm-text-secondary);
  font-size: 18px;
}
</style>
