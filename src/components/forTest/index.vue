<template>
  <div class="content-container">
    <MyInput ref="InputRef" v-model="modelValue"></MyInput>
    <MyInputX aaa="hello">
      <template #append>111</template>
    </MyInputX>
  </div>
</template>

<script setup>

import MyInput from "@/common/components/MyInput.vue";
import MyInputX from "@/common/components/MyInputX.jsx";
</script>

<style scoped lang="scss">

</style>
