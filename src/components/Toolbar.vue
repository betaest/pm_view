<template>
  <Menu mode="horizontal" theme="dark" active-name @on-select="$emit('select', $event)">
    <MenuItem name="1" v-if="showNewMenu">
      <Icon custom="iconfont icon-appstoreadd" />
      <span>新建</span>
    </MenuItem>
    <MenuItem name="2" style="width: 50%; margin-top: 15px;" v-if="showSearchBar">
      <Input search placeholder="输入搜索关键字" @on-search="$emit('search', $event)" enter-button />
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {
  @Prop({ type: Boolean, default: true })
  private readonly showNewMenu!: boolean;

  @Prop({ type: Boolean, default: true })
  private readonly showSearchBar!: boolean;
}
</script>

<style></style>
