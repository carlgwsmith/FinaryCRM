<template>
  <div class="data-table">
    <!-- Column headers -->
    <div class="dt-header" :style="gridStyle">
      <div v-for="col in columns" :key="col.key" class="dt-th">
        {{ col.label }}
        <q-icon name="arrow_drop_down" size="20px" class="sort-arrow" />
      </div>
      <div class="dt-th action-th"></div>
    </div>

    <!-- Rows -->
    <div
      v-for="row in rows"
      :key="row.id"
      class="dt-row"
      :style="gridStyle"
    >
      <div
        v-for="col in columns"
        :key="col.key"
        class="dt-td"
      >
        {{ row[col.key] }}
      </div>
      <div class="dt-td action-td">
        <button class="row-delete-btn" @click="$emit('delete', row.id)" title="Remove">
          <q-icon name="close" size="14px" />
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!rows.length" class="dt-empty">
      <q-icon name="table_rows" size="32px" color="grey-4" />
      <p>{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: { type: Array, required: true },
  rows:    { type: Array, default: () => [] },
  emptyMessage: { type: String, default: 'No data' }
})

defineEmits(['delete'])

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns.length}, 1fr) 40px`
}))
</script>

<style scoped>
.data-table { width: 100%; }

.dt-header {
  display: grid;
  padding: 10px 24px;
  border-bottom: 1px solid var(--crm-border);
  background: #fafafa;
}

.dt-th {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: rgba(17, 21, 31, 0.7);
  font-family: 'Roboto', sans-serif;
  cursor: pointer;

  .sort-arrow { opacity: 0.6; }
}

.dt-row {
  display: grid;
  padding: 0 24px;
  border-bottom: 1px solid var(--crm-border);
  min-height: 72px;
  align-items: center;
  transition: background 0.15s;

  &:hover { background: #fafafa; }
  &:last-child { border-bottom: none; }
}

.dt-td {
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  color: var(--crm-text);
}

.action-th, .action-td { justify-content: flex-end; }

.row-delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: var(--crm-text-secondary);
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;

  .dt-row:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(210, 3, 25, 0.08);
    color: var(--crm-error);
  }
}

.dt-empty {
  padding: 40px;
  text-align: center;
  color: var(--crm-text-secondary);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
