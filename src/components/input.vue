<template>
  <div id="__covInput">
    <input 
      type="text" 
      name="say" 
      id="__covInputText"
      v-model="input.say" 
      @keyup.13="submit"
      @focus='inputFocus'
      @blur='inputblur'
      >
    <label id="__covInputText__label" for="__covInputText">好尴尬，快说点什么！Enter 提交</label>
  </div>
</template>

<script>
export default {
  props: ['input', 'submit'],
  methods: {
    inputFocus (e) {
      e.target.parentNode.setAttribute('class', 'active')
    },
    inputblur (e) {
      e.target.parentNode.setAttribute('class', '')
    }
  }
}
</script>

<style>
#__covInput {
  position: fixed;
  bottom: 20px;
  right: 120px;
  width: 300px;
  padding: 20px 0;
}
#__covInputText {
  border: none;
  border-bottom: 1px solid rgba(0,0,0,.12);
  display: block;
  font-size: 16px;
  font-family: "Helvetica","Arial",sans-serif;
  margin: 0;
  padding: 4px 0;
  width: 100%;
  background: 0 0;
  text-align: left;
  color: inherit;
  outline: none;
}
#__covInputText__label {
  bottom: 0;
  color: rgba(0,0,0,.26);
  font-size: 16px;
  left: 0;
  right: 0;
  pointer-events: none;
  position: absolute;
  display: block;
  top: 24px;
  width: 100%;
  overflow: visible;
  white-space: nowrap;
  text-align: left;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
}
#__covInputText__label::after{
  content: '';
  background-color: #3f51b5;
  bottom: 20px;
  height: 2px;
  left: 45%;
  position: absolute;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  visibility: hidden;
  width: 10px;
}
.active #__covInputText__label {
  top: 4px;
  color: #3f51b5;
  font-size: 12px;
}
.active #__covInputText__label::after {
  visibility: visible;
  left: 0%;
  width: 100%;
}
@media (max-width: 960px) { 
  #__covInput {
    width: 100%;
    left: 0;
    bottom: -20px;
    background-color: #fff;
    padding-top: 0;
  }
  #__covInputText {
    padding: 10px;
  }
  #__covInputText__label {
    top: 8px;
    left: 5px;
  }
  .active #__covInputText__label{
    top: -14px;
  }
}
</style>
