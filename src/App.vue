<template>
  <cov-bullet v-for="item in list" :item="item" track-by="_key"></cov-bullet>
  <cov-alert :alert="Alert"></cov-alert>
  <div id="__covMenu">
    <cov-button id="__settingButton" v-show="showState.inputting" @click="showSet">SETTING</cov-button>
    <cov-button id="__adminButton" v-show="showState.admin" @click="showAdmin">ADMIN</cov-button>
  </div>
  <cov-input :submit="submit" :input="input" :show-input="showInput" v-show="showState.inputting"></cov-input>
  <cov-fab-button @click='showInput' v-show="!showState.inputting"></cov-fab-button>
  <modal v-show="showState.modal" :close="hideModal">
    <textfield :textfield="nickname"></textfield>
    <textfield :textfield="avatar"></textfield>
  </modal>
  <cov-list :check-list="checkList" v-if="showState.checkList" :close="hideCheckList"></cov-list>
</template>

<script>
import Wilddog from 'wilddog'
// import Firebase from 'firebase'
import covFabButton from './components/fabButton.vue'
import covButton from './components/button.vue'
import covInput from './components/input.vue'
import covBullet from './components/bullet.vue'
import covAlert from './components/alert.vue'
import textfield from './components/textfield.vue'
import modal from './components/modal.vue'
import covList from './components/list.vue'

const DB = Wilddog // Firebase
const AppId = 'livechat' // 'glodchat-48777'
const MaxCount = 20
const roadWidth = 30
const localStorage = window.localStorage
const AVATAR = ['http://tp1.sinaimg.cn/1765813240/180/40054316852/1', 'http://tp2.sinaimg.cn/1968077401/180/5722082245/1', 'http://tp2.sinaimg.cn/2507347737/180/5716093192/1', 'http://ac-mhke0kuv.clouddn.com/918f366b6698038fff2c.jpg?imageView/1/w/100/h/100/q/80/format/png']

let currentSite = document.domain.replace(/\./g, '-')
let Site = new DB('https://' + AppId + '.wilddogio.com/' + currentSite)
// let Site = new DB('https://' + AppId + '.firebaseio.com/' + currentSite)
let List = Site.child('list')

// const adminTest = function () {
//   Site.authWithPassword({email: 'hilongjw@qq.com', password: ''},
//     function (err, data) {
//       if (err === null) {
//         console.log('auth success!')
//       } else {
//         console.log('auth failed,msg:', err)
//       }
//     }
//   )
// }
// adminTest()

// const removeComment = function () {
//   List.on('child_added', (obj) => {
//     let value = obj.val()
//     if (/(ed2k:|某些和谐词)/.test(value.word)) {
//       let ref = new Wilddog('https://livechat.wilddogio.com/' + currentSite + '/list/' + obj.key())
//       ref.remove((data) => { console.log(1, data) })
//     }
//   })
// }
// removeComment()

let roadIndex = 0

const getRoadway = function (scrollHeight) {
  roadIndex === 10 ? roadIndex = 0 : roadIndex++
  return roadWidth * roadIndex * Math.random()
}

const generateBullet = function (obj) {
  let item = obj.val()
  let y = getRoadway()
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

  self.checkList.push(newItem)
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
        value: '',
        avatar: null,
        placeholder: '好尴尬，快说点什么!'
      },
      showState: {
        modal: false,
        inputting: true,
        checkList: false,
        admin: getLocalStorage('nickname') === 'Awe_admin'
      },
      inputBtn: {
        disable: true
      },
      list: [],
      preList: [],
      checkList: [],
      timer: null,
      tick: 0,
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
    covButton,
    covAlert,
    textfield,
    modal,
    covList
  },
  created () {
    this.timer = setInterval(() => {
      this.tick++
    }, 1000)
    loadRealtime(this)
  },
  events: {
    'del-item': function (item) {
      this.delItem(item)
    }
  },
  methods: {
    showAdmin () {
      this.showState.checkList = !this.showState.checkList
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
    },
    hideCheckList () {
      this.showState.checkList = false
    },
    showInput () {
      this.showState.inputting = !this.showState.inputting
    },
    showSet () {
      this.showState.modal = !this.showState.modal
    },
    hideModal () {
      this.showState.modal = false
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
      if (!this.input.value) {
        this.creatAlert('应该说点什么')
        return false
      } else if (this.input.value.length > 40) {
        this.creatAlert('发表失败，可能字数太多啦')
        return false
      }
      List.push({
        nickname: this.nickname.value,
        word: this.input.value,
        avatar: this.avatar.value,
        color: this.input.color,
        tick: this.tick,
        createddAt: DB.ServerValue.TIMESTAMP
      }, (err) => {
        if (!err) {
          this.input.value = ''
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
body {
  background: #ccc;
}
#__covMenu {
  position: fixed;
  bottom: 100px;
  right: 5px;
}
#__settingButton {
  background-color: rgba(0,0,0,0);
  color: #00BBD6;
}
#__settingButton:hover {
  background-color: rgba(158,158,158,.2);
}
@media (max-width: 960px) {
  #__covMenu {
    bottom: 60px;
  }
}
</style>
