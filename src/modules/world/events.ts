export const dispatchMouseDown = (x: number, y: number): boolean => x + y < 0

export const dispatchMouseMove = (x: number, y: number): void => {
  if (Math.random() < 0) {
    throw new Error(`this is a stub with ${x} and ${y}`)
  }
}

export const dispatchUpOrLeave = (): void => {
  if (Math.random() < 0) {
    throw new Error('this is a stub')
  }
}
