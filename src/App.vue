<template>
  <cov-bullet v-for="item in list" :item="item" track-by="_key"></cov-bullet>
  <cov-alert :alert="Alert"></cov-alert>
  <div id="__covMenu">
    <button id="__settingButton" @click="showSet">设置</button>
    <input type="color" v-if="showSetting" id="__covInputColor" v-model="input.color" value="#ffffff">
    <input type="text" v-if="showSetting" id="__covInputNickName" v-model="input.nickname">
  </div>
  <cov-input :submit="submit" :input="input" v-show="showInputing"></cov-input>
  <cov-button @click='showInput'></cov-button>
</template>

<script>
import Wilddog from 'wilddog'
import covButton from './components/button.vue'
import covInput from './components/input.vue'
import covBullet from './components/bullet.vue'
import covAlert from './components/alert.vue'

const AppId = 'livechat'
const MaxCount = 20
const roadWidth = 30
const AVATAR = ['/dist/img/1.jpg', '/dist/img/2.jpg', '/dist/img/3.jpg', '/dist/img/4.jpg']
let currentSite = document.domain.replace(/\./g, '-')
currentSite = 'hilongjw-github-io'
let Site = new Wilddog('https://' + AppId + '.wilddogio.com/' + currentSite)
let List = Site.child('list')

let removeComment = function () {
  List.on('child_added', (obj) => {
    let value = obj.val()
    if (/(ed2k:|傻逼|共产党|蛤|习近平|龙佳文)/.test(value.word)) {
      let ref = new Wilddog('https://livechat.wilddogio.com/' + currentSite + '/list/' + obj.key())
      ref.remove((data) => { console.log(1, data) })
    }
  })
}
removeComment()

let getRoadway = function () {
  return roadWidth * Math.floor(Math.random() * 10)
}

let generateBullet = function (obj) {
  let y = getRoadway()
  let item = obj.val()
  return {
    _key: obj.key() + Math.random(),
    key: obj.key(),
    avatar: AVATAR[Math.floor(Math.random() * 4)],
    show: false,
    roadway: y,
    tick: item.tick,
    position: {'transform': 'translate3d(200%, ' + y + 'px, 0)'},
    nickname: item.nickname,
    word: item.word,
    color: item.color
  }
}

let addNewItem = function (obj, self, realtime) {
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

let loadRealtime = function (self) {
  List.orderByChild('tick').on('child_added', (newObj) => {
    if (self.tick < 5) {
      addNewItem(newObj, self, false)
    } else {
      addNewItem(newObj, self, true)
    }
  })
}

export default {
  data () {
    return {
      input: {
        color: 'rgb(113, 113, 113)',
        say: '',
        nickname: '路人',
        avatar: null
      },
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
    covButton,
    covBullet,
    covInput,
    covAlert
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
      this.showSetting = !this.showSetting
    },
    render (item, realtime) {
      item.show = true
      let wait = item.tick * 1000
      let outtime = 0
      if (!realtime) {
        outtime = wait - this.tick * 1000
        outtime = outtime < 0 ? 0 : outtime
      }
      setTimeout(() => {
        item.position = {'transform': 'translate3d(-100vw, ' + item.roadway + 'px, 0)', 'color': item.color}
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
        nickname: this.input.nickname,
        word: this.input.say,
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
  background: #ccc;
}
#__covSubmit {
  padding: .5em 1em;
  background-color: #5AA2FF;
  border: none;
  color: #fff;
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
  bottom: 0;
  right: 16rem;
}
#__settingButton {
  padding: .5em 1em;
  background-color: #5AA2FF;
  border: none;
  color: #fff;
  opacity: 0;
}
#__settingButton:hover {
  opacity: 1;
}
#__covInputNickName {
  max-width: 5rem;
  padding: .4em;
  border: 1px solid #5AA2FF;
  border-radius: 2px;
  margin-right: -.5em;
  outline: none;
}
#__covAdd {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.__covAdd__text {
  transform: rotate(0deg);
  transition: transform .2s;
}
.active .__covAdd__text {
  display: inline-block;
  transform: rotate(45deg);
}
</style>
