<template>
  <div class="news-item" @click="openArticle">
    <div class="news-thumb">
      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="thumb-img" />
      <div v-else class="thumb-placeholder">
        <q-icon name="article" size="24px" color="grey-5" />
      </div>
    </div>
    <div class="news-content">
      <p class="news-title">{{ item.title }}</p>
      <div class="news-meta">
        <span class="news-source">{{ item.source }}</span>
        <span class="meta-dot">·</span>
        <span class="news-date">{{ item.date }}</span>
        <span v-if="item.sentiment" class="meta-dot">·</span>
        <span v-if="item.sentiment" class="news-sentiment" :class="sentimentClass">{{ item.sentiment }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true }
})

const sentimentClass = computed(() => {
  const s = props.item.sentiment?.toLowerCase() || ''
  if (s.includes('bullish')) return 'sentiment-up'
  if (s.includes('bearish')) return 'sentiment-down'
  return 'sentiment-neutral'
})

function openArticle() {
  if (props.item.url) window.open(props.item.url, '_blank', 'noopener')
}
</script>

<style scoped>
.news-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
}

.news-thumb {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #f0f0f0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.news-content {
  flex: 1;
  min-width: 0;
}

.news-title {
  font-size: 13px;
  font-weight: 500;
  color: #11151F;
  line-height: 1.4;
  margin: 0 0 5px;
  font-family: 'Roboto', sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.news-source {
  font-size: 11px;
  font-weight: 500;
  color: #445275;
  font-family: 'Roboto', sans-serif;
}

.news-date {
  font-size: 11px;
  color: #676767;
  font-family: 'Roboto', sans-serif;
}

.meta-dot {
  font-size: 11px;
  color: #B1B1B1;
}

.news-sentiment {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.sentiment-up      { color: #03BB4C; }
.sentiment-down    { color: #D20319; }
.sentiment-neutral { color: #676767; }
</style>
