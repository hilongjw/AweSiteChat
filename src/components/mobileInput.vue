<style>
.cov-chat-input-container {
    position: fixed;
    display: flex;
    background: #efefef;
    height: 3rem;
    position: fixed;
    bottom: 0;
    width: 20rem;
    right: 0;
}
.cov-chat-send {
    width: 5rem;
    text-align: center;
    flex-shrink: 0;
}
.cov-chat-send-btn {
    color: #fff;
    background: #26b8f2;
    border: none;
    height: 2rem;
    width: 4rem;
    margin-top: .5rem;
    border-radius: .4rem;
}
.cov-chat-input {
    width: 100%;
    padding: 0 0 0 .5rem;
}
.cov-chat-inputing {
    width: 100%;
    height: 2rem;
    border: none;
    border-radius: .5rem;
    margin-top: .5rem;
    outline: none;
    font-size: 1rem;
    line-height: 2rem;
    padding: 0 .5rem;
    box-sizing: border-box;
}
@media (max-width: 800px) {
  .cov-chat-input-container {
    width: 100%;
  }
}
</style>

<template>
  <div class="cov-chat-input-container">
    <div class="cov-chat-input">
      <input type="text" class="cov-chat-inputing" v-model="input">
    </div>
    <div class="cov-chat-send">
      <button class="cov-chat-send-btn" @click="send">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sendAction: Function
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    send () {
      this.sendAction(this.input)
      this.input = ''
    }
  }
}
</script>