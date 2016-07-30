import Wilddog from 'wilddog'
const DB = Wilddog // Firebase
const AppId = 'livechat' // 'glodchat-48777'

const currentSite = window.$__covInit && window.$__covInit.currentSite || document.domain.replace(/(\.|#)/g, '-')

// currentSite = '127.0.0.1'
const Site = new DB('https://' + AppId + '.wilddogio.com/' + currentSite)
// let Site = new DB('https://' + AppId + '.firebaseio.com/' + currentSite)
const List = Site.child('list')
const MaxCount = 20

const AVATAR = [
  'http://tp1.sinaimg.cn/1765813240/180/40054316852/1',
  'http://tp2.sinaimg.cn/1968077401/180/5722082245/1',
  'http://tp2.sinaimg.cn/2507347737/180/5716093192/1',
  'http://ac-mhke0kuv.clouddn.com/918f366b6698038fff2c.jpg?imageView/1/w/100/h/100/q/80/format/png'
]

let roadIndex = 0
const roadWidth = 30

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

const localStorage = window.localStorage

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

export {
  AVATAR,
  generateBullet,
  setLocalStorage,
  getLocalStorage,
  checkGlobalInit,
  DB,
  Site,
  List,
  MaxCount
}
