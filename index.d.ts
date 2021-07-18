declare module '*.svg' {
  const text: string

  export default text
}

declare module '*.vue' {
  import type { Component } from 'vue'

  const component: Component

  export default component
}
