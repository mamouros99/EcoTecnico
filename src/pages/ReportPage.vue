<template>
  <q-page padding style="max-width: 700px; margin: auto">
    <q-card-section class="column self-center">
      <div class="text-h5 q-pa-sm">
        Selecione os problemas existentes na Eco Ilha {{ id }}:
      </div>
      <q-card-section class="column justify-evenly">
        <q-btn
          label="Caixote Cheio"
          flat
          icon="delete"
          size="lg"
          rounded
          padding="xl"
          :style="result.trash ? activeStyle : notActiveStyle"
          @click=" result.trash=!result.trash"
          class="q-my-md self-center full-width"
        />
        <q-btn
          label="Qualidade Reciclagem"
          flat
          icon="recycling"
          size="lg"
          rounded
          padding="xl"
          :style="result.recycling ? activeStyle : notActiveStyle"
          @click="result.recycling = !result.recycling"
          class="q-my-md self-center full-width"

        />
        <q-btn
          label="Qualidade Limpeza"
          flat
          icon="wash"
          size="lg"
          rounded
          padding="xl"
          :style="result.clean ? activeStyle : notActiveStyle"
          @click="result.clean = !result.clean"
          class="q-my-md self-center full-width"
        />
      </q-card-section>
    </q-card-section>
    <q-card-section
      class="row justify-center q-mb-sm"
    >
      <q-btn
        label="Submeter"
        padding="sm md"
        color="secondary"
        rounded
        class="text-h6"
        style="border: 3px solid "
        @click="submit=!submit"
      />
    </q-card-section>
    <ConfirmationDialog
      v-model="submit"
      :result="result"
    />

  </q-page>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import ConfirmationDialog from 'components/ConfirmationDialog.vue'

export default {
  components: { ConfirmationDialog },
  // name: 'PageName',
  setup () {
    const route = useRoute()
    const id = route.params.id
    const activeStyle = 'border: 3px solid #002891cc; background-color: #1976D2;'
    const notActiveStyle = 'border: 3px solid grey; background-color: #7c7c7c66;'

    const result = ref({
      trash: false,
      recycling: false,
      clean: false
    })

    const submit = ref(false)

    return {
      id,
      activeStyle,
      notActiveStyle,
      result,
      submit
    }
  }
}
</script>
