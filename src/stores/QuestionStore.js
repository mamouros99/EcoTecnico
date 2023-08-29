import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export const useQuestionStore = defineStore('QuestionStore', () => {
  const addNewQuestion = async (question) => {
    console.log(question)

    return await api
      .post('question/add', question)
      .then(() => {
        notification.notifySuccess('Pergunta foi gravada com sucesso')
        router.push({ name: 'home' })
      })
      .catch(() => {
        notification.notifyError()
      })
  }

  const addNewAnswer = async (answer, questionId) => {
    return await api.post('answer/' + questionId)
      .then(() => {
        notification.notifySuccess('Mensagem foi enviada com sucesso')
      })
      .catch(() => {
        notification.notifyError()
      })
  }

  const notification = useNotify()
  const router = useRouter()

  return {
    addNewQuestion,
    addNewAnswer
  }
})
