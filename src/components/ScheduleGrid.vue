<template>
  <!-- List View -->
  <div v-if="view === 'list'" class="schedule-list">
    <div
      v-for="event in sortedEvents"
      :key="event.id"
      class="list-row"
    >
      <div class="list-day" :class="event.type === 'blue' ? 'list-day-blue' : 'list-day-neutral'">
        {{ event.day }}
      </div>
      <div class="list-info">
        <div class="list-title">{{ event.title }}</div>
        <div class="list-time">{{ formatHour(event.startHour) }} – {{ formatHour(event.startHour + event.duration) }}</div>
      </div>
    </div>
    <div v-if="sortedEvents.length === 0" class="list-empty">No upcoming events</div>
  </div>

  <!-- Calendar View -->
  <div v-else class="schedule-grid">
    <!-- Hour headers -->
    <div class="time-row">
      <div class="day-label"></div>
      <div class="slots-area">
        <span
          v-for="h in hours"
          :key="h"
          class="hour-label"
          :style="{ left: ((h - startHour) / totalHours) * 100 + '%' }"
        >{{ formatHour(h) }}</span>
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
import { computed } from 'vue'

const props = defineProps({
  events: { type: Array, default: () => [] },
  view: { type: String, default: 'calendar' }
})

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const sortedEvents = computed(() => {
  return [...props.events].sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day) || a.startHour - b.startHour)
})
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
  const width = Math.min((event.duration / totalHours) * 100, 100 - left)
  return {
    left: `${left}%`,
    width: `${width}%`
  }
}
</script>

<style scoped>
.schedule-list {
  font-family: 'Roboto', sans-serif;
  padding: 8px 0;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.list-day {
  width: 36px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  padding: 4px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.list-day-blue {
  background: rgba(202, 225, 252, 0.4);
  color: #0066FF;
}

.list-day-neutral {
  background: #ededed;
  color: #676767;
}

.list-title {
  font-size: 12px;
  font-weight: 500;
  color: #11151F;
}

.list-time {
  font-size: 10px;
  color: #b1b1b1;
  margin-top: 2px;
}

.list-empty {
  padding: 16px;
  font-size: 12px;
  color: #b1b1b1;
  text-align: center;
}

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
