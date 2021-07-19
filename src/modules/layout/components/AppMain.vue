<template>
  <main ref="main" class="app-main" />

  <ZoomButtons />
</template>

<script>
import { ref, onMounted } from 'vue'

import ZoomButtons from '@/ui/components/ZoomButtons.vue'
import { setCanvas } from '@/map/canvas'

export default {
  name: 'AppMain',
  components: {
    ZoomButtons,
  },
  setup() {
    const main = ref(null)

    onMounted(() => setCanvas(main.value))

    return { main }
  },
}
</script>
