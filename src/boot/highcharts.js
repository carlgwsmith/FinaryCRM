import { boot } from 'quasar/wrappers'
import Highcharts from 'highcharts/esm/highcharts.js'
import 'highcharts/esm/highcharts-more.js'
import 'highcharts/esm/modules/solid-gauge.js'
import HighchartsVue from 'highcharts-vue'

export default boot(({ app }) => {
  app.use(HighchartsVue, { highcharts: Highcharts })
})
