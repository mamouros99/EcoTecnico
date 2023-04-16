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
          @click="postResult"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import { ref } from 'vue'

export default {
  props: ['result', 'page'],
  setup (props) {
    const router = useRouter()

    const {
      notifySuccess,
      notifyError
    } = useNotify()

    const final = ref({
      ecoisland: props.page,
      full: '',
      separation: '',
      dirty: '',
      time: ''
    })

    const processData = () => {
      // Adapts data to be compatible with db
      // TODO refactor bins for easier access
      // 1st digit organic, 2nd glass, 3rd paper, 4th plastic, 5th undifferentiated
      let full = ''
      let separation = ''
      let dirty = ''

      const bio = props.result.filter(e => e.label === 'bio')
      const glass = props.result.filter(e => e.label === 'glass')
      const paper = props.result.filter(e => e.label === 'paper')
      const plastic = props.result.filter(e => e.label === 'plastic')
      const undiff = props.result.filter(e => e.label === 'undifferentiated')

      checkBins(bio)
      checkBins(glass)
      checkBins(paper)
      checkBins(plastic)
      checkBins(undiff)

      final.value.full = full
      final.value.separation = separation
      final.value.dirty = dirty
      final.value.time = Date.now().toString()

      function checkBins (bin) {
        if (bin.length > 0) {
          if (bin[0].full) {
            full = full + '1'
          } else {
            full = full + '0'
          }

          if (bin[0].separation) {
            separation = separation + '1'
          } else {
            separation = separation + '0'
          }

          if (bin[0].dirty) {
            dirty = dirty + '1'
          } else {
            dirty = dirty + '0'
          }
        } else {
          // TODO Replace with -
          full = full + '0'
          separation = separation + '0'
          dirty = dirty + '0'
        }
      }
    }

    const postResult = async () => {
      // remove unchecked bins
      processData()
      console.log(final, formatDate())
      await axios
        .post('http://localhost:3000/reports', final.value)
        .then(() => {
          notifySuccess()
          router.push('/')
        }
        )
        .catch(() => {
          notifyError('Alguma coisa correu mal, por favor tente mais tarde')
          router.push('/')
        }
        )
    }

    const formatDate = () => {
      // receives string
      const date = new Date(parseInt(final.value.time))

      return (
        [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear()
        ].join('/') +
        ' ' +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds())
        ].join(':')
      )

      function padTo2Digits (num) {
        return num.toString().padStart(2, '0')
      }
    }

    return {
      postResult,
      notifySuccess
    }
  }
}
</script>
