<template>
  <ul id="__covList">
    <li 
      class="__cov-item" 
      v-for="item in list" 
      :style="item.position"
      track-by="_key"
    >{{item.nickname + ': ' + item.word}}</li>
    <li 
      class="__cov-item" 
      style="transform: translate3d(50vw, 210px, 0px); color: rgb(0, 255, 255);"
    >Awe: ########9999</li>
  </ul>
  <div id="__covMenu">
    <button id="__settingButton" @click="showSet">设置</button>
    <input type="color" v-if="showSetting" id="__covInputColor" v-model="color" value="#ffffff">
    <input type="text" v-if="showSetting" id="__covInputNickName" v-model="nickname">
  </div>
  <div id="__covInput" v-show="showInputing">
    <input 
      type="text" 
      name="say" 
      id="__covInputText" 
      placeholder="好尴尬，快说点什么！Enter 提交" 
      v-model="say" 
      @keyup.13="submit" 
      @focus='inputFocus'
      @blur='inputblur'
      >
    <label id="__covInputText__label" for="__covInputText"></label>
  </div>
  <button @click="want" id="__covAdd" class="want-btn" :class="{active: showInputing}">
  <span class="__covAdd__text">+</span>
  <span class="ink" :class="{'animate': repple_button.animate}"></span>
  </button>
</template>

<script>
import Wilddog from 'wilddog'

let currentSite = document.domain.replace(/\./g, '-')
let Site = new Wilddog('https://livechat.wilddogio.com/' + currentSite)
let List = Site.child('list')

let removeComment = function () {
  List.on('child_added', (obj) => {
    let value = obj.val()
    if (/ed2k/.test(value.word)) {
      let ref = new Wilddog('https://livechat.wilddogio.com/' + currentSite + '/list/' + obj.key())
      ref.remove((data) => { console.log(1, data) })
    }
  })
}

const roadWidth = 30

let getRoadway = function () {
  return roadWidth * Math.floor(Math.random() * 10)
}

let addNewItem = function (obj, list) {
  let y = getRoadway()
  let item = obj.val()
  list.push({
    _key: obj.key() + Math.random(),
    key: obj.key(),
    show: false,
    roadway: y,
    tick: item.tick,
    position: {'transform': 'translate3d(100%, ' + y + 'px, 0)'},
    nickname: item.nickname,
    word: item.word,
    color: item.color,
    createddAt: item.createddAt
  })
}

let loadHistory = function (self) {
  List.once('value', (snapshot) => {
    snapshot.forEach((obj) => {
      addNewItem(obj, self.list)
      self.lastKey = self.list[self.list.length - 1].key
    })
    self.$nextTick(() => {
      self.queue()
    })
    loadRealtime(self)
  })
}

let loadRealtime = function (self) {
  List.orderByKey().startAt(self.lastKey).on('child_added', (newObj) => {
    addNewItem(newObj, self.list)
    self.$nextTick(() => {
      self.realtimeQueue()
    })
  })
}

export default {
  data () {
    return {
      color: '#ffffff',
      say: '',
      nickname: '路人',
      list: [],
      timer: null,
      tick: 0,
      lastKey: '',
      showSetting: false,
      showInputing: true,
      repple_button: {
        animate: false
      }
    }
  },
  created () {
    this.timer = setInterval(() => {
      this.tick++
    }, 1000)
    loadHistory(this)
  },
  methods: {
    inputFocus (e) {
      e.target.parentNode.setAttribute('class', 'active')
    },
    inputblur (e) {
      e.target.parentNode.setAttribute('class', '')
    },
    want (e) {
      this.repple_button.animate = true
      let button = e.target
      let ink = button.querySelector('.ink')
      if (ink) {
        let d = Math.max(button.offsetHeight, button.offsetWidth)
        let x = e.layerX - ink.offsetWidth / 2
        let y = e.layerY - ink.offsetHeight / 2
        ink.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;')
      }
      this.showInput()
      this.$nextTick(() => {
        setTimeout(() => {
          this.repple_button.animate = false
        }, 660)
      })
    },
    showInput () {
      this.showInputing = !this.showInputing
    },
    showSet () {
      this.showSetting = !this.showSetting
    },
    render (item, realtime) {
      item.show = true
      let wait = 0
      let outtime = 0
      if (!realtime) {
        wait = item.tick * 1000
        outtime = wait - this.tick * 1000
      }
      setTimeout(() => {
        item.position = {'transform': 'translate3d(-100vw, ' + item.roadway + 'px, 0)', 'color': item.color}
      }, outtime)
      setTimeout(() => {
        this.list.$remove(item)
      }, outtime + 10000)
    },
    queue () {
      for (let i = 0, l = this.list.length; i < l; i++) {
        if (!this.list[i].show) {
          this.render(this.list[i], false)
        }
      }
    },
    realtimeQueue () {
      for (let i = 0, l = this.list.length; i < l; i++) {
        if (!this.list[i].show) {
          this.render(this.list[i], true)
        }
      }
    },
    submit () {
      if (!this.say) return
      List.push({
        nickname: this.nickname,
        word: this.say,
        color: this.color,
        tick: this.tick,
        createddAt: Wilddog.ServerValue.TIMESTAMP
      })
      this.say = ''
    }
  }
}
</script>

<style>
html, body{
  height: 100%;
}
#__covList {
  list-style: none;
  margin: 0;
  padding: 0;
}
#__covList .__cov-item{
  position: fixed;
  right: 0;
  top: 0;
  background-color: rgb(3,169,244);
  padding: .2rem .6em;
  color: #fff;
  will-change: transform;
  border-radius: 3rem;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition: cubic-bezier(.25, .5, .5, .25) transform 6s;
  transition: cubic-bezier(.25, .5, .5, .25) transform 6s;
  font-family: 'Roboto','Helvetica','Arial',sans-serif;
}
#__covInput {
  position: fixed;
  bottom: 20px;
  right: 120px;
  width: 300px;
  padding: 0 0 20px 0;
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
#__covInputText {
  border: none;
  border-bottom: 1px solid rgba(0,0,0,.12);
  display: block;
  font-size: 16px;
  font-family: "Helvetica","Arial",sans-serif;
  margin: 0;
  padding: 4px 0;
  width: 100%;
  background: 0 0;
  text-align: left;
  color: inherit;
  outline: none;
}
#__covInputText__label {
  bottom: 0;
  color: rgba(0,0,0,.26);
  font-size: 16px;
  left: 0;
  right: 0;
  pointer-events: none;
  position: absolute;
  display: block;
  top: 24px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}
#__covInputText__label::after{
  content: '';
  background-color: #3f51b5;
  bottom: 20px;
  height: 2px;
  left: 45%;
  position: absolute;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  visibility: hidden;
  width: 10px;
}
.active #__covInputText__label::after {
  visibility: visible;
  left: 0%;
  width: 100%;
}
.ink {
  display: block; position: absolute;
  background: hsl(180, 40%, 80%);
  border-radius: 100%;
  transform: scale(0);
}
.ink.animate {animation: ripple 0.65s linear;}
@keyframes ripple {
  100% {opacity: 0; transform: scale(2.5);}
}
.want-btn {
    border-radius: 100%;
    overflow: hidden;
    font-size: 24px;
    height: 56px;
    margin: auto;
    min-width: 56px;
    width: 56px;
    padding: 0;
    color: #fff;
    background-color: #00bbd6;
    box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12),0 1px 1px 0 rgba(0,0,0,.24);
    position: relative;
    line-height: normal;
    border: none;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
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
