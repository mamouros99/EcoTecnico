<template>
  <q-page padding>
    <q-form
      class="q-pa-lg "
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-toolbar class="text-h4 q-py-lg">
        <q-toolbar-title
          class="text-h5">
          Dúvidas e Questões
        </q-toolbar-title>
        <q-btn
          color="secondary"
          round
          dense
          icon="question_mark"
          @click="helpDialog = true"
        />
        <q-dialog v-model="helpDialog">
          <q-card class="bg-primary">
            <q-card-section class="q-mx-md justify-between" horizontal>
              <q-card-section class="text-h5">
                Ajuda
              </q-card-section>
              <q-btn
                icon="close"
                flat
                round
                dense
                color="white"
                v-close-popup
              />
            </q-card-section>
            <q-card-section class="text-justify bg-blue-grey-9">
              <p>Se tem alguma questão relativamente ao projeto Técnico faz a Diferença ou relativamente à reciclagem no
                geral, por favor apresente a sua questão aqui.</p>
              <p>O email serve apenas para receber a resposta.</p>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-toolbar>

      <div>
        <q-input
          v-model="currentQuestion"
          standout
          label="Pergunta"
          type="textarea"
          :rules="[ val => val && val.length > 0 || 'Escreva a pergunta']"
        >
          <template v-slot:append>
            <q-icon class="q-mr-md" size="md" name="edit_note"/>
          </template>
        </q-input>

        <q-space/>

        <div class="q-px-lg q-mt-lg row justify-between">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuestionStore } from 'stores/QuestionStore'
import { useUserStore } from 'stores/UserStore'

export default {
  // name: 'PageName',
  setup () {
    const currentQuestion = ref('')
    const helpDialog = ref(false)

    // eslint-disable-next-line no-unused-vars
    const questionStore = useQuestionStore()
    const userStore = useUserStore()

    const onSubmit = () => {
      const result = {
        question: currentQuestion.value,
        time: Date.now().toString(),
        username: userStore.getUsername() || ''

      }
      questionStore.addNewQuestion(result)
    }
    const onReset = () => {
      currentQuestion.value = ''
    }

    return {
      currentQuestion,
      helpDialog,
      onSubmit,
      onReset
    }
  }
}
</script>
