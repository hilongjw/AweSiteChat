<template>
  <dashboard v-if="!Login.show" :check-list="checkList"></dashboard>
  <cov-alert :alert="Alert"></cov-alert>
  <login v-if="Login.show" :login="Login" :action="goLogin"></login>
</template>

<script>
import { Site, List, generateBullet } from '../helper'
import { covAlert } from '../components/index'
import login from './admin/login.vue'
import dashboard from './admin/dashboard.vue'

const loadRealtime = function (self) {
  List.orderByChild('tick').on('child_added', (newObj) => {
    self.checkList.push(generateBullet(newObj))
  })
}

export default {
  data () {
    return {
      Alert: {
        message: '',
        show: false
      },
      Login: {
        show: true,
        username: {
          value: 'hilongjw@qq.com',
          placeholder: 'username'
        },
        password: {
          value: '',
          placeholder: 'password'
        }
      },
      checkList: []
    }
  },
  components: {
    dashboard,
    covAlert,
    login
  },
  events: {
    'top-del-item': function (item) {
      this.delItem(item)
    }
  },
  methods: {
    goLogin () {
      Site.authWithPassword({
        email: this.Login.username.value,
        password: this.Login.password.value
      }, (err, data) => {
        if (err === null) {
          this.creatAlert('auth success!')
          this.Login.show = false
          loadRealtime(this)
        } else {
          this.creatAlert('auth failed,msg:', err)
        }
      })
    },
    creatAlert (message) {
      this.Alert.message = message
      this.Alert.show = true
      setTimeout(() => {
        this.Alert.show = false
        this.Alert.message = ''
      }, 3000)
    },
    delItem (item) {
      let ref = List.child(item.key)
      ref.remove((data) => {
        if (!data) {
          this.checkList.$remove(item)
          this.creatAlert('del done')
        } else {
          this.creatAlert('failed to del', item.username, item.word)
        }
      })
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
