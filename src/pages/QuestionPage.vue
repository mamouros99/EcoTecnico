<template>
  <q-page padding>
    <q-form
      class="q-pa-lg"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="text-h4 q-py-md">
        Dúvidas e Questões
      </div>

      <q-input
        v-model="currentQuestion"
        standout
        label="Pergunta"
        type="textarea"
        :rules="[ val => val && val.length > 0 || 'Escreva a pergunta']"
      >
        <template v-slot:append>
          <q-icon class="q-mr-md" name="question_mark"/>
        </template>
      </q-input>

      <q-input
        class="q-mt-lg"
        v-model="currentEmail"
        standout
        label="Email"
        type="email"
        :rules="[ val => val && val.length > 0 || 'Insira o seu email']"
      >
        <template v-slot:append>
          <q-icon class="q-mr-md" name="email"/>
        </template>
      </q-input>

      <div class="q-px-lg q-mt-lg row justify-between">
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuestionStore } from 'stores/QuestionStore'

export default {
  // name: 'PageName',
  setup () {
    const currentEmail = ref('')
    const currentQuestion = ref('')

    const questionStore = useQuestionStore()

    const onSubmit = () => {
      const result = {
        email: currentEmail.value,
        question: currentQuestion.value,
        time: Date.now().toString()
      }
      questionStore.addNewQuestion(result)
    }
    const onReset = () => {
      currentEmail.value = ''
      currentQuestion.value = ''
    }

    return {
      currentEmail,
      currentQuestion,
      onSubmit,
      onReset
    }
  }
}
</script>
