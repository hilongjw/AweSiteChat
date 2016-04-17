<template>
  <cov-bullet v-for="item in list" :item="item" track-by="_key"></cov-bullet>
  <cov-alert :alert="Alert"></cov-alert>
  <div id="__covMenu">
    
    <button id="__settingButton" v-show="showInputing" @click="showSet">SETTING</button>
  </div>
  <cov-input :submit="submit" :input="input" v-show="showInputing"></cov-input>
  <cov-fab-button @click='showInput'></cov-fab-button>
  <modal v-show="showModal" :close="hideModal">
    <textfield :textfield="nickname"></textfield>
    <textfield :textfield="avatar"></textfield>
  </modal>
</template>

<script>
import Wilddog from 'wilddog'
import covFabButton from './components/fabButton.vue'
// import covButton from './components/button.vue'
import covInput from './components/input.vue'
import covBullet from './components/bullet.vue'
import covAlert from './components/alert.vue'
import textfield from './components/textfield.vue'
import modal from './components/modal.vue'

const AppId = 'livechat'
const MaxCount = 20
const roadWidth = 30
const localStorage = window.localStorage
const AVATAR = ['dist/img/1.jpg', 'dist/img/2.jpg', 'dist/img/3.jpg', 'dist/img/4.jpg']

let currentSite = document.domain.replace(/\./g, '-')
let Site = new Wilddog('https://' + AppId + '.wilddogio.com/' + currentSite)
let List = Site.child('list')

const removeComment = function () {
  List.on('child_added', (obj) => {
    let value = obj.val()
    if (/(ed2k:|某些和谐词)/.test(value.word)) {
      let ref = new Wilddog('https://livechat.wilddogio.com/' + currentSite + '/list/' + obj.key())
      ref.remove((data) => { console.log(1, data) })
    }
  })
}
removeComment()

let roadIndex = 0
const getRoadway = function () {
  roadIndex === 10 ? roadIndex = 0 : roadIndex++
  return roadWidth * roadIndex
}

const generateBullet = function (obj) {
  let y = getRoadway()
  let item = obj.val()
  return {
    _key: obj.key() + Math.random(),
    key: obj.key(),
    avatar: item.avatar ? item.avatar : AVATAR[Math.floor(Math.random() * 4)],
    show: false,
    flying: false,
    roadway: y,
    tick: item.tick,
    position: {'top': y + 'px', 'color': item.color},
    nickname: item.nickname,
    word: item.word,
    color: item.color
  }
}

const addNewItem = function (obj, self, realtime) {
  let newItem = generateBullet(obj)

  if (realtime) {
    self.list.push(newItem)
    self.$nextTick(() => {
      self.render(newItem, true)
    })
  } else if (self.list.length > MaxCount) {
    self.preList.push(newItem)
  } else {
    self.list.push(newItem)
    self.$nextTick(() => {
      self.render(newItem, false)
    })
  }
}

const loadRealtime = function (self) {
  List.orderByChild('tick').on('child_added', (newObj) => {
    if (self.tick < 5) {
      addNewItem(newObj, self, false)
    } else {
      addNewItem(newObj, self, true)
    }
  })
}

const getLocalStorage = function (key) {
  if (localStorage && localStorage.covChat) {
    let tmp = JSON.parse(localStorage.covChat)
    return tmp[key]
  }
  return ''
}

const setLocalStorage = function (key, value) {
  if (localStorage) {
    let tmp = {}
    if (localStorage.covChat) {
      tmp = JSON.parse(localStorage.covChat)
    }
    tmp[key] = value
    localStorage.covChat = JSON.stringify(tmp)
    return true
  }
  return false
}

const checkGlobalInit = function () {
  let globalInit = window.$__covInit
  if (globalInit) {
    if (globalInit.nickname) {
      setLocalStorage('nickname', globalInit.nickname)
    }
    if (globalInit.avatar) {
      setLocalStorage('avatar', globalInit.avatar)
    }
  }
}

export default {
  data () {
    checkGlobalInit()
    return {
      nickname: {
        value: getLocalStorage('nickname'),
        placeholder: 'NickName'
      },
      avatar: {
        value: getLocalStorage('avatar'),
        placeholder: 'Avatar'
      },
      input: {
        color: 'rgb(113, 113, 113)',
        say: '',
        avatar: null
      },
      showModal: false,
      list: [],
      preList: [],
      timer: null,
      tick: 0,
      showSetting: false,
      showInputing: true,
      Alert: {
        message: '',
        show: false
      }
    }
  },
  components: {
    covFabButton,
    covBullet,
    covInput,
    covAlert,
    textfield,
    modal
  },
  created () {
    this.timer = setInterval(() => {
      this.tick++
    }, 1000)
    loadRealtime(this)
  },
  methods: {
    showInput () {
      this.showInputing = !this.showInputing
    },
    showSet () {
      this.showModal = !this.showModal
    },
    hideModal () {
      this.showModal = false
      setLocalStorage('nickname', this.nickname.value)
      setLocalStorage('avatar', this.avatar.value)
    },
    render (item, realtime) {
      let wait = item.tick * 1000
      let outtime = 0

      item.show = true

      if (!realtime) {
        outtime = wait - this.tick * 1000
        outtime = outtime < 0 ? 0 : outtime
      } else {
        outtime = 500
      }
      setTimeout(() => {
        item.flying = true
      }, outtime)
      setTimeout(() => {
        this.list.$remove(item)
        if (this.list.length < MaxCount && this.preList.length > 0) {
          let preItem = this.preList.shift()
          this.list.push(preItem)
          this.$nextTick(() => {
            this.render(preItem, false)
          })
        }
      }, outtime + 6000)
    },
    creatAlert (message) {
      this.Alert.message = message
      this.Alert.show = true
      setTimeout(() => {
        this.Alert.show = false
        this.Alert.message = ''
      }, 3000)
    },
    submit () {
      if (!this.input.say) {
        this.creatAlert('应该说点什么')
        return false
      } else if (this.input.say.length > 40) {
        this.creatAlert('发表失败，可能字数太多啦')
        return false
      }
      List.push({
        nickname: this.nickname.value,
        word: this.input.say,
        avatar: this.avatar.value,
        color: this.input.color,
        tick: this.tick,
        createddAt: Wilddog.ServerValue.TIMESTAMP
      }, (err) => {
        if (!err) {
          this.input.say = ''
        } else {
          this.creatAlert('发表失败，可能字数太多啦')
          console.log(err)
        }
      })
    }
  }
}
</script>

<style>
html, body{
  height: 100%;
}
#__covInputColor {
  padding: 0;
  border: none;
  width: 1.6rem;
  height: 1.8rem;
  vertical-align: bottom;
}
#__covMenu {
  position: fixed;
  bottom: 100px;
  right: 10px;
}
#__settingButton {
  padding: .5em 1em;
  background-color: rgba(0,0,0,0);
  border: none;
  color: #00BBD6;
  -webkit-transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  outline: none;
}
#__settingButton:hover {
  background-color: rgba(158,158,158,.2);
}
</style>
