<template>
  <div class="center">
    <img src="../assets/logo.png" />
    <h1>欢迎来到计费工具</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.center {
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 300px;
  text-align: center;
}
</style>
