import { boot } from 'quasar/wrappers'
import axios from 'axios'

const pw = import.meta.env.VITE_API_PASSWORD

const api = axios.create({
  baseURL: '',
  auth: { username: 'carl', password: pw }
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
