const lines = Array.from({ length: 99 }, (_, i) => (i + 1) * 100)

type BackgroundLines = Readonly<{
  horizontal: readonly number[]
  vertical: readonly number[]
}>

const backgroundLines = {
  horizontal: [...lines],
  vertical: [...lines],
}

export const bgLines: BackgroundLines = backgroundLines
