import Vue from 'vue'
import covApp from './App'

let app = document.createElement('cov-app')
document.body.appendChild(app)
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { 'cov-app': covApp }
})

