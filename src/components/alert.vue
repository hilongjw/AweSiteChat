<template>
  <div id="__covAlert" transition="alert" v-show="Alert.show">{{Alert.message}}</div>
</template>

<script>
export default {
  props: ['Alert']
}
</script>

<style>
#__covAlert {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  background: #2E2E2E;
  padding: 15px;
  border-radius: 2px;
  color: #fff;
  text-align: center;
  z-index: 999;
  max-width: 200px;
}
.alert-transition {
  transform: translateY(0); /* 否则 scale 动画不起作用 */
}
.alert-enter {
  animation: alert-in .5s;
}
.alert-leave {
  animation: alert-out .5s;
}
@keyframes alert-in {
  0% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes alert-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
}

</style>
