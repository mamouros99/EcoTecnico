<template>
  <q-page padding class="column justify-between">
    <div/>
    <qrcode-stream
      :track="paintBoundingBox"
      :camera="camera"
      v-if="scan"
      @decode="onDecode"
      class="self-center"
      style="max-width: 350px"
    />
    <q-icon
      v-else
      name="photo_camera"
      color="grey-8"
      size="xl"
      class="self-center bg-grey-2 rounded-borders"
      style="height: 250px; width: 350px"
      @click="toggleScan"
    />
    <q-btn
      v-model="scan"
      @click="toggleScan"
      rounded
      style="width:100px"
      class="q-mb-sm self-center"
    >
      <q-icon
        name="camera"
      />
      <div class="q-pl-xs">
        Scan
      </div>
    </q-btn>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader/src'
import { useRouter } from 'vue-router'

export default {
  // name: 'PageName',
  components: {
    QrcodeStream
  },

  setup () {
    const camera = ref('auto')
    const scan = ref(false)
    const router = useRouter()
    const onDecode = (res) => {
      const id = res.split('/').splice(-1)
      router.push('report/' + id)
    }

    const toggleScan = () => {
      scan.value = !scan.value
    }

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
      paintBoundingBox
    }
  }
}
</script>
