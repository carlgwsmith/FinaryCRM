import { createApp } from 'vue'
import { Quasar, Notify, Dialog, Loading } from 'quasar'
import { createPinia } from 'pinia'

// Quasar extras
import '@quasar/extras/mdi-v7/mdi-v7.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/roboto-font/roboto-font.css'

// Quasar CSS
import 'quasar/src/css/index.sass'

// App CSS
import './css/app.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: { Notify, Dialog, Loading },
  config: {
    brand: {
      primary:   '#0066FF',
      secondary: '#445275',
      accent:    '#0243EC',
      positive:  '#03BB4C',
      negative:  '#D20319',
      info:      '#CAE1FC',
      warning:   '#FF8C00'
    }
  }
})

app.mount('#app')
