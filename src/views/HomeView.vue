<script setup>
  import Aside from "@/components/aside.vue";
  import { RouterView, useRouter} from 'vue-router'
  import { Share } from '@element-plus/icons-vue'

  const router = useRouter()

  const jumpTo = (path) => {
    router.push(path)
  }

  const handleShare = () => {
    window.open('https://github.com/SamaSong')
  }
</script>

<template>
  <div class="wrapper-container">
    <el-container>
<!--      <el-header class="page-header">我的云端小站</el-header>-->
      <el-header class="page-header">
        <div class="page-header-left">Cloud</div>
        <div class="page-header-right" @click="handleShare()">GitHub<el-icon><Share /></el-icon></div>
      </el-header>
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
    border-bottom: 1px solid #eee;
    .page-header-left {
      display: flex;
      flex: 1;
    }
    .page-header-right {
      font-weight: bold;
      cursor: pointer;
      display: flex;
      font-size: 14px;
      align-items: center;
      :deep(.el-icon) {
        margin-left: 5px;
      }
    }
  }
  .page-aside {
    width: 280px;
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
