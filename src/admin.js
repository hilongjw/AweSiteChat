import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './views/admin'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/faq': {
    component: function (resolve) {
      require(['./views/admin/faq.vue'], resolve)
    }
  },
  '/list': {
    component: function (resolve) {
      require(['./views/admin/list.vue'], resolve)
    }
  },
  '/setting': {
    component: function (resolve) {
      require(['./views/admin/setting.vue'], resolve)
    }
  }
})

router.start(App, 'app')
