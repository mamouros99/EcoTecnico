<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="border-bottom: 3px solid white" flat>
      <q-toolbar>

        <q-toolbar-title
          class="text-h5 q-ml-lg"
          @click="router.push('/')"
        >
          EcoTécnico
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer
      class="bg-transparent"
    >
      <q-toolbar>
        <q-icon
          class="q-pa-sm dimmed"
          name="img:ist-logo.png"
          size="lg"
        />
      </q-toolbar>

    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const router = useRouter()
    const page = ref('one')
    const buttons = ref([
      {
        path: '/',
        icon: 'home'
      },
      {
        path: '/scan',
        icon: 'camera'
      },
      {
        path: '/report/1',
        icon: 'report'
      }
    ])

    return {
      page,
      buttons,
      router
    }
  }
})
</script>
