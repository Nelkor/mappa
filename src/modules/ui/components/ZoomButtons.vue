<template>
  <div class="zoom-buttons">
    <button @click="incZoom">+</button>
    <button @click="decZoom">-</button>
  </div>
</template>

<script>
import { incZoom, decZoom } from '@/map'

export default {
  name: 'ZoomButtons',
  methods: {
    incZoom,
    decZoom,
  },
}
</script>
