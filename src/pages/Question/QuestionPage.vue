<template>
  <q-page padding>
    <q-card-section class="text-h4">
      {{ question.question }}
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <q-chat-message
        :text="[question.question]"
        sent
        :stamp="formatDateTime(question.time)"
      />

      <q-chat-message
        v-for="q in question.answers"
        :key="q.id"
        :text="[q.text]"
        :sent="!q.fromApp"
        :stamp="formatDateTime(q.time)"
      />
    </q-card-section>
    <q-card-section v-if="!question.archived" horizontal class="justify-end q-mr-sm ">
      <q-btn
        flat
        round
        dense
        class="q-mx-md"
        color="primary"
        icon="send"
        @click="() => {
            addAnswer()
            newAnswer = ''
          }"
      />
      <q-input
        placeholder="Nova Mensagem..."
        color="secondary"
        class="q-my-md"
        style="width: 80%"
        v-model="newAnswer"
        type="text"
        rounded
        dense
        outlined
      />
    </q-card-section>
    <q-card-section v-else>
      Este chat foi arquivado.
    </q-card-section>
  </q-page>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useQuestionStore } from 'stores/QuestionStore'

export default {
  setup () {
    const route = useRoute()
    const id = route.params.id
    const question = ref([])

    const formatDate = (stringDate) => {
      // receives string
      const date = new Date(parseInt(stringDate))

      return (
        [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear()
        ].join('/')
      )

      function padTo2Digits (num) {
        return num.toString().padStart(2, '0')
      }
    }

    const formatDateTime = (stringDate) => {
      // receives string
      const date = new Date(parseInt(stringDate))

      return (
        formatDate(stringDate) +
        ' - ' +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes())].join(':')
      )

      function padTo2Digits (num) {
        return num.toString().padStart(2, '0')
      }
    }

    const newAnswer = ref('')

    // eslint-disable-next-line no-unused-vars
    const questionStore = useQuestionStore()

    const addAnswer = async () => {
      const auxAnswer = {
        text: newAnswer.value,
        fromApp: false,
        time: Date.now()
      }

      await questionStore.addNewAnswer(auxAnswer, id)
      fetch()
    }

    onMounted(() => {
      fetch()
    })

    const fetch = () => {
      questionStore.fetchQuestionById(id)
        .then((result) => {
          question.value = result.data
        })
    }

    return {
      id,
      question,
      formatDate,
      formatDateTime,
      newAnswer,
      addAnswer
    }
  }
  // name: 'PageName',
}
</script>
