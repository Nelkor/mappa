<template>
  <main ref="main" class="app-main" />
</template>

<script>
import { ref, onMounted } from 'vue'

import { setCanvas } from '@/map/canvas'

export default {
  name: 'AppMain',
  setup() {
    const main = ref(null)

    onMounted(() => setCanvas(main.value))

    return { main }
  },
}
</script>
