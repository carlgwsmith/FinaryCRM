<template>
  <div class="schedule-grid">
    <!-- Hour headers -->
    <div class="time-row">
      <div class="day-label"></div>
      <div class="slots-area">
        <span v-for="h in hours" :key="h" class="hour-label">{{ formatHour(h) }}</span>
      </div>
    </div>

    <!-- Day rows -->
    <div v-for="day in days" :key="day" class="day-row">
      <div class="day-label">{{ day }}</div>
      <div class="slots-area">
        <!-- Grid lines -->
        <div
          v-for="h in hours"
          :key="`line-${h}`"
          class="time-line"
          :style="{ left: ((h - startHour) / totalHours) * 100 + '%' }"
        />
        <!-- Events for this day -->
        <div
          v-for="event in eventsForDay(day)"
          :key="event.id"
          class="event-pill"
          :class="event.type === 'blue' ? 'event-blue' : 'event-neutral'"
          :style="eventStyle(event)"
        >
          {{ event.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  events: { type: Array, default: () => [] }
})

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const startHour = 9
const endHour = 15
const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
const totalHours = endHour - startHour

function formatHour(h) {
  if (h <= 12) return `${h}:00`
  return `${h - 12}:00`
}

function eventsForDay(day) {
  return props.events.filter(e => e.day === day)
}

function eventStyle(event) {
  const left = ((event.startHour - startHour) / totalHours) * 100
  const width = (event.duration / totalHours) * 100
  return {
    left: `${left}%`,
    width: `${width}%`
  }
}
</script>

<style scoped>
.schedule-grid {
  font-family: 'Roboto', sans-serif;
}

.time-row {
  display: flex;
  align-items: center;
  height: 28px;
  margin-bottom: 4px;
}

.day-row {
  display: flex;
  align-items: center;
  height: 49px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
}

.day-label {
  width: 36px;
  font-size: 10px;
  color: #b1b1b1;
  font-weight: 500;
  flex-shrink: 0;
  text-align: center;
}

.slots-area {
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.hour-label {
  position: absolute;
  font-size: 10px;
  color: #b1b1b1;
  font-weight: 500;
  transform: translateX(-50%);
  white-space: nowrap;
}

.time-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #e8e8e8;
}

.event-pill {
  position: absolute;
  height: 25px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 8px;
}

.event-blue {
  background: rgba(202, 225, 252, 0.4);
  color: #0066FF;
}

.event-neutral {
  background: #ededed;
  color: #676767;
}
</style>
