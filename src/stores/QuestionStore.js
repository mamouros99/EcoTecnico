import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useQuestionStore = defineStore('QuestionStore', () => {
  const addNewQuestion = async (question) => {
    console.log(question)

    return await api
      .post('question/add', question)
  }

  return {
    addNewQuestion
  }
})
