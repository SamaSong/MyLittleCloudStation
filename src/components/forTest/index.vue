<template>
  <div class="content-container">
<!--    <MyInput ref="InputRef" v-model="modelValue"></MyInput>-->
    <MyInputX v-model="modelValue">
      <template #append>append</template>
    </MyInputX>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 引入组件
import MyInput from "@/common/components/MyInput.vue";
import MyInputX from "@/common/components/MyInputX.jsx";

const modelValue = ref('')
</script>

<style scoped lang="scss">

</style>
