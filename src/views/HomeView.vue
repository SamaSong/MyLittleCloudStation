<script setup>
  import Aside from "@/components/aside.vue";
  import { RouterView, useRouter} from 'vue-router'

  const router = useRouter()

  const jumpTo = (path) => {
    router.push(path)
  }
</script>

<template>
  <div class="wrapper-container">
    <el-container>
      <el-header class="page-header">我的云端小站</el-header>
      <el-container>
        <el-aside class="page-aside">
          <Aside @jumpTo="jumpTo"/>
        </el-aside>
        <el-main class="page-main">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.wrapper-container {
  width: 100%;
  height: 100%;
  .page-header {
    display: flex;
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    align-items: center;
    border-bottom: 2px solid #eee;
  }
  .page-aside {
    padding-top: 15px;
    width: 320px;
  }
  .page-main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: calc(100vh - 60px);
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
