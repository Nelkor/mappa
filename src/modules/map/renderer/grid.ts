import { getViewport } from '@/map/viewport'
import { canvas, ctx } from '@/map/canvas'
import { bgLines } from '@/world'

export const drawGrid = (): void => {
  ctx.lineWidth = 2
  ctx.strokeStyle = '#ccd6d6'

  const { top, bottom, right, left, zoom } = getViewport()
  const { horizontal, vertical } = bgLines
  const vLines = vertical.filter(line => line >= left && line <= right)
  const hLines = horizontal.filter(line => line >= top && line <= bottom)

  vLines
    .map(line => (line - left) * zoom)
    .forEach(line => {
      ctx.beginPath()
      ctx.moveTo(line, 0)
      ctx.lineTo(line, canvas.height)
      ctx.stroke()
    })

  hLines
    .map(line => (line - top) * zoom)
    .forEach(line => {
      ctx.beginPath()
      ctx.moveTo(0, line)
      ctx.lineTo(canvas.width, line)
      ctx.stroke()
    })
}
