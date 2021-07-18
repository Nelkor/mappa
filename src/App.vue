<template>
  <AppMain />
  <AppAside />
</template>

<script>
import AppMain from '@/layout/components/AppMain.vue'
import AppAside from '@/layout/components/AppAside.vue'

export default {
  name: 'App',
  components: {
    AppMain,
    AppAside,
  },
}
</script>
