<template>
  <button @click="reppleClick"  class="__cov-button-ripple" :class="{active: repple_button.toggle, '__cov-button-disable': state.disable, '__cov-button-blue': state.color === 'blue'}">
    <slot></slot>
    <span class="__cov-ripple" :class="{'animate': repple_button.animate}"></span>
  </button>
</template>

<script>
export default {
  props: {
    'state': {
      type: Object,
      default: function () {
        return {
          disable: false,
          color: 'common'
        }
      }
    }
  },
  data () {
    return {
      repple_button: {
        animate: false,
        toggle: false
      }
    }
  },
  methods: {
    reppleClick (e) {
      this.repple_button.animate = true
      let button = e.target
      let ripple = button.querySelector('.__cov-ripple')
      if (ripple) {
        let d = Math.max(button.offsetHeight, button.offsetWidth)
        let x = e.layerX - ripple.offsetWidth / 2
        let y = e.layerY - ripple.offsetHeight / 2
        ripple.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;')
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.repple_button.animate = false
        }, 660)
      })
    }
  }
}
</script>

<style>
.__cov-button-ripple {
  background: transparent;
  border: none;
  border-radius: 2px;
  position: relative;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  display: inline-block;
  font-family: Roboto,Helvetica,Arial,sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow,transform;
  -webkit-transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle;
  min-width: 96px;
}
.__cov-ripple {
  display: block; 
  position: absolute;
  background: hsla(0, 0%, 65%, 0.66);
  border-radius: 100%;
  transform: scale(0);
}
.__cov-ripple.animate {
  animation: ripple 0.65s linear;
}

@keyframes ripple {
  100% {opacity: 0; transform: scale(2.5);}
}
.__cov-button-disable {
  background-color: #dcdcdc;
  color: rgba(0,0,0,.26);
}
.__cov-button-common {
  color: #000;
}
.__cov-button-common:hover {
  background-color: hsla(0,0%,62%,.2);
}
.__cov-button-blue:hover {
  background-color: #1ADEFA;
}
.__cov-button-blue {
  background-color: #00BBD6;
  color: #fff;
}
</style>
