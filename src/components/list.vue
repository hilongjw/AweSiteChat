<template>
  <div class="__cov-check">
    <div class="__cov-check-title">
    弹幕管理
    <textfield :textfield="search"></textfield>
    </div>
    <div class="__cov-check-list">
      <div 
        class="__cov-item __cov-check-item"
        v-for="item in showList"
        track-by="_key"
      >
        <img class="__cov-item-avatar" v-if="item.avatar" :src="item.avatar">
        <span class="__cov-item-username">
          {{item.nickname}}
        </span>
        {{item.word}}
        <cov-button class="__cov-del-btn" @click="delItem(item)">Delete</cov-button>
      </div>
    </div>
    <div class="__cov-check-actions">
      <cov-button class="__cov-check-btn" @click="close">OK</cov-button>
    </div>
  </div>
</template>

<script>
import covButton from './button.vue'
import textfield from './textfield.vue'

export default {
  props: ['checkList', 'close'],
  data () {
    return {
      search: {
        placeholder: 'Search',
        value: ''
      }
    }
  },
  computed: {
    showList () {
      if (this.search.value === '') {
        return this.checkList
      } else {
        let haveIt = new RegExp(this.search.value, 'g')
        return this.checkList.filter((item) => {
          if (haveIt.test(item.word)) {
            return true
          }
          return false
        })
      }
    }
  },
  components: {
    covButton,
    textfield
  },
  methods: {
    delItem (item) {
      this.$dispatch('del-item', item)
    }
  }
}
</script>

<style>
.__cov-del-btn {
  position: absolute;
  right: 0px;
}
.__cov-check-item {
  position: relative;
  margin: 20px 60px 0 60px;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  max-width: 500px;
  width: 380px;
}
.__cov-check-title {
  color: rgba(0,0,0,.54);
  font-size: 13px;
  line-height: 18px;
  overflow: hidden;
  padding: 16px;
  width: 90%;
}
.__cov-check-list{ 
  overflow-y: scroll;
  height: 100%;
}
.__cov-check {
    position: fixed;
    height: 600px;
    padding: 0 0 50px 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 16px;
    font-weight: 400;
    min-height: 200px;
    overflow: hidden;
    width: 500px;
    z-index: 1;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 100;
    font-family: 'Roboto','Helvetica', "Microsoft YaHei", 'Arial', sans-serif;
  }
  .__cov-check-actions {
    position: absolute;
    bottom: 0;
    font-size: 16px;
    line-height: normal;
    width: 100%;
    background-color: transparent;
    padding: 0 8px;
    box-sizing: border-box;
  }
  .__cov-check-btn {
    float: right;
    margin: 5px 0;
  }
  @media (max-width: 960px) { 
  .__cov-check {
    width: 100%;
  }
  .__cov-check-item {
    width: 100%;
  }
}
</style>
