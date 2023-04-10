<template>
  <q-page class="flex flex-center"
  >
    <q-img
      class="fixed"
      src="bg-image.jpg"
      style="filter: brightness(20%); height: 100vh"
    />
    <q-card
      style="width: 90vw; background-color: rgb(192,192,192,.5)"
    >
      <q-card-section class="text-center">
        O <span class="text-bold text-italic">Técnico Faz a Diferença</span> está a tentar tornar o campus um espaço
        mais ecológico,
        através da
        separação do
        lixo!
      </q-card-section>

      <q-card-section class="text-center">
        Mas para o conseguir, precisa da tua ajuda! Se nas ecoilhas vires algum caixote
        <span class="text-bold">cheio</span>,
        <span class="text-bold">sujo</span>, ou com
        <span class="text-bold">má separação</span>,
        informa-nos!
      </q-card-section>

      <q-card-section class="text-center">
        Basta ler o QR code na ecoilha, e identificar o problema! Ajuda-nos a tornar o Técnico um lugar mais Eco
      </q-card-section>
    </q-card>

    <q-btn
      color="primary"
      rounded size="xl"
      style="border: 3px solid white"
      icon="photo_camera"
      label="Scan QR Code !"
      @click="router.push('/scan')"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const router = useRouter()

    return { router }
  }
})
</script>
