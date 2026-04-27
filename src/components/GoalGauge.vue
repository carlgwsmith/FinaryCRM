<template>
  <highcharts :options="chartOptions" class="gauge-chart" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 81 }
})

const chartOptions = computed(() => ({
  chart: {
    type: 'solidgauge',
    backgroundColor: 'transparent',
    margin: [0, 0, 0, 0],
    spacing: [0, 0, 0, 0],
    animation: { duration: 600 }
  },
  title: null,
  credits: { enabled: false },
  tooltip: { enabled: false },
  accessibility: { enabled: false },
  pane: {
    startAngle: -135,
    endAngle: 135,
    background: [{
      backgroundColor: '#f0f0f0',
      innerRadius: '68%',
      outerRadius: '100%',
      shape: 'arc',
      borderWidth: 0
    }]
  },
  yAxis: {
    min: 0,
    max: 100,
    tickPositions: [],
    lineWidth: 0
  },
  plotOptions: {
    solidgauge: {
      innerRadius: '68%',
      rounded: true,
      dataLabels: {
        enabled: true,
        borderWidth: 0,
        y: -24,
        useHTML: true,
        formatter() {
          return `<div style="text-align:center;font-family:Roboto,sans-serif;">
            <div style="font-size:32px;font-weight:700;color:#11151F;line-height:1">${this.y}%</div>
            <div style="font-size:11px;color:#676767;margin-top:4px">likelihood</div>
          </div>`
        }
      }
    }
  },
  series: [{
    data: [{
      y: props.value,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
          [0, '#0243EC'],
          [1, '#0066FF']
        ]
      }
    }]
  }]
}))
</script>

<style scoped>
.gauge-chart {
  width: 100%;
  height: 180px;
}
</style>
