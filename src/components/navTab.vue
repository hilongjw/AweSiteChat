<template>
    <a 
      class="__cov-ripple-effect __cov-admin-nav-tab"
      @click="reppleClick"  
      :class="{'active': state.active}"
    >
      <slot></slot>
      <span class="__cov-ripple" :class="{'animate': repple.animate}"></span>
    </a>
</template>

<script>
export default {
  props: {
    'state': {
      type: Object,
      default: function () {
        return {
          active: false
        }
      }
    }
  },
  data () {
    return {
      repple: {
        animate: false,
        toggle: false
      }
    }
  },
  methods: {
    reppleClick (e) {
      this.repple.animate = true
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
          this.repple.animate = false
        }, 660)
      })
    }
  }
}
</script>

<style>
.__cov-admin-nav-tab {
  margin: 0;
  border: none;
  padding: 0 24px;
  float: left;
  position: relative;
  display: block;
  -webkit-flex-grow: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  text-decoration: none;
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  color: rgba(255,255,255,.6);
  overflow: hidden;
}
.__cov-admin-nav-tab.active{
  border-bottom: 3px solid #fff;
  box-sizing: border-box;
  color: #fff;
}
.__cov-ripple-effect {
  position: relative;
  display: inline-block;
  overflow: hidden;
  will-change: box-shadow,transform;
  -webkit-transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  outline: none;
  cursor: pointer;
}
.__cov-ripple {
  display: block; 
  position: absolute;
  background: hsla(0, 0%, 100%, 0.66);
  border-radius: 100%;
  transform: scale(0);
}
.__cov-ripple.animate {
  animation: ripple 0.65s linear;
}

@keyframes ripple {
  100% {opacity: 0; transform: scale(2.5);}
}
</style>
