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
          {{ $t('questions') }}
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
                {{ $t('help') }}
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
              <p>{{ $t('msg_help')}}</p>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-toolbar>

      <div>
        <q-input
          v-model="currentQuestion"
          standout
          :label="$t('question')"
          type="textarea"
          :rules="[ val => val && val.length > 0 || $t('msg_question')]"
        >
          <template v-slot:append>
            <q-icon class="q-mr-md" size="md" name="edit_note"/>
          </template>
        </q-input>

        <q-space/>

        <div class="q-px-lg q-mt-lg row justify-between">
          <q-btn :label="$t('submit')" type="submit" color="primary"/>
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
import { useRouter } from 'vue-router'

export default {
  // name: 'PageName',
  setup () {
    const currentQuestion = ref('')
    const helpDialog = ref(false)
    // eslint-disable-next-line no-unused-vars
    const router = useRouter()

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
      router.push({ name: 'home' })
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
