import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isAuthenticated = computed(() => user.value !== null);

  const login = (userData) => {
    user.value = userData;
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
});
