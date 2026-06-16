<template>
  <div class="dashboard-page">
    <!-- Welcome Header -->
    <h1 class="crm-h1 welcome-heading">Welcome Back, {{ user.username }}</h1>

    <!-- KPI Strip -->
    <div class="crm-stat-strip kpi-strip">
      <div class="crm-stat-item">
        <div class="stat-value blue">
          {{ store.kpis.activeClients }}
          <q-icon
            name="people"
            size="28px"
            style="color: #0066ff; margin-left: 8px"
          />
        </div>
        <div class="stat-label">Active Clients</div>
      </div>
      <div class="crm-stat-item">
        <div class="stat-value green">{{ store.formattedAUM }}</div>
        <div class="stat-label">Assets Under Management</div>
      </div>
      <div class="crm-stat-item">
        <div class="stat-value dark">
          {{ store.kpis.pendingTransactions }}
          <q-icon
            name="schedule"
            size="28px"
            style="margin-left: 8px; color: #11151f"
          />
        </div>
        <div class="stat-label">Pending Transactions</div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="dashboard-grid">
      <!-- LEFT COLUMN -->
      <div class="col-left">
        <!-- Book of Business Performance Chart -->
        <div class="crm-card">
          <div class="crm-card-header">
            <span class="crm-card-title">Book of Business Performance</span>
            <div class="as-of-label">AS OF TODAY AT 9:33 A.M.</div>
          </div>
          <div class="crm-card-body chart-body">
            <PerformanceChart :data="store.performanceData" />
            <div class="chart-legend">
              <span class="legend-dot"></span>
              <span class="legend-label">Policy Premium Received</span>
            </div>
          </div>
        </div>

        <!-- Bottom row: News + Market -->
        <div class="bottom-row">
          <!-- Newsroom Insights -->
          <div class="crm-card">
            <div class="crm-card-header">
              <span class="crm-card-title">Newsroom Insights</span>
              <q-spinner v-if="store.newsLoading" size="16px" color="primary" />
            </div>
            <div v-if="store.newsError" class="news-error">
              <q-icon name="warning" size="16px" />
              {{ store.newsError }}
            </div>
            <template v-else>
              <div class="news-list">
                <NewsItem
                  v-for="item in store.pagedNews"
                  :key="item.id"
                  :item="item"
                />
              </div>
              <div v-if="store.newsTotalPages > 1" class="news-pagination">
                <q-pagination
                  v-model="store.newsPage"
                  :max="store.newsTotalPages"
                  :max-pages="5"
                  boundary-numbers
                  size="sm"
                  color="primary"
                  active-color="primary"
                />
              </div>
            </template>
          </div>

          <!-- Market Summary -->
          <div class="crm-card">
            <div class="crm-card-header">
              <span class="crm-card-title">Market Summary</span>
            </div>

            <!-- Ticker row -->
            <div class="market-ticker">
              <div
                v-for="m in store.marketData"
                :key="m.symbol"
                class="ticker-item"
              >
                <div class="ticker-name">{{ m.symbol }}</div>
                <div
                  class="ticker-value"
                  :class="m.direction === 'up' ? 'up' : 'down'"
                >
                  {{ m.direction === "up" ? "+" : "" }}{{ m.change }}%
                </div>
              </div>
            </div>

            <!-- Gainers / Losers -->
            <div class="gainers-losers">
              <div class="gl-col">
                <div class="gl-header">TOP GAINERS</div>
                <div
                  v-for="item in store.topGainers"
                  :key="item.name"
                  class="gl-row"
                >
                  <span class="gl-name">{{ item.name }}</span>
                  <span class="gl-val text-green"
                    >+{{ item.change.toFixed(2) }}%</span
                  >
                </div>
              </div>
              <div class="gl-col">
                <div class="gl-header">TOP LOSERS</div>
                <div
                  v-for="item in store.topLosers"
                  :key="item.name"
                  class="gl-row"
                >
                  <span class="gl-name">{{ item.name }}</span>
                  <span class="gl-val text-red"
                    >{{ item.change.toFixed(2) }}%</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="col-right">
        <!-- Goal Tracker -->
        <div class="crm-card goal-tracker">
          <div class="crm-card-header">
            <span class="crm-card-title">Goal Tracker</span>
          </div>
          <div class="crm-card-body goal-body">
            <GoalGauge :value="81" />
            <p class="goal-stat"><strong>81%</strong> likely to meet goals</p>
            <a href="#" class="goal-link text-blue"
              >View Clients By Goal Performance</a
            >
          </div>
        </div>

        <!-- Upcoming Schedule -->
        <div class="crm-card schedule-card">
          <div class="crm-card-header schedule-header">
            <span class="crm-card-title">Upcoming Schedule</span>
            <div class="crm-tabs schedule-tabs">
              <span
                class="crm-tab"
                :class="{ active: scheduleView === 'calendar' }"
                @click="scheduleView = 'calendar'"
                >Calendar View</span
              >
              <span
                class="crm-tab"
                :class="{ active: scheduleView === 'list' }"
                @click="scheduleView = 'list'"
                >List View</span
              >
            </div>
          </div>
          <div class="crm-card-body">
            <ScheduleGrid :events="store.scheduleEvents" :view="scheduleView" />
          </div>
        </div>
      </div>

      <!-- Recent Clients — full width -->
      <div class="recent-clients-section full-width">
        <h3 class="crm-h2 section-title">Recent Clients</h3>
        <div
          v-for="client in clientsStore.recentClients"
          :key="client.id"
          class="client-row"
        >
          <div>
            <div class="client-name">{{ client.name }}</div>
            <div class="client-updated">
              Last Updated: {{ client.lastUpdated }}
            </div>
          </div>
          <button class="btn-tertiary" @click="viewClient(client.id)">
            View Client
            <q-icon name="visibility" size="16px" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCRMStore } from "stores/crm";
