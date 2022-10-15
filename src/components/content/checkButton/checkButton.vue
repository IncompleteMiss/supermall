<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="选中">
  </div>
</template>

<script>
  export default {
    name: "checkButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    background-color: #aaa;
    border-radius: 50%;
    border: 2px solid #aaa;
    height: 20px;
    line-height: 20px;
    align-items: center;
  }

  .check {
    border-color: red;
    background-color: red;
  }
</style>
