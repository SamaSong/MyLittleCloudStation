<template>
  <div class="content-container">
<!--    <MyInput ref="InputRef" v-model="modelValue"></MyInput>-->
    <MyInputX v-model="modelValue" ref="myInputXRef">
      <template #append>append</template>
    </MyInputX>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from "vue";
import Mock from 'mockjs'
// 引入组件
import MyInput from "@/common/components/MyInput.vue";
import MyInputX from "@/common/components/MyInputX.jsx";

const modelValue = ref('')
const myInputXRef = useTemplateRef('myInputXRef')

const template = {
  'list|5-10': [{
    'id|+1': 1,
    'name': '@cname',
    'age|18-60': 1,
    'email': '@email',
    'date': '@date'
  }]
};
const data = Mock.mock(template);
console.log('data ==> ', data)

onMounted(async () => {
  await nextTick()
})
</script>

<style scoped lang="scss">

</style>
