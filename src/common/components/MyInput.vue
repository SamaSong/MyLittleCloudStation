<template>
  <div>
    <component :is="h(ElInput, {...$attrs, ref: changeRef}, $slots)"></component>
  </div>
</template>

<script setup>
import { getCurrentInstance, h, ref } from "vue";
import { ElInput } from "element-plus";

defineProps([])

const vm = getCurrentInstance();

const changeRef = (exposed) => {
  vm.exposed = exposed;
}
</script>

<style scoped lang="scss">

</style>
