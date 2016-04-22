<template>
  <button 
    @click="reppleClick"
    id="__covAdd" 
    class="want-btn" 
    :class="{active: repple_button.toggle}"
    transition="fab"
  >
    <span class="__covAdd__text">+</span>
    <span class="ink" :class="{'animate': repple_button.animate}"></span>
  </button>
</template>

<script>
export default {
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
      let ink = button.querySelector('.ink')
      if (ink) {
        let d = Math.max(button.offsetHeight, button.offsetWidth)
        let x = e.layerX - ink.offsetWidth / 2
        let y = e.layerY - ink.offsetHeight / 2
        ink.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;')
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
#__covAdd {
  position: fixed;
  bottom: 20px;
  right: 20px;
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
.__covAdd__text {
  transform: rotate(0deg);
  transition: transform .2s;
}
.active .__covAdd__text {
  display: inline-block;
  transform: rotate(45deg);
}
.fab-transition {
  transform: translateX(0);
}
.fab-enter {
  animation: fab-in .5s;
}
.fab-leave {
  animation: fab-out .5s;
}
@keyframes fab-in {
  0% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes fab-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(90px);
  }
}
</style>
