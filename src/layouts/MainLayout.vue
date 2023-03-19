<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-center">
        <q-toolbar-title>
          Mobile App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer>
      <q-toolbar class="full-width">
        <q-tabs active-color="red">
          <q-route-tab
            icon="home"
            :to="'/'"
          />
          <q-route-tab
            icon="camera"
            :to="'scan'"
          />
          <q-route-tab
            icon="report"
            :to="'report'"
          />
        </q-tabs>
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
    return {
      page
    }
  }
})
</script>
