import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useIslandStore = defineStore('IslandStore', () => {
  const getEcoIslandById = async (id) => {
    if (!isStringInteger(id[0])) {
      return Promise.reject('Qr code não pertence a uma ecoilha válida')
    }

    return await api.get('ecoisland/' + id)
  }

  return {
    getEcoIslandById
  }
})

function isStringInteger (str) {
  if (typeof str !== 'string' && !(str instanceof String)) {
    return false
  }
  return Number.isInteger(+str)
}
