<template>
  <div class="content-container">
    <IndexHome class="tt"/>
  </div>
</template>

<script setup>
import IndexHome from "@/views/indexHome.jsx";
import { getCurrentInstance, onMounted, ref, useTemplateRef } from "vue";

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
