<template>
  <highcharts :options="chartOptions" class="perf-chart" />
</template>

<script setup>
import { computed } from 'vue'
import Highcharts from 'highcharts/esm/highcharts.js'

const props = defineProps({
  data: { type: Array, default: () => [] }
})

const chartOptions = computed(() => ({
  chart: {
    type: 'areaspline',
    backgroundColor: 'transparent',
    margin: [20, 16, 32, 52],
    animation: { duration: 500 },
    style: { fontFamily: 'Roboto, sans-serif' }
  },
  title: null,
  credits: { enabled: false },
  legend: { enabled: false },
  accessibility: { enabled: false },
  xAxis: {
    categories: props.data.map(d => d.month),
    tickLength: 0,
    gridLineWidth: 0,
    lineWidth: 0,
    labels: {
      style: { fontSize: '11px', color: '#676767' }
    }
  },
  yAxis: {
    title: null,
    gridLineColor: '#f0f0f0',
    gridLineDashStyle: 'Dash',
    labels: {
      formatter() { return `$${this.value / 1000}k` },
      style: { fontSize: '11px', color: '#676767' }
    }
  },
  tooltip: {
    useHTML: true,
    formatter() {
      return `<div style="font-family:Roboto,sans-serif;font-size:12px;color:#fff">
        <b>$${Highcharts.numberFormat(this.y, 0)}</b>
      </div>`
    },
    backgroundColor: '#11151F',
    borderWidth: 0,
    borderRadius: 6,
    shadow: false,
    padding: 8
  },
  plotOptions: {
    areaspline: {
      color: '#0066FF',
      lineWidth: 2,
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(202,225,252,0.55)'],
          [1, 'rgba(202,225,252,0)']
        ]
      },
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 4,
        fillColor: '#fff',
        lineWidth: 2,
        lineColor: '#0066FF',
        states: { hover: { enabled: true } }
      }
    }
  },
  series: [{
    name: 'Policy Premium',
    data: props.data.map(d => d.value)
  }]
}))
</script>

<style scoped>
.perf-chart {
  width: 100%;
  height: 200px;
}
</style>
