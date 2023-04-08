import { defineStore } from 'pinia'
import axios from 'axios'
import { computed, ref } from 'vue'

export const useIslandStore = defineStore('IslandStore', () => {
  const islands = ref()

  async function fetchEcoIslands () {
    try {
      const data = await axios.get('http://localhost:3000/ecoislands')
      islands.value = data.data
    } catch (e) {
      console.log(e)
    }
  }

  const getIslands = computed(() => islands.value)

  const hasIslandByID = (id) => {
    if (isInteger(id)) {
      return islands.value.filter(e => e.id === +id).length > 0
    } else {
      return false
    }
  }

  function isInteger (str) {
    console.log('checking', str)
    if (typeof str !== 'string') {
      return false
    }
    return Number.isInteger(+str)
  }

  return {
    fetchEcoIslands,
    getIslands,
    hasIslandByID
  }
})
