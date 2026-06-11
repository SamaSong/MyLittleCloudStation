<script setup>
import { ref } from 'vue'

const props = defineProps({
  language: {
    type: String,
    default: 'js',
  },
  copyable: {
    type: Boolean,
    default: true,
  },
})

const codeRef = ref(null)
const copied = ref(false)

const copyCode = async () => {
  if (!props.copyable || !codeRef.value) return
  const text = codeRef.value.innerText.trim()
  if (!text) return
  await navigator.clipboard.writeText(text)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1200)
}
</script>

<template>
  <div class="code-block">
    <div class="code-block__header">
      <span>{{ props.language }}</span>
      <button
        v-if="props.copyable"
        class="code-block__copy"
        type="button"
        @click="copyCode"
      >
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre v-highlight>
      <code ref="codeRef">
        <slot></slot>
      </code>
    </pre>
  </div>
</template>

<style scoped lang="scss">
.code-block {
  overflow: hidden;
  border-radius: 8px;
  background: #282c34;
}

.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #d1d5db;
  font-size: 13px;
}

.code-block__copy {
  height: 26px;
  padding: 0 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 5px;
  background: transparent;
  color: #e5e7eb;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
}

pre {
  margin: 0;
}
</style>
