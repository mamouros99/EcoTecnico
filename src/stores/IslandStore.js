import { defineStore } from 'pinia'
import axios from 'axios'
import { computed, ref } from 'vue'

export const useIslandStore = defineStore('IslandStore', () => {
  const islands = ref([])
  const currentIsland = ref({})

  async function fetchEcoIslands () {
    try {
      const data = await axios.get('http://localhost:3000/ecoislands')
      islands.value = data.data
    } catch (e) {
      console.log(e)
    }
  }

  const getIslands = computed(() => islands.value)
  const getCurrentIsland = computed(() => currentIsland.value)

  const setIslandByID = (id) => {
    console.log('id', id)

    // TODO Remove this
    if (islands.value.length === 0) {
      fetchEcoIslands()
    }

    console.log('ecoislands', islands)

    if (isStringInteger(id)) {
      const island = islands.value.filter(e => e.id === +id)
      console.log('island', island)
      if (island.length !== 0) {
        currentIsland.value = island[0]
        return true
      }
    }
    return false
  }

  function isStringInteger (str) {
    if (typeof str !== 'string') {
      return false
    }
    return Number.isInteger(+str)
  }

  return {
    fetchEcoIslands,
    getIslands,
    setIslandByID,
    getCurrentIsland
  }
})
