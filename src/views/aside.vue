<script setup>
  import asideConfig from '@/common/config/asideConfig.js'
  import {ref, defineEmits, onMounted} from "vue";
  import { useMenuItemNameStore } from "@/stores/menuItemName.js";

  const menuRef = ref(null); // el-menu实例
  const activeName = ref(null)
  const menuStore = useMenuItemNameStore()

  const emit = defineEmits(['jumpTo'])

  const clickSubMenu = (path, name) => {
    emit('jumpTo', path)
    activeName.value = name
  }

  const handleHref = (href) => {
    return '#_' + href
  }

  const clickMenuItem = (name) => {
    menuStore.menuItemName = name
  }

  onMounted(() => {
    menuStore.setMenuRef(menuRef)
  })
</script>

<template>
  <div class="wrapper-aside">
    <el-menu
      class="aside-menu"
      unique-opened
      ref="menuRef"
    >
      <el-sub-menu v-for="(item, index) in asideConfig" :key="index" :index="item.name">
        <template #title>
          <span class="menu-title">{{ item.name }}</span>
        </template>
        <el-sub-menu
          v-for="(groupItem, groupIndex) in item.children"
          :id="groupItem.path"
          :key="groupIndex"
          :index="groupItem.name"
          @click='clickSubMenu(groupItem.path, groupItem.name)'
        >
          <template #title>
            <span :class="{ 'active' : activeName === groupItem.name }">{{ groupItem.name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) in groupItem.children"
            :key="subIndex"
            :index="subItem.name"
          >
            <a
              class="menu-item-a"
              :class="{ 'item-active' : menuStore.menuItemName === subItem.name }"
              :href="handleHref(subItem.name)"
              @click="clickMenuItem(subItem.name)"
            >{{ subItem.name }}</a>
          </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.wrapper-aside {
  .aside-menu{
    padding-top: 15px;
    height: calc(100vh - 100px);
    .menu-title {
      font-size: 18px;
      font-weight: bold;
    }
    .active {
      color: #3FAE7C;
      font-weight: bold;
    }
    .menu-item-a {
      display: flex;
      flex: 1;
      text-decoration: none;
      color: #2c3e50;
      outline: none;
      &:hover {
        background-color: unset;
      }
    }
  }
}
</style>
