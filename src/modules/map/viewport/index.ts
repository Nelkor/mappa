import { originCenter } from '@/world'
import {
  createAnimated,
  getAnimatedValue,
  updateAnimated,
  createAnimatedUpdater,
} from '@/helpers/animation'
import { delayTime } from '@/helpers/time'

type ComputedState = {
  top: number
  left: number
  bottom: number
  right: number
  zoom: number
}

const ZOOM_FACTOR = 1.4
const ZOOM_LIMIT = 14
const ZOOM_DURATION = 300
const CENTER_DURATION = 1000

const state = {
  width: 0,
  height: 0,
  center: {
    x: createAnimated(originCenter.x),
    y: createAnimated(originCenter.y),
  },
  zoom: createAnimated(ZOOM_FACTOR),
}

const setZoom = createAnimatedUpdater(state.zoom)

export const setCenter = (x: number, y: number): void => {
  const now = performance.now()

  updateAnimated(state.center.x, x, now, 0)
  updateAnimated(state.center.y, y, now, 0)
}

export const changeCenter = (x: number, y: number): Promise<void> => {
  const now = performance.now()

  updateAnimated(state.center.x, x, now, CENTER_DURATION)
  updateAnimated(state.center.y, y, now, CENTER_DURATION)

  return delayTime(CENTER_DURATION)
}

export const setSize = (width: number, height: number): void => {
  state.width = width
  state.height = height
}

export const changeZoom = (inc = false): Promise<void> => {
  const value = inc
    ? Math.min(ZOOM_LIMIT, state.zoom.to * ZOOM_FACTOR)
    : Math.max(1, state.zoom.to / ZOOM_FACTOR)

  setZoom(Math.min(ZOOM_LIMIT, value), ZOOM_DURATION)

  return delayTime(ZOOM_DURATION)
}

export const getCenter = (): Readonly<Point> => {
  const now = performance.now()

  return {
    x: getAnimatedValue(state.center.x, now),
    y: getAnimatedValue(state.center.y, now),
  }
}

// TODO функцию для остановки анимации центра?

export const getViewport = (): Readonly<ComputedState> => {
  const now = performance.now()
  const zoom = getAnimatedValue(state.zoom, now)

  const center = {
    x: getAnimatedValue(state.center.x, now),
    y: getAnimatedValue(state.center.y, now),
  }

  const { width, height } = state
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
