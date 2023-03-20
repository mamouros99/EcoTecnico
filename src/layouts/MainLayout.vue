<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat>
      <q-toolbar class="text-center">
        <q-btn
          icon-right=""
        />
        <q-toolbar-title>
          Mobile App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer>
      <q-toolbar class="full-width justify-evenly">
        <q-btn
          flat
          size="lg"
          v-for="button in buttons"
          :key="button.path"
          :icon="button.icon"
          :to="button.path"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
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
      buttons
    }
  }
})
</script>
