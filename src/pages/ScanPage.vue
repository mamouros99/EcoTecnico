<template>
  <q-page padding class="column justify-between">
    <q-toolbar>
      <q-btn
        flat
        round
        size="xl"
        icon="keyboard_backspace"
        :ripple="false"
        to="/"
      />
    </q-toolbar>
    <div/>
    <qrcode-stream
      :track="paintBoundingBox"
      :camera="camera"
      v-if="scan"
      @decode="onDecode"
      class="self-center"
      style="max-width: 90vw"
    />
    <q-icon
      v-else
      name="photo_camera"
      color="grey-8"
      size="xl"
      class="self-center bg-grey-2 rounded-borders"
      style="height: 35vh; width: 90vw"
      @click="toggleScan"
    />
    <div/>
    <q-card class="q-ma-lg">
      <q-card-section class="bg-primary">
        <div class="text-h6">Tutorial:</div>
        <div> 1. Clique na imagem da câmera</div>
        <div> 2. Aponte a câmera para o QR Code presente na Ecoilha</div>

      </q-card-section>
    </q-card>
    <div/>

  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader/src'
import { useRouter } from 'vue-router'
import { useIslandStore } from 'stores/IslandStore'

export default {
  // name: 'PageName',
  components: {
    QrcodeStream
  },

  setup () {
    const camera = ref('auto')
    const scan = ref(false)
    const router = useRouter()
    const islandStore = useIslandStore()
    const onDecode = (res) => {
      const id = res.split('/').splice(-1)

      if (islandStore.hasIslandByID(id[0])) {
        router.push('report/' + id)
      } else {
        router.push('badreport/')
      }
    }

    const toggleScan = () => {
      scan.value = !scan.value
    }

    onMounted(() => {
      islandStore.fetchEcoIslands()
    })

    const paintBoundingBox = (detectedCodes, ctx) => {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: {
            x,
            y,
            width,
            height
          }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    }

    return {
      onDecode,
      scan,
      toggleScan,
      camera,
      paintBoundingBox,
      router
    }
  }
}
</script>
