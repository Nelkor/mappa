import { originCenter } from '@/world'

type ComputedState = {
  top: number
  bottom: number
  left: number
  right: number
  zoom: number
}

const state = {
  width: 0,
  height: 0,
  center: { ...originCenter },
  zoom: 1.4,
}

const computedState: ComputedState = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zoom: 0,
}

const computeState = () => {
  const { width, height, center, zoom } = state
  const scaledWidth = width / zoom
  const scaledHeight = height / zoom

  computedState.zoom = zoom
  computedState.top = center.y - scaledHeight / 2
  computedState.left = center.x - scaledWidth / 2
  computedState.bottom = computedState.top + scaledHeight
  computedState.right = computedState.left + scaledWidth
}

export const setSize = (width: number, height: number): void => {
  state.width = width
  state.height = height

  computeState()
}

export const setCenter = (x: number, y: number): void => {
  state.center.x = x
  state.center.y = y

  computeState()
}

export const setZoom = (zoom: number): void => {
  state.zoom = Math.max(1, zoom)

  computeState()
}

export const getCenter = (): Readonly<Point> => state.center
export const getViewport = (): Readonly<ComputedState> => computedState
