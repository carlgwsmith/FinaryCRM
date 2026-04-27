<template>
  <div class="crm-layout">
    <!-- Sidebar -->
    <aside class="crm-sidebar" :class="{ open: sidebarOpen }">
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="logo-circle">
          <span class="crm-brand logo-f">F</span>
        </div>
        <span class="crm-brand logo-text">inary</span>
        <button class="sidebar-close" @click="sidebarOpen = false">
          <q-icon name="close" size="20px" />
        </button>
      </div>

      <!-- Active indicator strip -->
      <div class="active-strip" v-if="activeRoute">
        <div class="active-bg"></div>
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
            @click="navigate(); sidebarOpen = false"
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
          <div class="nav-item" :class="{ active: isActive }" @click="navigate(); sidebarOpen = false">
            <q-icon name="settings" size="18px" class="nav-icon" />
            <span class="nav-label">Settings</span>
          </div>
        </RouterLink>

        <RouterLink to="/support" custom v-slot="{ navigate, isActive }">
          <div class="nav-item" :class="{ active: isActive }" @click="navigate(); sidebarOpen = false">
            <q-icon name="help_outline" size="18px" class="nav-icon" />
            <span class="nav-label">Support</span>
          </div>
        </RouterLink>
      </div>
    </aside>

    <!-- Main content area -->
    <div class="crm-main">
      <!-- Top bar -->
      <header class="crm-topbar">
        <!-- Mobile menu toggle -->
        <q-btn
          flat
          round
          icon="menu"
          class="mobile-toggle"
          @click="sidebarOpen = !sidebarOpen"
        />

        <div class="topbar-spacer" />

        <!-- Right side: logout -->
        <div class="topbar-right">
          <button class="logout-btn" @click="logout">
            <q-icon name="logout" size="18px" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <!-- Page content -->
      <main class="crm-content">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="mobile-overlay"
      @click="sidebarOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const sidebarOpen = ref(false)

const activeRoute = computed(() => route.path)

const navItems = [
  { path: '/dashboard',      label: 'Dashboard',      icon: 'dashboard' },
  { path: '/clients',        label: 'Clients',         icon: 'people',   children: true },
  { path: '/quick-analysis', label: 'Quick Analysis',  icon: 'speed' }
]

function logout() {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
// Sidebar logo area
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  height: var(--topbar-height);
  border-bottom: 1px solid rgba(255,255,255,0.1);

  .logo-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-f {
    font-size: 17px;
    color: var(--crm-primary);
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

  &:hover {
    color: #fff;
  }

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// Active indicator
.active-strip {
  position: absolute;
  right: 0;
  width: 4px;
  height: 48px;
  background: var(--crm-primary);
  border-radius: 4px 0 0 4px;
  transition: top 0.3s ease;
}

// Nav sections
.sidebar-nav {
  padding: 16px 0;
  flex: 1;
}

.sidebar-bottom {
  padding: 16px 0 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

// Topbar
.topbar-spacer {
  flex: 1;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: var(--crm-text-secondary);
  font-family: 'Roboto', sans-serif;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0,0,0,0.04);
    color: var(--crm-text);
  }
}

// Mobile
.mobile-toggle {
  display: none;

  @media (max-width: 1024px) {
    display: flex;
  }
}

.mobile-overlay {
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 99;
  }
}

// Page transitions
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
