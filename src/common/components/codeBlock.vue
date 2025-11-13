<script setup>
  const props = defineProps({
    language: {
      type: String,
      default: 'js',
    }
  })
</script>

<template>
  <div class="container">
    <h6>{{ props.language }}</h6>
    <pre v-highlight>
      <code>
        <slot></slot>
      </code>
    </pre>
  </div>
</template>

<style scoped lang="scss">
  .container {
    position: relative;
    h6 {
      position: absolute;
      top: 30px;
      left: 10px;
      color: white;
    }
  }
</style>
