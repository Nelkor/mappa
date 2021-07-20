<template>
  <button class="origin-button" @click="centerToOrigin">.</button>
</template>

<script>
import { centerToOrigin } from '@/map'

export default {
  name: 'OriginButton',
  methods: {
    centerToOrigin,
  },
}
</script>
