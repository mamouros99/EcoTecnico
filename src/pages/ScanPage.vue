<template>
  <q-page padding class="column justify-between">
    <div/>
    <qrcode-stream
      :camera="camera"
      v-if="scan"
      @decode="onDecode"
    />
    <q-icon
      v-else
      name="photo_camera"
      size="xl"
      class="self-center bg-grey-2 rounded-borders"
      style="height: 200px; width: 300px"
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

export default {
  // name: 'PageName',
  components: {
    QrcodeStream
  },

  setup () {
    const camera = ref('auto')
    const scan = ref(false)
    const onDecode = (res) => {

    }

    const toggleScan = () => {
      scan.value = !scan.value
    }

    return {
      onDecode,
      scan,
      toggleScan,
      camera
    }
  }
}
</script>
