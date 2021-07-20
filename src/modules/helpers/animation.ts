type Animated = {
  from: number
  to: number
  startedAt: number
  duration: number
}

type AnimatedUpdater = (to: number, duration: number) => void

export const createAnimated = (initialValue: number): Animated => ({
  from: initialValue,
  to: initialValue,
  startedAt: 0,
  duration: 0,
})

export const getAnimatedValue = (item: Animated, time: number): number => {
  const passedTime = time - item.startedAt
  const passedPart = Math.min(1, passedTime / item.duration)
  const path = item.to - item.from

  return item.from + path * passedPart
}

export const updateAnimated = (
  item: Animated,
  to: number,
  time: number,
  duration: number
): void => {
  item.from = getAnimatedValue(item, time)
  item.to = to
  item.startedAt = time
  item.duration = duration
}

export const createAnimatedUpdater =
  (item: Animated): AnimatedUpdater =>
  (to, duration) => {
    const now = performance.now()

    updateAnimated(item, to, now, duration)
  }
