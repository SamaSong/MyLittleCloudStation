<template>
  <div class="content-container">
<!--    <MyInput ref="InputRef" v-model="modelValue"></MyInput>-->
    <MyInputX v-model="modelValue" ref="myInputXRef">
      <template #append>append</template>
    </MyInputX>
<!--    卡片3D翻转的实现 -->
    <div class="card-container">
      <div class="card" :class="{flipped: isFlipped}" @click="handleFlipped">
        <div class="card-front">点击我</div>
        <div class="card-back">你翻到了背面</div>
      </div>
    </div>
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

const isFlipped = ref(false);

const handleFlipped = () => {
  isFlipped.value = !isFlipped.value;
}

onMounted(async () => {
  await nextTick()
})

const createHelloWorld = function() {
  return function(...args) {
    console.log('Hello World')
  }
};

const f = createHelloWorld()
f()
</script>

<style scoped lang="scss">
.card-container {
  width: 200px;
  height: 300px;
  perspective: 1000px;
  margin: 50px auto;
  .card {
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    .card-front,
    .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: black;
    }
    .card-front {
      background-color: #3498db;
    }
    .card-back {
      background-color: #e74c3c;
      transform: rotateY(180deg);
    }
  }
  /* 翻转状态 */
  .flipped {
    transform: rotateY(180deg);
  }
}

</style>
