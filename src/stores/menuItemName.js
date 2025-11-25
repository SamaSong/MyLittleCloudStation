import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuItemNameStore = defineStore('menuItemName', () => {
  const menuItemName = ref('')
  const menuRef = ref(null)

  function setMenuRef(ref) {
    menuRef.value = ref.value
  }

  return { menuItemName, menuRef, setMenuRef }
})
