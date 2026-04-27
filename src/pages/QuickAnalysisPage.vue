<template>
  <div class="quick-analysis-page">
    <!-- Header -->
    <div class="page-header">
      <h1 class="crm-h1">Quick Analysis</h1>
      <button class="btn-primary" @click="$router.push('/clients/create')">
        <q-icon name="person_add" size="16px" style="margin-right:6px" />
        Create New Client
      </button>
    </div>

    <!-- Section 1: About Yourself -->
    <div class="crm-card section-card">
      <div class="section-header-inline">
        <h3 class="crm-h3">Tell us about yourself</h3>
      </div>
      <div class="input-row">
        <div class="form-field">
          <label>Current Age</label>
          <input v-model="form.currentAge" placeholder="$1,204,542" class="crm-input" />
        </div>
        <div class="form-field">
          <label>Age at Retirement</label>
          <input v-model="form.retirementAge" placeholder="$1,204,542" class="crm-input" />
        </div>
        <div class="form-field">
          <label>Total Debts</label>
          <input v-model="form.totalDebts" placeholder="$304,542" class="crm-input" />
        </div>
      </div>
    </div>

    <!-- Section 2: Income Sources -->
    <div class="crm-card section-card">
      <div class="section-header-inline">
        <h3 class="crm-h3">Please add your income sources</h3>
        <button class="btn-tertiary" @click="addIncome">
          Add Income Source
          <q-icon name="add" size="14px" />
        </button>
      </div>

      <!-- Income table -->
      <DataTable
        :columns="incomeColumns"
        :rows="incomes"
        empty-message="No income sources added yet"
        @delete="removeIncome"
      />
    </div>

    <!-- Section 3: Spending Goals -->
    <div class="crm-card section-card">
      <div class="section-header-inline">
        <h3 class="crm-h3">Please add your spending goal</h3>
        <button class="btn-tertiary" @click="addSpending">
          Add Spending Goal
          <q-icon name="add" size="14px" />
        </button>
      </div>

      <DataTable
        :columns="spendingColumns"
        :rows="spendings"
        empty-message="No spending goals added yet"
        @delete="removeSpending"
      />
    </div>

    <!-- Section 4: Accounts -->
    <div class="crm-card section-card">
      <div class="section-header-inline">
        <h3 class="crm-h3">Please add your accounts</h3>
        <div class="btn-group">
          <button class="btn-tertiary" @click="addAccount('link')">
            Link Online Account
            <q-icon name="add" size="14px" />
          </button>
          <button class="btn-tertiary" @click="addAccount('manual')">
            Add Account Manually
            <q-icon name="add" size="14px" />
          </button>
        </div>
      </div>

      <DataTable
        :columns="accountColumns"
        :rows="accounts"
        empty-message="No accounts added yet"
        @delete="removeAccount"
      />
    </div>

    <!-- Generate CTA -->
    <div class="generate-cta">
      <button class="btn-generate" @click="generateAnalysis">
        Generate Quick Analysis
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'components/DataTable.vue'

const form = ref({
  currentAge: '',
  retirementAge: '',
  totalDebts: ''
})

// ── Income sources ───────────────────────────────────────────
const incomeColumns = [
  { key: 'name',  label: 'Income Name'  },
  { key: 'start', label: 'Income Start' },
  { key: 'end',   label: 'Income End'   },
  { key: 'amount',label: 'Amount'       },
  { key: 'type',  label: 'Type'         }
]

const incomes = ref([
  { id: 1, name: 'Salary',         start: '7-11-2022', end: '7-12-2042', amount: '$55,000', type: 'Annual'  },
  { id: 2, name: 'Social Security', start: '7-11-2022', end: '7-12-2042', amount: '$55,000', type: 'Annual'  }
])

function addIncome() {
  incomes.value.push({
    id: Date.now(),
    name: 'New Income', start: '', end: '', amount: '', type: 'Annual'
  })
}
function removeIncome(id) { incomes.value = incomes.value.filter(r => r.id !== id) }

// ── Spending goals ───────────────────────────────────────────
const spendingColumns = [
  { key: 'name',   label: 'Goal Name'      },
  { key: 'start',  label: 'Spending Start' },
  { key: 'end',    label: 'Spending End'   },
  { key: 'amount', label: 'Amount'         },
  { key: 'type',   label: 'Type'           }
]

const spendings = ref([
  { id: 1, name: "Carl's College", start: '5-01-2026',  end: '5-01-2031', amount: '$20,000', type: 'Annual'   },
  { id: 2, name: "Jane's New Car", start: '12-25-2030', end: '-',         amount: '$55,000', type: 'One Time' }
])

function addSpending() {
  spendings.value.push({
    id: Date.now(),
    name: 'New Goal', start: '', end: '', amount: '', type: 'Annual'
  })
}
function removeSpending(id) { spendings.value = spendings.value.filter(r => r.id !== id) }

// ── Accounts ─────────────────────────────────────────────────
const accountColumns = [
  { key: 'name',        label: 'Account Name'     },
  { key: 'institution', label: 'Institution Name' },
  { key: 'balance',     label: 'Account Balance'  },
  { key: 'type',        label: 'Type'             }
]

const accounts = ref([
  { id: 1, name: "Carl's 401k",   institution: 'USAA',     balance: '$400,000', type: '401k'     },
  { id: 2, name: "Jane's Roth",   institution: 'USAA',     balance: '$400,000', type: 'Roth IRA' },
  { id: 3, name: 'Joint Checking',institution: 'Fidelity', balance: '$310,000', type: 'Roth IRA' }
])

function addAccount() {
  accounts.value.push({
    id: Date.now(),
    name: 'New Account', institution: '', balance: '', type: ''
  })
}
function removeAccount(id) { accounts.value = accounts.value.filter(r => r.id !== id) }

// ── Generate ─────────────────────────────────────────────────
function generateAnalysis() {
  alert('Generating Quick Analysis...')
}
</script>

<style lang="scss" scoped>
.quick-analysis-page {
  max-width: 1400px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-card {
  margin-bottom: 20px;
  overflow: hidden;
}

.section-header-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--crm-border);

  h3 { margin: 0; }
}

.btn-group {
  display: flex;
  gap: 10px;
}

// About yourself - 3-column input row
.input-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 500;
    color: #000;
    font-family: 'Inter', sans-serif;
  }
}

.crm-input {
  padding: 8px 12px;
  border: 1px solid var(--crm-border-blue);
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: var(--crm-text-tertiary);
  outline: none;
  transition: border-color 0.2s;
  background: white;

  &:focus { border-color: var(--crm-primary); }
  &::placeholder { color: #bbb; }
}

// Generate CTA
.generate-cta {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-generate {
  background: white;
  border: 1px solid var(--crm-primary);
  color: var(--crm-primary);
  border-radius: 6px;
  padding: 16px 30px;
  font-size: 22px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--crm-primary);
    color: white;
  }
}
</style>