import { useClientsStore } from "stores/clients";
import { useUserStore } from "../stores/user";
import PerformanceChart from "components/PerformanceChart.vue";
import GoalGauge from "components/GoalGauge.vue";
import ScheduleGrid from "components/ScheduleGrid.vue";
import NewsItem from "components/NewsItem.vue";
import { storeToRefs } from "pinia";

const store = useCRMStore();
const userStore = useUserStore();

const clientsStore = useClientsStore();
const router = useRouter();
const scheduleView = ref("calendar");

const { user } = storeToRefs(userStore);

onMounted(() => {
  store.fetchNews();
});

function viewClient(id) {
  router.push(`/clients/${id}`);
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  width: 100%;
  max-width: 1600px;
}

.welcome-heading {
  margin-bottom: 20px;
  color: var(--crm-text);
}

.kpi-strip {
  margin-bottom: 24px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 24px;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr 380px;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

.col-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.col-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

// Chart
.chart-body {
  position: relative;
}

.as-of-label {
  font-size: 8px;
  text-transform: uppercase;
  color: var(--crm-text-secondary);
  letter-spacing: 0.5px;
}

.crm-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--crm-border);
}

.chart-legend {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  .legend-dot {
    width: 9px;
    height: 9px;
    background: var(--crm-surface-blue);
    border: 1px solid var(--crm-primary);
    display: inline-block;
  }

  .legend-label {
    font-size: 11px;
    color: var(--crm-text);
  }
}

.news-pagination {
  display: flex;
  justify-content: center;
  padding: 10px 16px 12px;
  border-top: 1px solid var(--crm-border);
}

.news-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  font-size: 12px;
  color: var(--crm-error);
}

// Bottom row
.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

// Gainers / Losers
.gainers-losers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 12px 16px;

  .gl-col {
    padding: 0 8px;
  }

  .gl-header {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: var(--crm-text);
  }

  .gl-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .gl-name {
    font-size: 12px;
    color: var(--crm-text);
  }

  .gl-val {
    font-size: 12px;
    font-weight: 400;
  }
}

// Goal Tracker
.goal-tracker {
  .goal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .goal-stat {
    font-size: 20px;
    text-align: center;
    margin: 12px 0 6px;
    color: var(--crm-text);

    strong {
      font-weight: 800;
    }
  }

  .goal-link {
    font-size: 12px;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
  }
}

// Schedule
.schedule-header {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.schedule-tabs {
  align-self: flex-start;
}

// Recent Clients
.recent-clients-section {
  .section-title {
    margin-bottom: 16px;
    color: var(--crm-text);
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}
</style>
