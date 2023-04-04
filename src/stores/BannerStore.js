import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBannerStore = defineStore('BannerStore', () => {
  const showBanner = ref(false)

  function toggleShowBanner () {
    showBanner.value = !showBanner.value
  }

  return {
    showBanner,
    toggleShowBanner
  }
})
