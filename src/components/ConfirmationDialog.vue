<template>
  <q-dialog>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Tem a certeza que pretende submeter?</div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="row justify-around">
        <q-btn
          rounded
          icon="edit"
          label="Editar"
          v-close-popup
          color="negative"
          class="q-mx-xs"
        />

        <q-btn
          rounded
          icon="send"
          label="Submeter"
          v-close-popup
          color="positive"
          class="q-mx-xs"
          @click="submit"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default {
  // name: 'ComponentName',
  props: ['result'],
  setup (props) {
    const router = useRouter()

    const { notifySuccess } = useNotify()

    const submit = () => {
      notifySuccess()
      router.push('/')
    }

    return {
      submit,
      notifySuccess
    }
  }
}
</script>
