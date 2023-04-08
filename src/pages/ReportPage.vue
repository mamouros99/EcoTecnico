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
        @click="submit = !submit"
      />
    </div>
    <ConfirmationDialog
      v-model="submit"
      :result="result"
    />

  </q-page>
</template>

<script>
import { useRoute } from 'vue-router'
import ConfirmationDialog from 'components/ConfirmationDialog.vue'
import { ref } from 'vue'

export default {
  components: { ConfirmationDialog },
  // name: 'PageName',
  setup () {
    const route = useRoute()
    const id = route.params.id

    const result = ref({
      trash: false,
      recycling: false,
      clean: false
    })

    const bins = ref([
      {
        name: 'Indiferenciado',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      },
      {
        name: 'Papel',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      },
      {
        name: 'Embalagens',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      },
      {
        name: 'Vidro',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      },
      {
        name: 'Biorresíduos',
        checked: false,
        full: false,
        dirty: false,
        separation: false
      }
    ])

    const submit = ref(false)

    return {
      id,
      result,
      submit,
      bins
    }
  }
}
</script>
