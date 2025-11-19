<script setup>
  import Aside from "@/components/aside.vue";
  import { RouterView, useRouter} from 'vue-router'
  import { Share, Search } from '@element-plus/icons-vue'
  import { useMenuItemNameStore } from "@/stores/menuItemName.js";
  import asideConfig from '@/assets/asideConfig.js'
  import {nextTick, onMounted, ref, watch} from "vue";

  const router = useRouter()
  const menuStore = useMenuItemNameStore()
  const footerData = ref(null)
  // const search = ref(null)

  const jumpTo = (path) => {
    router.push(path)
  }

  const handleShare = () => {
    window.open('https://github.com/SamaSong')
  }

  watch(() => router.currentRoute.value.path,() => {
      footerData.value = asideConfig.map(item => {
        let childrenIndex = item.children.findIndex(child => child.path === location.pathname)
        return {
          name: item.name,
          childrenIndex: childrenIndex,
          children: item.children
        }
      }).filter(ele => ele.childrenIndex !== -1)[0]
    },
    {
      immediate: true,
    }
  )

  const clickFooter = (data) => {
    router.push(data.path)
    setTimeout(() => {
      menuStore.menuRef.open(footerData.value.name)
      menuStore.menuRef.open(data.name)
      setTimeout(() => {
        let element = document.getElementById(location.pathname)
        element.click()
      }, 0)
    }, 50)
  }

  // const searchInput = (val) => {
  //   console.log("=>(HomeView.vue:50) val", val);
  // }

  onMounted(() => {
    if (footerData.value) {
      menuStore.menuRef.open(footerData.value.name)
    }
    if (location.pathname !== '/home' && footerData.value) {
      let name = footerData.value.children.map(item => {
        if (item.path === location.pathname) {
          return item.name
        }
      }).filter(ele => ele && ele.trim())[0]
      menuStore.menuRef.open(name)
      setTimeout(() => {
        let element = document.getElementById(location.pathname)
        element.click()
      }, 0)
    }
  })
</script>

<template>
  <div class="wrapper-container">
    <el-container>
<!--      <el-header class="page-header">我的云端小站</el-header>-->
      <el-header class="page-header">
        <div class="page-header-left">Cloud</div>
<!--        <el-input-->
<!--          v-model="search"-->
<!--          @input="searchInput"-->
<!--          style="max-width: 200px; margin-right: 20px;"-->
<!--          class="search-input"-->
<!--        >-->
<!--          <template #prefix>-->
<!--            <el-icon><Search /></el-icon>-->
<!--          </template>-->
<!--        </el-input>-->
        <div class="page-header-right" @click="handleShare()">GitHub<el-icon><Share /></el-icon></div>
      </el-header>
      <el-container>
        <el-aside class="page-aside">
          <Aside @jumpTo="jumpTo"/>
        </el-aside>
        <el-main class="page-main">
          <RouterView></RouterView>
          <el-footer class="page-footer" v-if="footerData">
            <div class="page-footer-left" v-if="footerData.children[footerData.childrenIndex - 1]">
              ←
              <span
                @click="clickFooter(footerData.children[footerData.childrenIndex - 1])"
              >{{ footerData.children[footerData.childrenIndex - 1].name }}</span>
            </div>
            <div class="page-footer-right" v-if="footerData.children[footerData.childrenIndex + 1]">
              <span
                @click="clickFooter(footerData.children[footerData.childrenIndex + 1])"
              >{{ footerData.children[footerData.childrenIndex + 1].name }}</span>
              →
            </div>
          </el-footer>
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
    .search-input {
      :deep(.el-input__wrapper) {
        border-radius: 30px;
      }
    }
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
    .page-footer {
      display: flex;
      flex: 1;
      width: 100%;
      border-top: 1px solid #eee;
      padding: 20px 0;
      font-size: 16px;
      .page-footer-right {
        display: flex;
        flex: 1;
        justify-content: flex-end;
      }
      span {
        color: #3eaf7c;
        font-weight: bold;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
