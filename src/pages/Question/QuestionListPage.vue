<template>
  <q-page padding>
    <q-card>
      <q-item-label header class="text-h5 text-primary row justify-between">
        Questões e perguntas
        <q-btn
          round
          dense
          icon="add"
          color="primary"
          @click="router.push('/newquestion')"
        />
      </q-item-label>
      <q-separator color="secondary" size="3px"/>
      <q-separator/>
      <q-list v-if="userStore.hasAuthenticatied()" separator class="q-mt-xs">
        <q-slide-item v-for="q in questions" :key="q.id">
          <template v-slot:right>
            <q-icon name="archive"/>
          </template>
          <q-item clickable @click="router.push('question/' + q.id)">
            <q-item-section>
              {{ q.question }}
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                v-if="!q.archived"
                flat
                round
                dense
                icon="mail"
                color="grey-3"
              >
                <q-badge floating rounded color="secondary">
                  {{ countUnviewedAnswers(q) }}
                </q-badge>

              </q-btn>
              <q-btn
                v-else
                flat
                round
                dense
                icon="lock"
                color="secondary"
              >
                <q-tooltip>
                  Este chat foi arquivado
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
      <q-card-section horizontal v-else>
        <q-card-section style="width: 50%;">
          Por favor faça login para aceder ao seu histórico de questões
        </q-card-section>
        <q-card-actions>
          <q-btn
            color="primary"
            label="Fenix Login"
            icon="login"
            @click="router.push('/login')"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/UserStore'
import { onMounted, ref } from 'vue'
import { useQuestionStore } from 'stores/QuestionStore'

export default {
  // name: 'PageName',

  setup () {
    const router = useRouter()
    const userStore = useUserStore()
    const questionStore = useQuestionStore()

    const questions = ref([])

    onMounted(async () => {
      await questionStore.fetchQuestionsByUsername(userStore.getUsername())
      questions.value = questionStore.getQuestions()
    })

    const countUnviewedAnswers = (question) => {
      return question.answers.filter(e => !e.viewed).length
    }

    return {
      questions,
      countUnviewedAnswers,
      router,
      userStore

    }
  }
}
</script>
