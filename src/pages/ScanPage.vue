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
    <ScanTutorialCard/>
    <div/>

  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader/src'
import { useRouter } from 'vue-router'
import ScanTutorialCard from 'components/ScanTutorialCard.vue'
import { useIslandStore } from 'stores/IslandStore'

export default {
  // name: 'PageName',
  components: {
    ScanTutorialCard,
    QrcodeStream
  },

  setup () {
    const camera = ref('auto')
    const scan = ref(false)
    const router = useRouter()
    const islandStore = useIslandStore()

    const onDecode = (res) => {
      const id = res.split('/').splice(-1)
      router.push('report/' + id)
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
