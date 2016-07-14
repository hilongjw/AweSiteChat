<template>
  <div 
    class="__cov-item"
    :style="item.position"
    :class="{'__cov-flying': item.flying}"
  >
  <img class="__cov-item-avatar" v-if="item.avatar" :src="item.avatar">
  <span class="__cov-item-username">
    {{item.nickname}}
  </span>
  {{item.word}}
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>
.__cov-item {
  position: fixed;
  right: -100px;
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
  transform: translateX(250%);
  -webkit-transform: translateX(250%);
  -webkit-transition: cubic-bezier(.25, .5, .5, .25) transform 7s;
  transition: cubic-bezier(.25, .5, .5, .25) transform 7s;
}
.__cov-item-avatar {
  position: absolute;
  top: -4px;
  left: -52px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.__cov-item-username {
  color: #00BBD6;
}
.__cov-flying {
  transform: translateX(-1200px);
  -webkit-transform: translateX(-1200px);
  transform: translateX(-130vw);
  -webkit-transform: translateX(-130vw);
}

@media (max-width: 500px) { 
  .flying {
    transform: translateX(-600px);
    -webkit-transform: translateX(-600px);
    transform: translateX(-150vw);
    -webkit-transform: translateX(-150vw);
  }
}
@media (max-width: 1000px) { 
  .flying {
    transform: translateX(-1100px);
    -webkit-transform: translateX(-1100px);
    transform: translateX(-120vw);
    -webkit-transform: translateX(-120vw);
  }
  .__cov-item {
    -webkit-transition: cubic-bezier(.25, .5, .5, .25) transform 5s;
    transition: cubic-bezier(.25, .5, .5, .25) transform 5s;
  }
}
@media (max-width: 1600px) {
  .flying {
    transform: translateX(-1700px);
    -webkit-transform: translateX(-1700px);
    transform: translateX(-110vw);
    -webkit-transform: translateX(-110vw);
  }
}
</style>
