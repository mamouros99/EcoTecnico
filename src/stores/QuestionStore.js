import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export const useQuestionStore = defineStore('QuestionStore', () => {
  const questions = ref([])

  const addNewQuestion = async (question) => {
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
    return await api.post('/question/answer/' + questionId, answer)
      .then(() => {
        notification.notifySuccess('Mensagem foi enviada com sucesso')
      })
      .catch(() => {
        notification.notifyError()
      })
  }

  const fetchQuestionById = async (id) => {
    return await api.get('/question/get/' + id)
  }

  const hideQuestion = async (id) => {
    await api.put('/question/hide/' + id)
  }

  const fetchQuestionsByUsername = async (username) => {
    await api.get('/question/get/all/' + username)
      .then((response) => {
        questions.value = response.data
      })
  }

  const getQuestions = () => {
    return questions.value
  }

  const notification = useNotify()
  const router = useRouter()

  return {
    getQuestions,

    addNewQuestion,
    addNewAnswer,
    fetchQuestionsByUsername,

    hideQuestion,

    fetchQuestionById

  }
})
