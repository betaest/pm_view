<template>
  <Layout style="height: 100vh">
    <Sider collapsible :collapsed-width="78" default-collapsed v-model="isCollapsed" v-if="$store.state.verify.success">
      <Menu
        theme="dark"
        width="auto"
        :class="['menu-item', { 'collapsed-menu': this.isCollapsed }]"
        :active-name="$route.name"
      >
        <MenuItem name="proj" to="/ProjectManager">
          <Tooltip content="项目管理" placement="right">
            <Icon custom="iconfont icon-project"></Icon>
            <span>项目管理</span>
          </Tooltip>
        </MenuItem>
        <MenuItem name="bill" to="/BillQuery">
          <Tooltip content="计费工具集" placement="right">
            <Icon custom="iconfont icon-bill"></Icon>
            <span>工具集</span>
          </Tooltip>
        </MenuItem>
      </Menu>
    </Sider>
    <Spin fix v-if="$store.state.verify.loading">
      <Icon type="ios-loading" size="30" class="load-icon" />
      <div>正在验证身份，请等待</div>
    </Spin>
    <router-view />
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private isCollapsed = false;
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

.menu-item {
  span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }

  i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
    margin-right: 5px;
  }
}

.collapsed-menu {
  span {
    width: 0;
    transition: width 0.2s ease;
  }

  i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
}

.ivu-layout header {
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
}

.ivu-spin-fix {
  z-index: 9999 !important;
}

.load-icon {
  animation: ani-load-spin 1s linear infinite;
}

@keyframes ani-load-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
