<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">404</div>
      <h1 class="crm-h2" style="margin-bottom:12px">Page Not Found</h1>
      <p style="color:var(--crm-text-secondary);margin-bottom:32px">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button class="btn-primary" @click="$router.push('/dashboard')">
        <q-icon name="home" size="16px" style="margin-right:8px" />
        Back to Dashboard
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.error-page {
  min-height: calc(100vh - 83px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  text-align: center;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: rgba(0, 102, 255, 0.12);
  line-height: 1;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 16px;
  letter-spacing: -4px;
}
</style>
