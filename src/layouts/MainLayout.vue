<template>
  <div class="crm-layout">
    <AppSidebar v-model:open="sidebarOpen" />

    <!-- Main content area -->
    <div class="crm-main">
      <!-- Top bar -->
      <header class="crm-topbar">
        <button class="mobile-toggle" @click="sidebarOpen = !sidebarOpen">
          <q-icon name="menu" size="22px" />
        </button>

        <div class="topbar-spacer" />

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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import AppSidebar from "components/AppSidebar.vue";

const userStore = useUserStore();
const router = useRouter();
const sidebarOpen = ref(false);

function logout() {
  userStore.logout();
  router.push("/login");
}
</script>

<style lang="scss" scoped>
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
  font-family: "Roboto", sans-serif;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: var(--crm-text);
  }
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
