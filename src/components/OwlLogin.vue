<template>
  <div class="owl-login" :class="password?'password':''">
    <div class="eyes"></div>
    <div class="arm-up-right"></div>
    <div class="arm-up-left"></div>
    <div class="arm-down-left"></div>
    <div class="arm-down-right"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  password: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  password: true,
});
</script>

<style lang="sass" scoped>
.owl-login, .owl-login > div
  position: absolute
  background-size: 100% 100%
  background-repeat: no-repeat
.owl-login
  top: -82px
  left: 50%
  width: 116px
  height: 92px
  margin-left: -64px
  background-image: url("../assets/img/face.png")
  .eyes
    width: 100%
    height: 100%
    background-image: url("../assets/img/eyes.png")
    opacity: 0
    transition: .1s ease-out 0s
  .arm-down-left
    bottom: 2px
    left: -34px
    width: 43px
    height: 25px
    background-image: url("../assets/img/arm-down-left.png")
    transition: .3s ease-out
  .arm-down-right
    bottom: 1px
    right: -40px
    width: 43px
    height: 26px
    background-image: url("../assets/img/arm-down-right.png")
    transition: .3s ease-out
  .arm-up-left, .arm-up-right
    bottom: 11px
    width: 51px
    height: 41px
    background-position: 0 25px
    transform-origin: 0 40px
    transition: background-position .3s ease-out,transform .3s ease-out,opacity 0s linear .3s
    opacity: 0
  .arm-up-left
    left: -3px
    background-image: url("../assets/img/arm-up-left.png")
    transform: translateX(-34px) scale(.8)
  .arm-up-right
    right: 5px
    background-image: url("../assets/img/arm-up-right.png")
    transform: translateX(57px) scale(.8)
  &.password
    .eyes
      opacity: 1
      transition: .1s ease-out .2s
    .arm-down-left
      transform: translateX(40px) scale(0) translateY(-10px)
      opacity: 0
    .arm-down-right
      transform: translateX(-32px) scale(0) translateY(-8px)
      opacity: 0
    .arm-up-left, .arm-up-right
      background-position: 0 0
      transform: scale(1)
      opacity: 1
      transition: background-position .3s ease-out,transform .3s ease-out
</style>