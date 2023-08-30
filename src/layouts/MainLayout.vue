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

          <div v-if="!userStore.hasAuthenticatied()">
            <q-btn
              class="text-subtitle1"
              flat
              icon-right="login"
              @click="router.push('/login')"
            >
              Login
            </q-btn>
          </div>

          <div v-else>
            <q-btn-dropdown
              class="text-subtitle1"
              flat
              icon="person"
              :label="userStore.getFirstName()"
            >
              <q-list>
                <q-item clickable @click="userStore.logoutUser()">
                  <q-item-section>
                    <q-item-label>
                      Logout
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
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
import { useUserStore } from 'stores/UserStore'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const router = useRouter()
    const userStore = useUserStore()
    const route = useRoute()
    const page = ref('one')

    return {
      route,
      page,
      router,
      userStore
    }
  }
})
</script>
