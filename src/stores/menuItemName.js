import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuItemNameStore = defineStore('menuItemName', () => {
  const menuItemName = ref('')
  const menuRef = ref(null)

  function setMenuRef(ref) {
    this.menuRef = ref
  }

  return { menuItemName, menuRef, setMenuRef }
})
