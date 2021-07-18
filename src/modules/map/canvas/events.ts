import { eventHandlers } from '@/map/events'

import { canvas } from './ctx'

eventHandlers.forEach((handler, event) => {
  canvas.addEventListener(event, handler)
})
