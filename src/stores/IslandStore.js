import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useIslandStore = defineStore('IslandStore', () => {
  const getEcoIslandById = async (id) => {
    return await api.get('ecoisland/' + id)
  }

  return {
    getEcoIslandById
  }
})
