import { useQuasar } from 'quasar'

export default function useNotify () {
  const quasar = useQuasar()

  const notifySuccess = () => {
    quasar.notify({
      message: 'Obrigado pela ajuda!',
      color: 'positive',
      timeout: 2000,
      icon: 'park'
    })
  }
  return {
    notifySuccess
  }
}
