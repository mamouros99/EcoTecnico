<template>
  <q-page padding style="max-width: 700px; margin: auto">
    <div class="column self-center q-ma-lg">
      <div class="text-h5 q-pa-sm">
        Selecione os problemas existentes na Eco Ilha {{ id }}:
      </div>
      <q-list v-for="bin in bins" :key="bin.name">
        <q-expansion-item
          :hide-expand-icon="true"
        >
          <template v-slot:header>
            <q-item
              class="full-width"
              v-ripple:green
            >
              <q-item-section
                @click="bin.checked=!bin.checked"

              >
                <q-item-label class="text-h6">{{ bin.name }}</q-item-label>

              </q-item-section>
              <q-item-section side>
                <q-checkbox
                  disable
                  style="opacity: 1 !important;"
                  color="green"
                  v-model="bin.checked"/>
              </q-item-section>
            </q-item>
          </template>

          <q-list class="q-px-lg">
            <q-separator/>

            <q-item
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
                  disable
                  style="opacity: 1 !important;"
                  color="primary"
                  v-model="bin.full"
                />
              </q-item-section>
            </q-item>

            <q-separator/>

            <q-item
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
                  disable
                  style="opacity: 1 !important;"
                  color="primary"
                  v-model="bin.dirty"
                />
              </q-item-section>
            </q-item>

            <q-separator/>

            <q-item
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
                  disable
                  style="opacity: 1 !important;"
                  color="primary"
                  v-model="bin.separation"
                />
              </q-item-section>
            </q-item>

          </q-list>
        </q-expansion-item>

        <q-separator/>
      </q-list>
    </div>
    <div
      class="row justify-center q-ma-xl"
    >
      <q-btn
        label="Submeter"
        padding="sm md"
        color="secondary"
        rounded
        class="text-h6"
        style="border: 3px solid "
        @click="getReadySubmit"
      />
    </div>
    <ConfirmationDialog
      v-model="toggleConfirmationCard"
      :result="reportedOnBins"
      :page="id"
    />

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
  setup () {
    const route = useRoute()
    const islandStore = useIslandStore()
    const router = useRouter()
    const id = route.params.id
    const bins = ref([])
    const toggleConfirmationCard = ref(false)

    const { notifyWarning } = useNotify()
    const getReadySubmit = () => {
      // check if all good with submission
      if (reportedOnBins.value.length > 0) {
        toggleConfirmationCard.value = !toggleConfirmationCard.value
      } else {
        notifyWarning('Não selecionou qualquer problema')
      }
    }

    onMounted(() => {
      if (!islandStore.setIslandByID(id)) {
        router.push('/bad-scan')
      } else {
        bins.value = defaultBins
        setCurrentBins(islandStore.getCurrentIsland.bins)
      }
    })

    const setCurrentBins = (condition) => {
      if (typeof condition !== 'string' || condition.length !== 2) {
        return
      }
      // if it has glass bin => add glass bin to bins
      if (condition.substring(0, 1) === '1') {
        bins.value.push(
          glass
        )
      }
      if (condition.substring(1, 2) === '1') {
        bins.value.push(
          bio)
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
      return bins.value.filter(e => e.checked && (e.full || e.dirty || e.separation))
    })

    return {
      id,
      toggleConfirmationCard,
      bins,
      getReadySubmit,
      reportedOnBins
    }
  }
}
</script>
