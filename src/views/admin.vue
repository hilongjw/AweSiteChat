<template>
  <nav class="__cov-admin-nav">
    <nav-tab 
      class="__cov-admin-nav-tab"
      @click="navClick(nav.setting)"
      :state="nav.setting"
      v-link="{ path: 'setting' }"
    >SETTING</nav-tab>
    <nav-tab 
      class="__cov-admin-nav-tab"
      @click="navClick(nav.list)"
      :state="nav.list"
      v-link="{ path: 'list' }"
    >LIST</nav-tab>
    <nav-tab 
      class="__cov-admin-nav-tab"
      @click="navClick(nav.faq)"
      :state="nav.faq"
      v-link="{ path: 'faq' }"
    >FAQ</nav-tab>
  </nav>
  <router-view :check-list="checkList" ></router-view>
</template>

<script>
import { Site, List, generateBullet } from '../helper'
import { navTab } from '../components/index'

const adminTest = function () {
  Site.authWithPassword({email: 'hilongjw@qq.com', password: 'wlongjw'},
    function (err, data) {
      if (err === null) {
        console.log('auth success!')
      } else {
        console.log('auth failed,msg:', err)
      }
    }
  )
}
adminTest()

const loadRealtime = function (self) {
  List.orderByChild('tick').on('child_added', (newObj) => {
    self.checkList.push(generateBullet(newObj))
  })
}

export default {
  data () {
    return {
      nav: {
        setting: {
          active: false
        },
        list: {
          active: false
        },
        faq: {
          active: false
        }
      },
      checkList: []

    }
  },
  created () {
    loadRealtime(this)
  },
  components: {
    navTab
  },
  methods: {
    navClick (tab) {
      this.nav.setting.active = false
      this.nav.list.active = false
      this.nav.faq.active = false
      tab.active = true
    }
  }
}
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', 'Helvetica', sans-serif;
  }
  .__cov-admin-nav {
    height: 64px;
    margin: 0;
    width: 100%;
    padding: 0;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    background-color: rgb(103,58,183);
  }
</style>
