<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Logo -->
      <div class="login-logo">
        <div class="logo-circle">
          <span class="logo-f">F</span>
        </div>
        <span class="logo-text">inary</span>
      </div>

      <h1 class="login-title">Welcome Back</h1>
      <p class="login-subtitle">Sign in to your Financial CRM</p>

      <div class="login-form">
        <div class="form-field">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="carl@finary.com"
            :class="['crm-input', { 'input-error': errors.email }]"
            @keyup.enter="login"
          />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>
        <div class="form-field">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            :class="['crm-input', { 'input-error': errors.password }]"
            @keyup.enter="login"
          />
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>
        <button class="btn-login" @click="login" :disabled="loading">
          <span v-if="!loading">Sign In</span>
          <q-spinner v-else size="18px" color="white" />
        </button>
      </div>

      <p class="login-footer">
        <a href="#" class="text-blue">Forgot password?</a>
      </p>
    </div>

    <!-- Background decoration -->
    <div class="login-bg-deco"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const loading = ref(false)

const schema = yup.object({
  email: yup.string().email('Must be a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
})

const { handleSubmit, errors } = useForm({ validationSchema: schema })
const { value: email } = useField('email')
const { value: password } = useField('password')

const login = handleSubmit(async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  loading.value = false
  router.push('/dashboard')
})
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #001A5E 0%, #002DA5 60%, #0044CC 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 48px;
  width: 440px;
  max-width: calc(100vw - 48px);
  position: relative;
  z-index: 1;
  box-shadow: 0 24px 64px rgba(0,0,0,0.2);
}

.login-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;

  .logo-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(0, 102, 255, 0.1);
    border: 2px solid rgba(0, 102, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-f {
    font-family: 'Sen', sans-serif;
    font-weight: 700;
    font-size: 26px;
    color: #0066FF;
    line-height: 1;
  }

  .logo-text {
    font-family: 'Sen', sans-serif;
    font-weight: 700;
    font-size: 32px;
    color: #0066FF;
    letter-spacing: -0.5px;
  }
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #11151F;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
}

.login-subtitle {
  font-size: 15px;
  color: #676767;
  margin-bottom: 32px;
  font-family: 'Roboto', sans-serif;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  padding: 10px 14px;
  border: 1px solid #B6C2E2;
  border-radius: 6px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  color: #445275;
  outline: none;
  transition: border-color 0.2s;
  background: white;

  &:focus { border-color: #0066FF; }
  &::placeholder { color: #bbb; }
  &.input-error { border-color: #e53935; }
}

.field-error {
  font-size: 11px;
  color: #e53935;
}

.btn-login {
  background: #0243EC;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-top: 8px;

  &:hover:not(:disabled) { background: darken(#0243EC, 8%); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
}

.login-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

// Background circles
.login-bg-deco {
  position: absolute;
  inset: 0;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.06);
    top: -200px;
    right: -200px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.04);
    bottom: -100px;
    left: -100px;
  }
}
</style>
