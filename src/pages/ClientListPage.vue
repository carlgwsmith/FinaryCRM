<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClientsStore } from 'stores/clients'
import { storeToRefs } from 'pinia'

const clientStore = useClientsStore()
const router = useRouter()
const {clients} = storeToRefs(clientStore)

onMounted(() => clientStore.fetchClients())

const search = ref('')
const activeFilter = ref('all')

const filters = [
  { key: 'all', label: 'All Clients' },
  { key: 'active', label: 'Active' },
  { key: 'high-risk', label: 'High Risk' }
]

const filteredClients = computed(() => {
  let list = clients.value
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
  }
  if (activeFilter.value === 'active') {
    list = list.filter(c => c.status === 'active')
  } else if (activeFilter.value === 'high-risk') {
    list = list.filter(c => c.riskScore >= 75)
  }
  return list
})

function viewClient(id) {
  router.push(`/clients/${id}`)
}

function initials(name) {
  if (!name) return '?'
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

<template>
  <div class="client-list-page">
    <!-- Header -->
    <div class="page-header">
      <h1 class="crm-h1">Clients</h1>
      <button class="btn-primary" @click="$router.push('/clients/create')">
        <q-icon name="add" size="18px" style="margin-right:6px" />
        Add Client
      </button>
    </div>

    <!-- Search & filters -->
    <div class="list-toolbar crm-card">
      <div class="search-wrap">
        <q-icon name="search" size="18px" color="grey-5" />
        <input
          v-model="search"
          placeholder="Search clients..."
          class="search-input"
        />
      </div>
      <div class="filter-chips">
        <span
          v-for="f in filters"
          :key="f.key"
          class="filter-chip"
          :class="{ active: activeFilter === f.key }"
          @click="activeFilter = f.key"
        >{{ f.label }}</span>
      </div>
    </div>

    <!-- Client table -->
    <div class="crm-card client-table-card">
      <table class="client-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Portfolio Value</th>
            <th>Risk Score</th>
            <th>Goal Progress</th>
            <th>Last Updated</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="!clientStore.loading && !clientStore.error">
          <tr
            v-for="client in filteredClients"
            :key="client.id"
            class="client-tr"
            @click="viewClient(client.id)"
          >
            <td class="name-cell">
              <div class="client-avatar">{{ initials(client.firstName + ' ' +client.lastName) }}</div>
              <div>
                <div class="client-name-text">{{ client.name }}</div>
                <div class="client-email">{{ client.email }}</div>
              </div>
            </td>
            <td>
              <span class="portfolio-val">{{ formatCurrency(client.portfolioValue) }}</span>
            </td>
            <td>
              <div class="risk-bar-wrap">
                <div class="risk-bar">
                  <div
                    class="risk-fill"
                    :style="{ width: client.riskScore + '%', background: riskColor(client.riskScore) }"
                  />
                </div>
                <span class="risk-num">{{ client.riskScore }}</span>
              </div>
            </td>
            <td>
              <div class="goal-progress-wrap">
                <div class="goal-bar">
                  <div
                    class="goal-fill"
                    :style="{ width: client.goalProgress + '%' }"
                  />
                </div>
                <span class="goal-pct">{{ client.goalProgress }}%</span>
              </div>
            </td>
            <td class="muted-text">{{ client.lastUpdated }}</td>
            <td>
              <span class="status-badge" :class="client.status">{{ client.status }}</span>
            </td>
            <td>
              <button class="btn-tertiary" @click.stop="viewClient(client.id)">
                View Client
                <q-icon name="visibility" size="14px" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="clientStore.loading" class="empty-state">
        <q-spinner size="40px" color="primary" />
        <p>Loading clients...</p>
      </div>
      <div v-else-if="clientStore.error" class="empty-state">
        <q-icon name="error_outline" size="48px" color="negative" />
        <p>{{ clientStore.error }}</p>
      </div>
      <div v-else-if="!filteredClients.length" class="empty-state">
        <q-icon name="people_outline" size="48px" color="grey-4" />
        <p>No clients found</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.client-list-page {
  max-width: 1400px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.list-toolbar {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  .search-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    max-width: 320px;
    background: #f5f5f5;
    border-radius: 6px;
    padding: 8px 12px;
  }

  .search-input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    color: var(--crm-text);
    width: 100%;
    font-family: 'Roboto', sans-serif;
  }

  .filter-chips {
    display: flex;
    gap: 8px;
  }

  .filter-chip {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    cursor: pointer;
    background: #f0f0f0;
    color: var(--crm-text-secondary);
    transition: all 0.2s;

    &.active {
      background: var(--crm-surface-blue);
      color: var(--crm-primary);
    }
  }
}

.client-table-card {
  overflow: hidden;
}

.client-table {
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 500;
    color: var(--crm-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid var(--crm-border);
    background: #fafafa;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #f5f5f5;
    font-size: 14px;
    color: var(--crm-text);
  }
}

.client-tr {
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #fafafa;
  }

  &:last-child td {
    border-bottom: none;
  }
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.client-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--crm-surface-blue);
  color: var(--crm-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.client-name-text {
  font-weight: 500;
  font-size: 14px;
}

.client-email {
  font-size: 12px;
  color: var(--crm-text-secondary);
}

.portfolio-val {
  font-weight: 500;
}

.muted-text {
  color: var(--crm-text-secondary);
}

.risk-bar-wrap, .goal-progress-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.risk-bar, .goal-bar {
  width: 80px;
  height: 6px;
  background: #e8e8e8;
  border-radius: 3px;
  overflow: hidden;
}

.risk-fill, .goal-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.goal-fill {
  background: var(--crm-primary);
}

.risk-num, .goal-pct {
  font-size: 13px;
  min-width: 28px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;

  &.active {
    background: rgba(3, 187, 76, 0.12);
    color: #03BB4C;
  }

  &.inactive {
    background: #f0f0f0;
    color: var(--crm-text-secondary);
  }
}

.empty-state {
  padding: 60px;
  text-align: center;
  color: var(--crm-text-secondary);
  font-size: 16px;
}
</style>
