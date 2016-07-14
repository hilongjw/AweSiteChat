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
import {
  generateBullet,
  setLocalStorage,
  getLocalStorage,
  checkGlobalInit,
  DB,
  List,
  MaxCount
} from '../helper'

import {
  covFabButton,
  covButton,
  covInput,
  covBullet,
  covAlert,
  textfield,
  modal,
  covList
} from '../components/index'

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
      }, outtime + 7000)
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
