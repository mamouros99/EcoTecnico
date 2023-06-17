import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export const useReportStore = defineStore('ReportStore', () => {
  const {
    notifyError,
    notifySuccess
  } = useNotify()
  const router = useRouter()

  const addNewReport = async (report) => {
    await api
      .post('/report/add', report)
      .then(() => {
        notifySuccess()
        router.push('/')
      }
      )
      .catch(() => {
        notifyError('Alguma coisa correu mal, por favor tente mais tarde')
        router.push('/')
      }
      )
  }

  return {
    addNewReport
  }
})
