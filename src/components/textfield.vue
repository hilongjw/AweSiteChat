<template>
  <div class="cov-textfield" :class="{active: (active || textfield.value), 'has-value': hasValue}">
    <input
      class="cov-textfield-text"
      type="text"
      v-model="textfield.value"
      @focus='inputFocus'
      @blur='inputblur'
      >
    <label class="cov-textfield-label">{{textfield.placeholder}}</label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false,
      hasValue: false
    }
  },
  props: ['textfield'],
  methods: {
    inputFocus (e) {
      this.hasValue = false
      this.active = true
    },
    inputblur (e) {
      this.hasValue = this.textfield.value !== ''
      this.active = false
    }
  }
}
</script>

<style>
.cov-textfield {
  position: fixed;
  bottom: 130px;
  right: 10px;
  padding: 20px 0;
  font-family: 'Roboto','Helvetica', "Microsoft YaHei", 'Arial', sans-serif;
}
.cov-textfield-text {
  border: none;
  border-bottom: 1px solid rgba(0,0,0,.12);
  display: block;
  font-size: 16px;
  margin: 0;
  padding: 4px 0;
  width: 100%;
  background: 0 0;
  text-align: left;
  color: inherit;
  outline: none;
}
.cov-textfield-label {
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
.cov-textfield-label::after{
  content: '';
  background-color: #3f51b5;
  top: 20px;
  height: 2px;
  left: 45%;
  position: absolute;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  visibility: hidden;
  width: 10px;
}
.active .cov-textfield-label {
  top: 4px;
  color: #3f51b5;
  font-size: 12px;
}
.active.has-value .cov-textfield-label::after {
  visibility: hidden;
  width: 10px;
  left: 45%;
}
.active .cov-textfield-label::after {
  visibility: visible;
  left: 0%;
  width: 100%;
  top: 40px;
}
</style>
