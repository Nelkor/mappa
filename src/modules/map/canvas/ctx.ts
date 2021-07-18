import { createCtx } from 'ctx-2d'

import { setSize } from '@/map/viewport'

const { context, setParent } = createCtx({
  resizeCallback(ctx) {
    const { width, height } = ctx.canvas

    setSize(width, height)
  },
})

export const ctx = context
export const { canvas } = context
export const setCanvas = setParent
