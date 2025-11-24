//@ts-nocheck
import { mount } from 'svelte'
import './app.css'
import './assets/fontawesome.all.min.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
