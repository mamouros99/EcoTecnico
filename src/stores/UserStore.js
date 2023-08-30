import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useUserStore = defineStore('UserStore', () => {
  const user = ref(LocalStorage.getItem('user'))

  const getAuth = async (code) => {
    await api.get('/auth/fenix/mobile/' + code)
      .then((response) => {
        LocalStorage.set('user', response.data)
        user.value = LocalStorage.getItem('user')
      })
  }

  const getUser = () => {
    return user.value
  }

  const getUsername = () => {
    return user.value.username
  }

  const getName = () => {
    return user.value.name
  }

  const hasEditPermissions = () => {
    return user.value.role === 'EDITOR' || hasAdminPermissions()
  }

  const hasAdminPermissions = () => {
    return user.value.role === 'ADMIN'
  }

  const getFirstName = () => {
    const names = user.value.name.split(' ')
    return names[0]
  }
  const getLastName = () => {
    const names = user.value.name.split(' ')
    return names[names.length - 1]
  }

  const getRole = () => {
    return user.value.role
  }

  const getToken = () => {
    return user.value.token
  }

  const hasAuthenticatied = () => {
    return user.value !== null
  }

  const logoutUser = () => {
    LocalStorage.clear()
    user.value = null
  }

  return {
    getAuth,
    hasAuthenticatied,
    logoutUser,
    getUsername,
    getName,
    getFirstName,
    getLastName,
    getToken,
    getRole,
    getUser,
    hasEditPermissions
  }
})
