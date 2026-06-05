import { boot } from "quasar/wrappers";
import axios from "axios";
import { useUserStore } from "../stores/user";

const api = axios.create({ baseURL: "" });

export default boot(({ app }) => {
  const userStore = useUserStore();

  api.interceptors.request.use((config) => {
    if (userStore.isAuthenticated && userStore.user) {
      config.auth = {
        username: userStore.user.username,
        password: userStore.user.password,
      };
    }
    return config;
  });

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
