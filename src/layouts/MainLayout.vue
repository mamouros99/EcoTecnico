<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="border-bottom: 3px solid white" flat>
      <div class="row no-wrap">

        <q-toolbar
          class="justify-between"
        >
          <q-btn
            no-caps
            flat
            class="text-h5 q-ml-lg"
            @click="router.push('/')"
          >
            TFaD
          </q-btn>

          <div v-if="login">
            <q-btn
              class="text-subtitle1"
              flat
              icon-right="login"
              @click="login = !login"
            >
              Login
            </q-btn>
          </div>

          <div v-else>
            <q-btn
              class="text-subtitle1"
              flat
              icon-right="person"
              @click="login = !login"
            >
              Tiago
            </q-btn>
          </div>

        </q-toolbar>
      </div>
    </q-header>
    <q-page-container>

      <router-view/>
    </q-page-container>
    <q-footer
      class="bg-transparent"
    >
      <q-toolbar>
        <q-icon
          class="q-pa-sm"
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
    const login = ref(false)
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
      router,
      login
    }
  }
})
</script>
