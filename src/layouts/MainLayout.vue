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
    <q-footer class="bg-transparent q-mx-sm q-mb-sm q-pt-sm justify-between row" style="backdrop-filter: blur(7px)">
      <q-btn-dropdown
        icon="flag"
        :label="$i18n.locale"
        dropdown-icon="none"
      >
        <q-list dense >
          <q-btn
            no-caps
            class="full-width"
            @click="() => {
              $i18n.locale = 'pt-PT'
              languageStore.storeLanguage('pt-PT')

            }"
            label="pt-PT"
          />
          <q-btn
            no-caps
            class="full-width"
            @click="() => {
              $i18n.locale = 'en-US'
              languageStore.storeLanguage('en-US')
            }"
            label="en-US"
          />
        </q-list>
      </q-btn-dropdown>
      <q-btn
        icon="question_mark"
        rounded
        :label="$t('questions')"
        color="secondary"
        glossy
        @click="router.push('/questions')"
      />

    </q-footer>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from 'stores/UserStore'
import { useLanguageStore } from 'stores/LanguageStore'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const router = useRouter()
    const userStore = useUserStore()
    const languageStore = useLanguageStore()
    const route = useRoute()
    const page = ref('one')

    return {
      route,
      page,
      router,
      userStore,
      languageStore
    }
  }
})
</script>
