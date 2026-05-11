<template>
  <aside class="crm-sidebar" :class="{ open: open }">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-circle">
        <span class="crm-brand logo-f">F</span>
      </div>
      <span class="crm-brand logo-text">inary</span>
      <q-btn class="sidebar-close" @click="open = false" unelevated>
        <q-icon name="close" size="20px" color="primary"/>
      </q-btn>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        custom
        v-slot="{ navigate, isActive }"
      >
        <div
          class="nav-item"
          :class="{ active: isActive }"
          @click="navigate(); open = false"
        >
          <q-icon :name="item.icon" size="18px" class="nav-icon" />
          <span class="nav-label">{{ item.label }}</span>
          <q-icon
            v-if="item.children"
            name="expand_more"
            size="18px"
            class="nav-icon ml-auto"
          />
        </div>
      </RouterLink>
    </nav>

    <!-- Bottom nav -->
    <div class="sidebar-bottom">
      <RouterLink to="/settings" custom v-slot="{ navigate, isActive }">
        <div class="nav-item" :class="{ active: isActive }" @click="navigate(); open = false">
          <q-icon name="settings" size="18px" class="nav-icon" />
          <span class="nav-label">Settings</span>
        </div>
      </RouterLink>

      <RouterLink to="/support" custom v-slot="{ navigate, isActive }">
        <div class="nav-item" :class="{ active: isActive }" @click="navigate(); open = false">
          <q-icon name="help_outline" size="18px" class="nav-icon" />
          <span class="nav-label">Support</span>
        </div>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const open = defineModel('open', { type: Boolean, default: false })

const route = useRoute()
const activeRoute = computed(() => route.path)

const navItems = [
  { path: '/dashboard',      label: 'Dashboard',     icon: 'dashboard' },
  { path: '/clients',        label: 'Clients',        icon: 'people',  children: true },
  { path: '/quick-analysis', label: 'Quick Analysis', icon: 'speed' }
]
</script>

<style lang="scss" scoped>
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 2px;
  background-color:white;
  padding: 0 16px;
  height: var(--topbar-height);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .logo-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background:var(--crm-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-f {
    font-size: 22px;
    color: white;
    line-height: 1;
  }

  .logo-text {
    font-size: 22px;
    color: var(--crm-primary);
    letter-spacing: -0.5px;
  }
}

.sidebar-close {
  display: none;
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  padding: 4px;
  line-height: 1;

  &:hover { color: #fff; }

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.sidebar-nav {
  padding: 16px 0;
  flex: 1;
}

.sidebar-bottom {
  padding: 16px 0 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
