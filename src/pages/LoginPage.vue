<template>
  <q-page padding class="column justify-center row items-center">
    <q-card flat bordered>
      <q-card-section class="text-h4 text-primary text-center">
        {{$t('msg_login_wait')}}
      </q-card-section>
      <q-card-section class="column items-center ">
        <q-spinner-bars
          color="secondary"
          size="50%"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from 'stores/UserStore'
import useNotify from 'src/composables/UseNotify'
import { useI18n } from 'vue-i18n'

export default {
  // name: 'PageName',
  setup () {
    const href = window.location.href
    const route = useRoute()
    // eslint-disable-next-line no-unused-vars
    const router = useRouter()
    const userStore = useUserStore()
    const notification = useNotify()

    const getAuthCode = () => {
      window.location = process.env.VUE_APP_FENIX_URL + href
    }

    const code = computed(() => {
      return route.query.code
    })

    const { t } = useI18n()

    onMounted(async () => {
      if (code.value) {
        await userStore.getAuth(code.value)
          .then(() => {
            notification.notifySuccess(t('msg_good_login'))
          })
          .catch((errorMessage) => {
            notification.notifyError(errorMessage)
          })
          .finally(() => {
            router.push({ name: 'home' })
          })
      } else {
        getAuthCode()
      }
    })

    return {
      getAuthCode
    }
  }
}
</script>
