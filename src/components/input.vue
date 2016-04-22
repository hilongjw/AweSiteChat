<template>
  <div class="__cov-input-box">
    <textfield class="__cov-input" :textfield="input" @keyup.13="submit"></textfield>
    <cov-button class="__cov-send-btn" @click="sendAction" :state="state">{{state.disable ? 'CANCEL':'SEND'}}</cov-button>
  </div>
</template>

<script>
import covButton from './button.vue'
import textfield from './textfield.vue'
export default {
  props: ['input', 'submit', 'show-input'],
  computed: {
    state () {
      if (this.input.value === '') {
        return {
          disable: true,
          color: 'common'
        }
      } else {
        return {
          disable: false,
          color: 'blue'
        }
      }
    }
  },
  components: {
    covButton,
    textfield
  },
  methods: {
    sendAction () {
      if (this.input.value) {
        this.submit()
      } else {
        this.showInput()
      }
    }
  }
}
</script>

<style>
.__cov-input {
  display: inline-block;
}
.__cov-input-box {
  position: fixed;
  bottom: 13px;
  right: 20px;
  background: #fff;
  padding: 0 20px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
}
@media (max-width: 960px) { 
  .__cov-input-box {
    bottom: 0;
    width: 100%;
    right: 0;
    padding: 0 100px 0 10px;
    box-sizing: border-box;
  }
  .__cov-send-btn {
    position: absolute;
    right: 5px;
    bottom: 5px;
    min-width: 50px;
  }
  .__cov-input {
    width: 100%;
    padding-bottom: 0px!important;
  }
  .__cov-check {
    width: 100%;
  }
}
</style>
