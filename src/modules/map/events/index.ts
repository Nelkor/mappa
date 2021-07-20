import {
  dispatchMouseDown,
  dispatchMouseMove,
  dispatchUpOrLeave,
} from '@/world/events'
import {
  getCenter,
  setCenter,
  getViewport,
  changeZoom,
  changeCenter,
} from '@/map/viewport'
import { canvas } from '@/map/canvas'
import { originCenter } from '@/world'

type MouseEventName = 'mousedown' | 'mouseup' | 'mousemove' | 'mouseleave'
type MouseHandler = (event: MouseEvent) => void

const handlers = new Map<MouseEventName, MouseHandler>()

export const eventHandlers: Readonly<typeof handlers> = handlers

const state = {
  isDragOn: false,
  isAnimationOn: false,
  savedCenter: { ...getCenter() },
  clickOrigin: { x: 0, y: 0 },
}

const clearAnimation = () => {
  state.isAnimationOn = false
}

export const incZoom = (): void => {
  state.isAnimationOn = true

  changeZoom(true).then(clearAnimation)
}

export const decZoom = (): void => {
  state.isAnimationOn = true

  changeZoom(false).then(clearAnimation)
}

export const centerToOrigin = (): void => {
  state.isAnimationOn = true

  changeCenter(originCenter.x, originCenter.y).then(clearAnimation)
}

handlers.set('mousedown', ({ offsetX, offsetY }) => {
  if (state.isAnimationOn) {
    return
  }

  const { top, left, zoom } = getViewport()
  const x = left + offsetX / zoom
  const y = top + offsetY / zoom

  if (dispatchMouseDown(x, y)) {
    return
  }

  state.isDragOn = true
  state.savedCenter = { ...getCenter() }
  state.clickOrigin.x = offsetX
  state.clickOrigin.y = offsetY

  canvas.style.cursor = 'move'
})

handlers.set('mousemove', ({ offsetX, offsetY }) => {
  const { isDragOn, clickOrigin, savedCenter } = state
  const { top, left, zoom } = getViewport()
  const x = left + offsetX / zoom
  const y = top + offsetY / zoom

  if (!isDragOn) {
    dispatchMouseMove(x, y)

    return
  }

  const dX = offsetX - clickOrigin.x
  const dY = offsetY - clickOrigin.y

  setCenter(savedCenter.x - dX / zoom, savedCenter.y - dY / zoom)
})

const upOrLeave = () => {
  dispatchUpOrLeave()

  state.isDragOn = false

  canvas.style.cursor = 'default'
}

handlers.set('mouseup', upOrLeave)
handlers.set('mouseleave', upOrLeave)
