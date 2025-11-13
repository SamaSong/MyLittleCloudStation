<script setup>
  import asideConfig from '@/assets/asideConfig.js'
  import { ref, defineEmits } from "vue";

  const activeName = ref(null)

  const emit = defineEmits(['jumpTo'])

  const handleOpen = (key, keyPath) => {

  }

  const handleClose = (key, keyPath) => {

  }

  const clickSubMenu = (path, name) => {
    emit('jumpTo', path)
    activeName.value = name
  }
</script>

<template>
  <div class="wrapper-aside">
    <el-menu
      class="aside-menu"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
    >
      <el-sub-menu v-for="(item, index) in asideConfig" :key="index" :index="item.name">
        <template #title>
          <span class="menu-title">{{ item.name }}</span>
        </template>
        <el-sub-menu
          v-for="(groupItem, groupIndex) in item.children"
          :key="groupIndex"
          :index="groupItem.name"
          @click='clickSubMenu(groupItem.path, groupItem.name)'
        >
          <template #title>
            <span :class="{ 'active' : activeName === groupItem.name }">{{ groupItem.name }}</span>
          </template>
          <el-menu-item v-for="(subItem, subIndex) in groupItem.children" :key="subIndex" :index="subItem.name">
            <span>{{ subItem.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.wrapper-aside {
  .aside-menu{
    height: calc(100vh - 100px);
    .menu-title {
      font-size: 18px;
      font-weight: bold;
    }
    .active {
      color: #3FAE7C;
      font-weight: bold;
    }
  }
}
</style>
