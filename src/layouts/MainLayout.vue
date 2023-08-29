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
            class="text-h5 q-ml-sm"
            @click="router.push('/')"
          >
            <q-icon
              class="q-pr-sm"
              name="home"
              size="md"
            />
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
      <q-toolbar class="justify-between">
        <q-icon
          class="q-ml-sm q-mb-md"
          name="img:ist-logo.png"
          size="xl"
        />

        <q-btn
          v-if="route.name !== 'questions'"
          rounded
          label="Questões"
          color="secondary"
          dense
          flat
          class=" q-mb-md q-mr-sm q-pl-sm "
          icon-right="question_mark"
          size="lg"
          style="border: 5px dotted #26A69A; "
          @click="router.push('/questions')"
        />

      </q-toolbar>

    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const router = useRouter()
    const route = useRoute()
    const page = ref('one')
    const login = ref(false)

    return {
      route,
      page,
      router,
      login
    }
  }
})
</script>
