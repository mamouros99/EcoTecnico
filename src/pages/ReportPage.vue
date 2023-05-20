<template>
  <q-page padding style="max-width: 700px; margin: auto">
    <div v-if="loaded" class="column self-center q-ma-lg">
      <div class="text-h5 q-pa-sm q-mb-lg">
        Selecione os problemas existentes na Eco Ilha {{ id }}:
      </div>
      <q-list>
        <div v-for="bin in bins" :key="bin.name">
          <q-expansion-item
            group="test"
            :hide-expand-icon="true"
          >
            <template v-slot:header>
              <q-item
                class="full-width"
                v-ripple:green
              >
                <q-item-section
                  :class="isClassActive(bin)"
                >
                  <q-item-label class="text-h6">{{ bin.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>

            <q-list>
              <q-separator/>
              <q-item
                class="bg-grey-10"
                clickable
                v-ripple:primary
                @click="bin.full=!bin.full"
              >
                <q-item-section>
                  <q-item-label>
                    Cheio
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    style="opacity: 1 !important;"
                    color="primary"
                    v-model="bin.full"
                  />
                </q-item-section>
              </q-item>
              <q-separator/>
              <q-item
                class="bg-grey-10"
                clickable
                v-ripple:primary
                @click="bin.dirty=!bin.dirty"
              >
                <q-item-section>
                  <q-item-label>
                    Sujo
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    style="opacity: 1 !important;"
                    color="primary"
                    v-model="bin.dirty"
                  />
                </q-item-section>
              </q-item>
              <q-separator/>
              <q-item
                class="bg-grey-10"
                clickable
                v-ripple:primary
                @click="bin.separation=!bin.separation"
              >
                <q-item-section>
                  <q-item-label>
                    Má Separação
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    style="opacity: 1 !important;"
                    color="primary"
                    v-model="bin.separation"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-separator/>
        </div>
        <q-separator color="primary"/>
        <q-expansion-item
          group="test"
          :hide-expand-icon="true">
          <template v-slot:header>
            <q-item
              class="full-width"
              v-ripple:primary
            >
              <q-item-section
                class="row"
                :class="message ? 'text-primary':'text-grey-5'"
              >
                <q-item-label class="text-h6 row items-center justify-between">
                  <div>Notas
                    <q-icon name="chat"/>
                  </div>
                  <q-btn v-if="message.length > 0" flat icon="close" @click="message=''"/>
                </q-item-label>

              </q-item-section>
            </q-item>
          </template>

          <q-input
            class="q-pa-sm"
            filled
            placeholder="Sugestões e observações..."
            maxlength="300"
            autogrow
            :error="message.length>=300"
            no-error-icon
            v-model="message"/>
        </q-expansion-item>
      </q-list>

      <ConfirmationDialog
        v-model="toggleConfirmationCard"
        :result="reportedOnBins"
        :page="id"
        :message="message"
      />
    </div>
    <q-page-sticky position="bottom" :offset="[0,20]">
      <q-btn
        icon="send"
        label="Submeter"
        padding="sm md"
        color="secondary"
        rounded
        class="text-h6"
        style="border: 3px solid "
        @click="getReadySubmit"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import ConfirmationDialog from 'components/ConfirmationDialog.vue'
import { computed, onMounted, ref } from 'vue'
import { useIslandStore } from 'stores/IslandStore'
import useNotify from 'src/composables/UseNotify'

export default {
  components: { ConfirmationDialog },
  // name: 'PageName',
  props: ['ecoIsland'],
  setup () {
    const route = useRoute()
    const islandStore = useIslandStore()
    const router = useRouter()

    const id = route.params.id
    const message = ref('')

    const bins = ref([])
    const toggleConfirmationCard = ref(false)
    const ecoIsland = ref()
    const loaded = ref(false)

    const {
      notifyWarning,
      notifyError
    } = useNotify()
    const getReadySubmit = () => {
      // check if all good with submission
      if (reportedOnBins.value.length > 0) {
        toggleConfirmationCard.value = !toggleConfirmationCard.value
      } else {
        notifyWarning('Não selecionou qualquer problema')
      }
    }

    onMounted(async () => {
      bins.value = defaultBins
      await islandStore.getEcoIslandById(id)
        .then((response) => {
          ecoIsland.value = response.data
          loaded.value = true
        })
        .catch((errorMessage) => {
          router.push('/scan')
          notifyError(errorMessage)
        })

      setCurrentBins(ecoIsland.value.bins)
    })

    const setCurrentBins = (condition) => {
      if (typeof condition !== 'string' || condition.length !== 2) {
        return
      }
      // if it has glass bin => add glass bin to bins
      if (condition.substring(0, 1) === '1') {
        bins.value.push(
          bio
        )
      }
      if (condition.substring(1, 2) === '1') {
        bins.value.push(
          glass)
      }
    }

    const isClassActive = (bin) => {
      if (bin.full || bin.separation || bin.dirty) {
        return 'text-primary'
      } else {
        return 'text-grey-5'
      }
    }
    const defaultBins = [
      {
        label: 'undifferentiated',
        name: 'Indiferenciado',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      },
      {
        label: 'paper',
        name: 'Papel',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      },
      {
        label: 'plastic',
        name: 'Embalagens',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      }
    ]

    const glass = {
      label: 'glass',
      name: 'Vidro',
      checked: false,
      full: false,
      dirty: false,
      separation: false
    }

    const bio = {
      label: 'bio',
      name: 'Biorresíduos',
      checked: false,
      full: false,
      dirty: false,
      separation: false
    }

    const reportedOnBins = computed(() => {
      return bins.value.filter(e => (e.full || e.dirty || e.separation))
    })

    return {
      id,
      message,
      loaded,
      toggleConfirmationCard,
      bins,
      getReadySubmit,
      reportedOnBins,
      isClassActive
    }
  }
}
</script>
