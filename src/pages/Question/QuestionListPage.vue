<template>
  <q-page padding>
    <q-card flat>

      <q-item-label header class="text-h5 text-primary row justify-between">
        <div class="row items-center">{{ $t('questions')}}</div>
        <q-btn
          v-if="userStore.hasAuthenticatied()"

          round
          icon="edit_square"
          color="white"
          flat
          @click="router.push('/newquestion')"

        />
      </q-item-label>
      <q-separator color="secondary" size="3px"/>
      <q-separator/>
      <q-list v-if="userStore.hasAuthenticatied()" separator class="q-mt-xs">
        <q-slide-item @right="right(q.id)" right-color="negative" v-for="q in questions" :key="q.id">
          <template v-slot:right>
            <div class="row">
              <div class="text-subtitle1 q-mr-lg"> {{ $t('delete') }}</div>
              <q-icon name="archive"/>
            </div>
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
                  {{ $t('msg_archived')}}
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
      <q-card-section horizontal v-else>
        <q-card-section style="width: 50%;">
          {{$t('msg_login')}}        </q-card-section>
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
      await fetch()
    })

    const right = async (id) => {
      await questionStore.hideQuestion(id)
      await fetch()
    }

    const fetch = async () => {
      if (userStore.getUser()) {
        await questionStore.fetchQuestionsByUsername(userStore.getUsername())
        questions.value = questionStore.getQuestions()
      }
    }

    const countUnviewedAnswers = (question) => {
      return question.answers.filter(e => !e.viewed && e.fromApp).length
    }

    return {
      questions,
      countUnviewedAnswers,
      router,
      userStore,
      right

    }
  }
}
</script>
