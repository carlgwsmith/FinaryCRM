import { boot } from 'quasar/wrappers'
import Highcharts from 'highcharts'
import 'highcharts/highcharts-more'
import 'highcharts/modules/solid-gauge'
import HighchartsVue from 'highcharts-vue'

// v12+: modules auto-apply on import. Default export = Highcharts object (not namespace).

export default boot(({ app }) => {
  app.use(HighchartsVue, { highcharts: Highcharts })
})
