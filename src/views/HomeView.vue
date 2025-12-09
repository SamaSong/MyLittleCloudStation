<template>
  <div class="content-container">
    <IndexHome />
    <MyInput place ref="InputRef" v-model="modelValue"></MyInput>
    <MyInputX aaa="hello">
      <template #append>111</template>
    </MyInputX>
  </div>
</template>

<script setup>
import IndexHome from "@/views/indexHome.jsx";
import MyInput from "@/common/components/MyInput.vue";
import MyInputX from "@/common/components/MyInputX.jsx"
import {ref, useTemplateRef} from "vue";

const modelValue = ref("InputRef");
const input = useTemplateRef('InputRef')

</script>

<style scoped lang="scss">

</style>
