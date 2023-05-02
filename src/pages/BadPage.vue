<template>
  <q-page class="flex flex-center">
    <q-card flat class="q-ma-lg q-pb-lg">
      <q-card-section class="text-h2 text-center q-mt-ly" style="opacity: .9">
        Alguma coisa Correu Mal
      </q-card-section>

      <q-card-actions class="q-mt-lg row justify-around">
        <q-btn

          size="lg"
          color="primary"
          label="Home"
          to="/"
        />
        <q-btn
          size="lg"
          color="primary"
          label="Scan Again"
          to="/scan"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'BadPage'

}
</script>

<style scoped>

</style>
