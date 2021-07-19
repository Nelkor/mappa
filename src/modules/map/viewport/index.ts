import { originCenter } from '@/world'

type ComputedState = {
  top: number
  left: number
  bottom: number
  right: number
  zoom: number
}

// TODO center & zoom – animatedState
//  Начать с zoom (+ кнопки)
const state = {
  width: 0,
  height: 0,
  center: { ...originCenter },
  zoom: 1.4,
}

export const setSize = (width: number, height: number): void => {
  state.width = width
  state.height = height
}

export const setCenter = (x: number, y: number): void => {
  state.center.x = x
  state.center.y = y
}

export const setZoom = (zoom: number): void => {
  state.zoom = Math.max(1, zoom)
}

export const getCenter = (): Readonly<Point> => state.center

// TODO функцию для остановки анимации центра?

export const getViewport = (): Readonly<ComputedState> => {
  const { width, height, center, zoom } = state
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
