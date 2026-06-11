<script setup>
import { computed } from 'vue'
import { getAnchorId } from '@/common/tools/anchor.js'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const anchorId = computed(() => getAnchorId(props.title))
</script>

<template>
  <section :data-custom="title" class="article-section">
    <h2 :id="anchorId">{{ title }}</h2>
    <slot></slot>
  </section>
</template>
