<template>
  <q-page padding style="max-width: 700px; margin: auto">
    <div v-if="loaded" class="column self-center q-ma-lg">

      <div >
        <div class="text-h5">{{ ecoIsland.building }}, {{$t('floor')}} {{ ecoIsland.floor }} </div>
        <div class="q-ml-sm text-subtitle1">{{ $t('ecoisland') }} {{ ecoIsland.identifier }} </div>
      </div>
      <q-list>
        <div v-for="bin in bins" :key="bin.label">
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
                  class="row"
                >
                  <q-item-label class="text-h6 col">{{ $t(bin.label) }}</q-item-label>
                </q-item-section>
                <q-item-section avatar :class="isClassActive(bin)"
                >
                  <q-icon
                    :name="isClassActiveBin(bin)"
                    :color="bin.color"
                    size="md"
                  />
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
                    {{ $t('full')}}
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
                    {{ $t('dirty') }}

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
                    {{ $t('poor_separation') }}
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
                  <q-item-section style="display: inline-block">
                    {{ $t('notes') }}
                    <q-btn v-if="message.length > 0" flat dense color="red" icon="close" @click="message=''"/>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon class="q-pr-xs" :name="message.length > 0 ? 'chat' : 'chat_bubble_outline'"/>
                  </q-item-section>
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
            v-model="message"
          />
        </q-expansion-item>
      </q-list>

      <q-btn
        icon="send"
        :label="$t('submit')"
        padding="sm md"
        color="secondary"
        rounded
        class="text-h6 q-mt-md q-mx-xl"
        style="border: 3px solid "
        @click="getReadySubmit"
      />

      <ConfirmationDialog
        v-model="toggleConfirmationCard"
        v-if="toggleConfirmationCard"
        :result="reportedOnBins"
        :page="id"
        :message="message"
      />
    </div>

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
      if (reportedOnBins.value.length > 0 || message.value.length > 0) {
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
        return 'text-' + bin.color
      } else {
        return 'text-grey-5'
      }
    }

    const isClassActiveBin = (bin) => {
      if (bin.full || bin.separation || bin.dirty) {
        return 'delete'
      } else {
        return 'delete_outline'
      }
    }

    const defaultBins = [
      {
        label: 'undifferentiated',
        color: 'white',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      },
      {
        label: 'paper',
        color: 'blue',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      },
      {
        label: 'plastic',
        color: 'yellow',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      }
    ]

    const glass = {
      label: 'glass',
      color: 'green',
      checked: false,
      full: false,
      dirty: false,
      separation: false
    }

    const bio = {
      label: 'bio',
      color: 'brown',
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
      ecoIsland,
      toggleConfirmationCard,
      bins,
      getReadySubmit,
      reportedOnBins,
      isClassActive,
      isClassActiveBin
    }
  }
}
</script>
