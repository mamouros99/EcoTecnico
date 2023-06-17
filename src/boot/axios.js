import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.DEV ? 'http://localhost:3001' :'http://193.136.129.238:3001' })
api.interceptors.response.use((response) => {
  return response
}, error => {
  if (!error.response) {
    return Promise.reject('Erro de Ligação')
  } else {
    if (error.response.status === 500) {
      return Promise.reject('Something went wrong')
    } else {
      return Promise.reject(error.response.data.message)
    }
  }
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
