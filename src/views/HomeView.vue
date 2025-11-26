<script setup>
  import Aside from "@/components/aside.vue";
  import { RouterView, useRouter } from 'vue-router'
  import { Share, Search } from '@element-plus/icons-vue'
  import { useMenuItemNameStore } from "@/stores/menuItemName.js";
  import asideConfig from '@/assets/asideConfig.js'
  import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";

  const router = useRouter()
  const menuStore = useMenuItemNameStore()
  const footerData = ref(null)
  const searchKeyword = ref('') // 搜索框关键字
  const isSearchActive = ref(false) // 控制面板显示/隐藏
  const searchContainerRef = ref(null) // 记录搜索区域 DOM
  const shouldShowSearchPanel = computed(() => {
    // 有输入内容且处于激活态才需要展示下拉面板
    return isSearchActive.value && !!searchKeyword.value.trim()
  })

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

  // 第二层级（含路由的分组）列表
  const groupSearchItems = computed(() => {
    return asideConfig.flatMap(section => {
      return section.children?.filter(group => group.path)?.map(group => ({
        id: `group-${group.path}`,
        section: section.name,
        group: group.name,
        path: group.path,
        type: 'group'
      })) ?? []
    })
  })

  // 第三层级（具体知识点）列表，扁平化并保留层级信息
  const childSearchItems = computed(() => {
    return asideConfig.flatMap(section => {
      return section.children?.flatMap(group => {
        if (!group.path) {
          return []
        }
        return group.children?.map(child => ({
          id: `${group.path}-${child.name}`,
          section: section.name,
          group: group.name,
          child: child.name,
          path: group.path,
          anchorId: `_${child.name}`,
          type: 'child'
        })) ?? []
      }) ?? []
    })
  })


  // 根据输入关键字过滤可选项，支持多层级模糊匹配
  const filteredSearchItems = computed(() => {
    const keyword = searchKeyword.value.trim().toLowerCase()
    if (!keyword) {
      return []
    }
    const matchedGroups = groupSearchItems.value.filter(item => {
      return item.group.toLowerCase().includes(keyword)
    })
    if (matchedGroups.length) {
      return matchedGroups
    }
    return childSearchItems.value.filter(item => {
      return (
        item.section.toLowerCase().includes(keyword) ||
        item.group.toLowerCase().includes(keyword) ||
        item.child.toLowerCase().includes(keyword)
      )
    })
  })

  const handleSearchFocus = () => {
    isSearchActive.value = true
  }

  const closeSearchPanel = () => {
    isSearchActive.value = false
  }

  // 监听全局点击用于收起面板
  const handleClickOutside = (event) => {
    if (!searchContainerRef.value) return
    if (!searchContainerRef.value.contains(event.target)) {
      closeSearchPanel()
    }
  }

  // 点击搜索结果：展开侧边菜单、切换路由并滚动到对应标题
  const locateContent = async (item) => {
    if (!item.path) return
    closeSearchPanel()
    const keywordBeforeJump = item.child
    searchKeyword.value = ''
    if (item.type === 'child') {
      menuStore.menuItemName = keywordBeforeJump
    } else {
      menuStore.menuItemName = null
    }

    if (menuStore.menuRef) {
      menuStore.menuRef.open(item.section)
      menuStore.menuRef.open(item.group)
      setTimeout(() => {
        let element = document.getElementById(item.path)
        element.click()
      }, 0)
    }
    if (router.currentRoute.value.path !== item.path) {
      await router.push(item.path)
    }
    await nextTick()
    if (item.type === 'child') {
      const anchor = document.getElementById(item.anchorId)
      if (anchor) {
        anchor.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      const mainContainer = document.querySelector('.page-main')
      mainContainer?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
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

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<template>
  <div class="wrapper-container">
    <el-container>
      <el-header class="page-header">
        <div class="page-header-left">前端小站</div>
        <div ref="searchContainerRef" class="search-wrapper" @click.stop>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索知识点"
            class="search-input"
            clearable
            @focus="handleSearchFocus"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <div v-if="shouldShowSearchPanel" class="search-panel">
            <div
              v-if="filteredSearchItems.length"
              class="search-panel-list"
            >
              <div
                class="search-panel-item"
                v-for="item in filteredSearchItems"
                :key="item.id"
                @click="locateContent(item)"
              >
                <span class="search-panel-item__section">{{ item.section }}</span>
                <span class="search-panel-item__divider">/</span>
                <span class="search-panel-item__group">{{ item.group }}</span>
                <template v-if="item.type === 'child'">
                  <span class="search-panel-item__divider">/</span>
                  <span class="search-panel-item__child">{{ item.child }}</span>
                </template>
              </div>
            </div>
            <div v-else class="search-panel-empty">暂无匹配内容</div>
          </div>
        </div>
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
    .search-wrapper {
      position: relative;
      max-width: 320px;
      width: 100%;
      margin-right: 20px;
      .search-panel {
        position: absolute;
        top: calc(100% + 5px);
        left: 0;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        padding: 8px 0;
        z-index: 10;
        .search-panel-list {
          max-height: 320px;
          overflow-y: auto;
        }
        .search-panel-item {
          display: flex;
          align-items: center;
          padding: 6px 16px;
          font-size: 13px;
          cursor: pointer;
          color: #2c3e50;
          transition: background-color 0.2s ease;
          &:hover {
            background-color: rgba(63, 174, 124, 0.08);
          }
        }
        .search-panel-item__section {
          color: #909399;
        }
        .search-panel-item__group {
          color: #606266;
        }
        .search-panel-item__child {
          color: #303133;
          font-weight: 600;
        }
        .search-panel-item__divider {
          padding: 0 6px;
          color: #c0c4cc;
        }
        .search-panel-empty {
          text-align: center;
          color: #999;
          font-size: 13px;
          padding: 8px 0;
        }
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
