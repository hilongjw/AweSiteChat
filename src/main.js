import Vue from 'vue'
import covApp from './views/app'
import AV from './AvInit'

window.AV = AV
let app = document.createElement('cov-app')
document.body.appendChild(app)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { 'cov-app': covApp }
})

