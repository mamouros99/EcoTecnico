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
        <span class="text-bold text-italic"> {{$t('tfad')}}</span>
        {{
          $t('msg_main_one')
        }}
      </q-card-section>

      <q-card-section class="text-center">
        {{ $t('msg_main_two')}}
      </q-card-section>

      <q-card-section class="text-center">
        {{ $t('msg_main_three')}}

      </q-card-section>

    </q-card>

    <q-btn
      color="primary"
      rounded
      size="lg"
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
