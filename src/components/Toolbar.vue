<template>
  <Menu
    mode="horizontal"
    theme="dark"
    :selectable="false"
    @click="$emit('click', $event)"
  >
    <MenuItem name="1">
      <Icon custom="iconfont icon-folder-add-outline" />
      <span>新建</span>
    </MenuItem>
    <Menu-item name="2" style="width: 50%;">
      <Input search placeholder="输入搜索关键字" @search="$emit('search', $event)" enter-button />
    </Menu-item>
  </Menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {}
</script>

<style>
</style>
