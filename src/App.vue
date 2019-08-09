<template>
  <Layout style="height: 100vh">
    <Sider collapsible :collapsed-width="78" default-collapsed v-model="isCollapsed" v-if="visible">
      <Menu theme="dark" width="auto" :class="menuitemClasses">
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
    <Verify @success="onVerifySuccess" @fail="onVerifyFail" />
    <router-view />
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import Verify from '@/components/Verify.vue';
import { VerifyReturn } from './types/verify';

@Component({ components: { Verify } })
export default class App extends Vue {
  private isCollapsed = false;
  private visible = true;

  private get menuitemClasses() {
    return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
  }

  private onVerifySuccess(data: VerifyReturn) {
    sessionStorage.setItem('name', data.name);

    this.$router.push(data.to);
  }

  private onVerifyFail(msg: string) {
    this.visible = false;
    this.$Notice.error({
      title: '错误',
      desc: msg,
    });
    this.$router.replace('/');
  }
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
</style>
