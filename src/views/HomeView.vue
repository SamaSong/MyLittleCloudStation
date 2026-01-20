<template>
  <div class="content-container">
    <IndexHome class="tt"/>
  </div>
</template>

<script setup>
import IndexHome from "@/views/indexHome.jsx";
import MyInput from "@/common/components/MyInput.vue";
import MyInputX from "@/common/components/MyInputX.jsx"
import {getCurrentInstance, onMounted, ref, useTemplateRef} from "vue";

const vm = getCurrentInstance();

const modelValue = ref("InputRef");
const input = useTemplateRef('InputRef')

// const worker = new Worker('./worker.js');
//
// worker.onmessage = function(event) {
//   console.log('收到结果:', event.data);
// };
//
// worker.postMessage('start');

for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    debugger
    console.log('i ==> ', i)
  }, 1000)
}

onMounted(() => {

})

</script>

<style scoped lang="scss">
.box {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: cadetblue;
  padding: 50px;
  //animation: boxAnimation 2s ease-out infinite;
}
.box1 {
  display: flex;
  justify-content: center;
  align-items: center;
  //width: 100px;
  //height: 100px;
  .bt {
    :hover {
      background-color: red;
    }
  }
}
.btn {
  color: red;
  &:hover {
    background-color: red;
  }
}
</style>
