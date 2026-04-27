<template>
  <div class="create-client-page">
    <div class="page-header">
      <h1 class="crm-h1">Create Client</h1>
    </div>

    <div class="crm-card form-card">
      <div class="form-section">
        <h3 class="crm-h3 section-title">Personal Information</h3>
        <div class="form-grid">
          <div class="form-field">
            <label>Full Name</label>
            <input v-model="form.name" placeholder="Robert Lee" class="crm-input" />
          </div>
          <div class="form-field">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="email@example.com" class="crm-input" />
          </div>
          <div class="form-field">
            <label>Phone</label>
            <input v-model="form.phone" placeholder="(555) 123-4567" class="crm-input" />
          </div>
          <div class="form-field">
            <label>Portfolio Value ($)</label>
            <input v-model.number="form.portfolioValue" type="number" placeholder="1000000" class="crm-input" />
          </div>
          <div class="form-field">
            <label>Risk Score (0-100)</label>
            <input v-model.number="form.riskScore" type="number" min="0" max="100" placeholder="75" class="crm-input" />
          </div>
          <div class="form-field">
            <label>Goal Progress (%)</label>
            <input v-model.number="form.goalProgress" type="number" min="0" max="100" placeholder="80" class="crm-input" />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-tertiary" @click="$router.push('/clients')">Cancel</button>
        <button class="btn-primary" @click="submit" :disabled="!isValid">
          <q-icon name="person_add" size="16px" style="margin-right:6px" />
          Create Client
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCRMStore } from 'stores/crm'

const router = useRouter()
const store = useCRMStore()

const form = ref({
  name: '',
  email: '',
  phone: '',
  portfolioValue: null,
  riskScore: null,
  goalProgress: null
})

const isValid = computed(() => form.value.name && form.value.email)

function submit() {
  if (!isValid.value) return
  const client = store.addClient(form.value)
  router.push(`/clients/${client.id}`)
}
</script>

<style lang="scss" scoped>
.create-client-page { max-width: 900px; }

.page-header { margin-bottom: 24px; }

.form-card { padding: 32px; }

.form-section { margin-bottom: 32px; }

.section-title {
  margin-bottom: 20px;
  color: var(--crm-text);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    font-weight: 500;
    color: var(--crm-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
}

.crm-input {
  padding: 10px 14px;
  border: 1px solid var(--crm-border-blue);
  border-radius: 6px;
  font-size: 15px;
  font-family: 'Roboto', sans-serif;
  color: var(--crm-text);
  outline: none;
  transition: border-color 0.2s;

  &:focus { border-color: var(--crm-primary); }
  &::placeholder { color: #bbb; }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--crm-border);
}
</style>
