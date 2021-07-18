import { getViewport } from '@/map/viewport'
import { canvas, ctx } from '@/map/canvas'
import { worldHeight, worldWidth } from '@/world'

export const drawAbroad = (): void => {
  ctx.fillStyle = '#003333'

  const { top, bottom, right, left, zoom } = getViewport()

  if (left < 0) {
    ctx.fillRect(0, 0, -left * zoom, canvas.height)
  }

  if (top < 0) {
    ctx.fillRect(0, 0, canvas.width, -top * zoom)
  }

  if (right > worldWidth) {
    const width = (right - worldWidth) * zoom

    ctx.fillRect(canvas.width - width, 0, width, canvas.height)
  }

  if (bottom > worldHeight) {
    const height = (bottom - worldHeight) * zoom

    ctx.fillRect(0, canvas.height - height, canvas.width, height)
  }
}
