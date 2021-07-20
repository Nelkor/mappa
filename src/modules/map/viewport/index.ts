import { originCenter } from '@/world'
import {
  createAnimated,
  getAnimatedValue,
  createAnimatedUpdater,
} from '@/helpers/animation'

type ComputedState = {
  top: number
  left: number
  bottom: number
  right: number
  zoom: number
}

const ZOOM_FACTOR = 1.4
const ZOOM_LIMIT = 14
const ZOOM_DURATION = 200

// TODO center & zoom – animatedState
//  Начать с zoom (+ кнопки)
const state = {
  width: 0,
  height: 0,
  center: { ...originCenter },
  zoom: createAnimated(ZOOM_FACTOR),
}

export const setSize = (width: number, height: number): void => {
  state.width = width
  state.height = height
}

export const setCenter = (x: number, y: number): void => {
  state.center.x = x
  state.center.y = y
}

const setZoom = createAnimatedUpdater(state.zoom)

export const incZoom = (): void => {
  setZoom(Math.min(ZOOM_LIMIT, state.zoom.to * ZOOM_FACTOR), ZOOM_DURATION)
}

export const decZoom = (): void => {
  setZoom(Math.max(1, state.zoom.to / ZOOM_FACTOR), ZOOM_DURATION)
}

export const getCenter = (): Readonly<Point> => state.center

// TODO функцию для остановки анимации центра?

export const getViewport = (): Readonly<ComputedState> => {
  const zoom = getAnimatedValue(state.zoom, performance.now())

  const { width, height, center } = state
  const scaledWidth = width / zoom
  const scaledHeight = height / zoom
  const top = center.y - scaledHeight / 2
  const left = center.x - scaledWidth / 2

  return {
    top,
    left,
    bottom: top + scaledHeight,
    right: left + scaledWidth,
    zoom,
  }
}
