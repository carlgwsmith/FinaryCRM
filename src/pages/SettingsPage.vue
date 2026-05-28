<template>
  <div class="settings-page">
    <h1 class="crm-h1" style="margin-bottom:24px">Settings</h1>

    <div class="settings-grid">
      <!-- Profile -->
      <div class="crm-card settings-section">
        <div class="crm-card-header">
          <span class="crm-card-title">Profile</span>
        </div>
        <div class="crm-card-body settings-body">
          <div class="form-row">
            <div class="form-field">
              <label>Full Name</label>
              <input v-model="name" :class="['crm-input', { 'input-error': errors.name }]" />
              <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
            </div>
            <div class="form-field">
              <label>Email</label>
              <input v-model="email" type="email" :class="['crm-input', { 'input-error': errors.email }]" />
              <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Role</label>
              <input v-model="role" :class="['crm-input', { 'input-error': errors.role }]" />
              <span v-if="errors.role" class="field-error">{{ errors.role }}</span>
            </div>
            <div class="form-field">
              <label>Firm</label>
              <input v-model="firm" :class="['crm-input', { 'input-error': errors.firm }]" />
              <span v-if="errors.firm" class="field-error">{{ errors.firm }}</span>
            </div>
          </div>
          <button class="btn-primary save-btn" @click="saveProfile">Save Profile</button>
        </div>
      </div>

      <!-- Notifications -->
      <div class="crm-card settings-section">
        <div class="crm-card-header">
          <span class="crm-card-title">Notifications</span>
        </div>
        <div class="crm-card-body settings-body">
          <div
            v-for="item in notifications"
            :key="item.key"
            class="pref-row"
          >
            <div>
              <div class="pref-label">{{ item.label }}</div>
              <div class="pref-desc">{{ item.desc }}</div>
            </div>
            <div
              class="crm-toggle"
              :class="{ on: item.enabled }"
              @click="item.enabled = !item.enabled"
            >
              <div class="toggle-knob"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useCRMStore } from 'stores/crm'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const store = useCRMStore()

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  role: yup.string().required('Role is required'),
  firm: yup.string().required('Firm is required')
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    name: store.currentUser.name,
    email: store.currentUser.email,
    role: store.currentUser.role,
    firm: 'Finary Advisors LLC'
  }
})

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: role } = useField('role')
const { value: firm } = useField('firm')

const saveProfile = handleSubmit((values) => {
  store.currentUser.name = values.name
  store.currentUser.email = values.email
  store.currentUser.role = values.role
})

const notifications = reactive([
  { key: 'market_alerts',  label: 'Market Alerts',    desc: 'Get notified on significant market moves',    enabled: true  },
  { key: 'client_updates', label: 'Client Updates',   desc: 'Notifications when client data changes',      enabled: true  },
  { key: 'trade_confirms', label: 'Trade Confirms',   desc: 'Email confirmation for all trade executions', enabled: false },
  { key: 'weekly_digest',  label: 'Weekly Digest',    desc: 'Summary of portfolio performance each week',  enabled: true  }
])
</script>

<style lang="scss" scoped>
.settings-page { max-width: 1200px; }

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

.crm-card-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--crm-border);
}

.settings-body {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

  &:focus { border-color: var(--crm-primary); }
  &.input-error { border-color: #e53935; }
}

.field-error {
  font-size: 11px;
  color: #e53935;
}

.save-btn { align-self: flex-start; }

.pref-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child { border-bottom: none; }
}

.pref-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--crm-text);
}

.pref-desc {
  font-size: 12px;
  color: var(--crm-text-secondary);
  margin-top: 2px;
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
  flex-shrink: 0;

  &.on {
    background: var(--crm-primary-shape);
    border-color: var(--crm-border-blue);

    .toggle-knob { left: 18px; }
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
</style>
