import { ctx, canvas } from '@/map/canvas'

import { drawAbroad } from './abroad'
import { drawGrid } from './grid'

const draw = () => {
  requestAnimationFrame(draw)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawGrid()
  drawAbroad()
}

export const startDrawing = (): void => {
  requestAnimationFrame(draw)
}
