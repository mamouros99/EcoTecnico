<template>
  <q-dialog>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Confirmar Submissão</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-list separator>
          <q-item-label>
            Você selecionou:
          </q-item-label>

          <q-item v-if="result.trash">
            <q-item-section>
              <q-icon
                name="delete"
                size="large"
              />
            </q-item-section>
            <q-item-section>
              Caixote Cheio
            </q-item-section>
          </q-item>

          <q-item v-if="result.recycling">
            <q-item-section>
              <q-icon
                name="recycling"
                size="large"
              />
            </q-item-section>
            <q-item-section>
              Qualidade Reciclagem
            </q-item-section>
          </q-item>

          <q-item v-if="result.clean">
            <q-item-section>
              <q-icon
                name="wash"
                size="large"
              />
            </q-item-section>
            <q-item-section>
              Qualidade Limpeza
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section>
        <q-btn
          rounded
          label="Editar"
          v-close-popup
          color="negative"
          class="q-mx-xs"
        />
        <q-btn
          rounded
          label="Submeter"
          v-close-popup
          color="positive"
          class="q-mx-xs"
          @click="submit"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  // name: 'ComponentName',
  props: ['result'],
  setup (props) {
    const router = useRouter()
    const submit = () => {
      console.log(props.result)
      router.push('/')
    }
    return { submit }
  }
}
</script>
