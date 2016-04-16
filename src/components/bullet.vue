<template>
  <div 
    class="__cov-item"
    :style="item.position"
    :class="{'__cov-flying': item.flying}"
  >
  <img class="__cov-item-avatar" v-if="item.avatar" :src="item.avatar">
  {{item.nickname + ': ' + item.word}}</div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>
.__cov-item {
  position: fixed;
  right: 0;
  top: 0;
  color: rgb(113, 113, 113);
  font-family: 'Heiti SC','Lantinghei SC','Microsoft Yahei',arial;
  background: #fff;
  line-height: 32px;
  height: 32px;
  padding: 0 .8em;
  font-size: .9em;
  will-change: transform;
  border-radius: 3rem;
  transform: translateX(200%);
  -webkit-transform: translateX(200%);
  -webkit-transition: cubic-bezier(.25, .5, .5, .25) transform 6s;
  transition: cubic-bezier(.25, .5, .5, .25) transform 6s;
}
.__cov-item-avatar {
  position: absolute;
  top: -4px;
  left: -52px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.__cov-flying {
  transform: translateX(-500px);
  -webkit-transform: translateX(-500px);
  transform: translateX(-100vw);
  -webkit-transform: translateX(-100vw);
}

@media (max-width: 500px) { 
  .flying {
    transform: translateX(-500px);
    -webkit-transform: translateX(-500px);
    transform: translateX(-100vw);
    -webkit-transform: translateX(-100vw);
  }
}
@media (max-width: 1000px) { 
  .flying {
    transform: translateX(-1000px);
    -webkit-transform: translateX(-1000px);
    transform: translateX(-100vw);
    -webkit-transform: translateX(-100vw);
  }
}
@media (max-width: 1600px) { 
  .flying {
    transform: translateX(-1600px);
    -webkit-transform: translateX(-1600px);
    transform: translateX(-100vw);
    -webkit-transform: translateX(-100vw);
  }
}
</style>
