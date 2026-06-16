import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "../services/api";

export const useUserStore = defineStore("user", () => {
  const user = ref(JSON.parse(localStorage.getItem("user") || "null"));
  const isAuthenticated = computed(() => user.value !== null);

  const login = async ({ username, password }) => {
    // Base64 encode "username:password" for Basic Auth
    const credentials = btoa(`${username}:${password}`);

    // Verify credentials against the backend
    const response = await api.get("/clients", {
      headers: { Authorization: `Basic ${credentials}` },
    });

    if (response.status === 200) {
      localStorage.setItem("auth", credentials);
      user.value = { username };
      localStorage.setItem("user", JSON.stringify({ username }));
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
});
