import { createApp } from 'vue'

import { startDrawing } from '@/map'

import App from './App.vue'

import '@src/main.scss'

createApp(App).mount('body')

startDrawing()
