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
            <label>First Name</label>
            <input v-model="firstName" placeholder="Robert" :class="['crm-input', { 'input-error': errors.firstName }]" />
            <span v-if="errors.name" class="field-error">{{ errors.firstName }}</span>
          </div>
          <div class="form-field">
            <label>Last Name</label>
            <input v-model="lastName" placeholder="Hill" :class="['crm-input', { 'input-error': errors.lastName }]" />
            <span v-if="errors.lastName" class="field-error">{{ errors.lastName }}</span>
          </div>
          <div class="form-field">
            <label>Email</label>
            <input v-model="email" type="email" placeholder="email@example.com" :class="['crm-input', { 'input-error': errors.email }]" />
            <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
          </div>
          <!-- <div class="form-field">
            <label>Phone</label>
            <input v-model="phone" placeholder="(555) 123-4567" :class="['crm-input', { 'input-error': errors.phone }]" />
            <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
          </div>
          <div class="form-field">
            <label>Portfolio Value ($)</label>
            <input v-model="portfolioValue" type="number" placeholder="1000000" :class="['crm-input', { 'input-error': errors.portfolioValue }]" />
            <span v-if="errors.portfolioValue" class="field-error">{{ errors.portfolioValue }}</span>
          </div>
          <div class="form-field">
            <label>Risk Score (0-100)</label>
            <input v-model="riskScore" type="number" placeholder="75" :class="['crm-input', { 'input-error': errors.riskScore }]" />
            <span v-if="errors.riskScore" class="field-error">{{ errors.riskScore }}</span>
          </div>
          <div class="form-field">
            <label>Goal Progress (%)</label>
            <input v-model="goalProgress" type="number" placeholder="80" :class="['crm-input', { 'input-error': errors.goalProgress }]" />
            <span v-if="errors.goalProgress" class="field-error">{{ errors.goalProgress }}</span>
          </div> -->
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-tertiary" @click="$router.push('/clients')">Cancel</button>
        <button class="btn-primary" @click="submit">
          <q-icon name="person_add" size="16px" style="margin-right:6px" />
          Create Client
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useClientsStore } from 'stores/clients'

const router = useRouter()
const store = useClientsStore()

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  // phone: yup.string().matches(/^[+\d\s\-().]*$/, 'Invalid phone format').optional(),
  // portfolioValue: yup.number()
  //   .typeError('Must be a number')
  //   .positive('Must be a positive number')
  //   .nullable()
  //   .transform((val, orig) => (orig === '' ? null : val))
  //   .optional(),
  // riskScore: yup.number()
  //   .typeError('Must be a number')
  //   .min(0, 'Min is 0')
  //   .max(100, 'Max is 100')
  //   .nullable()
  //   .transform((val, orig) => (orig === '' ? null : val))
  //   .optional(),
  // goalProgress: yup.number()
  //   .typeError('Must be a number')
  //   .min(0, 'Min is 0')
  //   .max(100, 'Max is 100')
  //   .nullable()
  //   .transform((val, orig) => (orig === '' ? null : val))
  //   .optional()
})

const { handleSubmit, errors } = useForm({ validationSchema: schema })
const { value: firstName } = useField('firstName')
const { value: lastName } = useField('lastName')
const { value: email } = useField('email')
// const { value: phone } = useField('phone')
// const { value: portfolioValue } = useField('portfolioValue')
// const { value: riskScore } = useField('riskScore')
// const { value: goalProgress } = useField('goalProgress')

const submit = handleSubmit(async (values) => {
 const client = await store.addClient(values)
  router.push(`/clients`)
})
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
  &.input-error { border-color: #e53935; }
}

.field-error {
  font-size: 11px;
  color: #e53935;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--crm-border);
}
</style>
