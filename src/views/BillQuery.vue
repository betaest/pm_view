<template>
  <Layout>
    <Header>
      <Input search placeholder="输入搜索关键字" @on-search="search">
        <template #prepend>
          <Select v-model="bywhat" style="text-align: left; width: 100px;">
            <Option value="all">全部匹配</Option>
            <Option value="byserv">按serv_id</Option>
            <Option value="byacct">按acct_id</Option>
            <Option value="byimsi">按IMSI</Option>
            <Option value="byaccnbr">按号码</Option>
            <Option value="bynum">按bss号码</Option>
          </Select>
        </template>
      </Input>
    </Header>
    <Content>
      <template v-for="(item, k) in components">
        <div
          :is="item.tag"
          :key="k"
          v-bind="item.props"
          v-on="item.events"
          @new="onNewItem"
        >{{ item.text }}</div>
      </template>

      <template v-for="(menu, i) of $store.state.billquery.menus">
        <Dropdown
          :key="i"
          transfer
          placement="right-start"
          :style="{
            position: 'absolute',
            visibility: $store.state.billquery.states[i].visibility ? '' : 'hidden',
            left: $store.state.billquery.states[i].left,
            top: $store.state.billquery.states[i].top,
          }"
          @on-click="p"
        >
          <Icon custom="iconfont icon-dash" />
          <DropdownMenu slot="list">
            <template v-for="(item, mi) of menu">
              <DropdownItem :name="item.action" :key="mi" :divided="item.divided">{{ item.title }}</DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
      </template>
    </Content>
  </Layout>
</template>

<script lang="ts">
import SqlResultTable from '@/components/SqlResultTable.vue';

import { Vue, Component, Prop } from 'vue-property-decorator';
import { Title, MenuItem, MenuItemState } from '@/types/billQuery';
import { loadMenu } from '@/utils/billQuery';

@Component({
  components: { SqlResultTable },
})
export default class BillQuery extends Vue {
  private bywhat = 'all';

  private components: Array<Title> = [];

  private demoMenu: Record<string, Array<MenuItem>> = {
    serv_id: [
      {
        title: '查询用户资料',
        action: 0,
      },
      {
        title: '查询用户缴费信息',
        action: 1,
      },
    ],
    world: [
      {
        title: '查询用户资料',
        action: 0,
      },
      {
        title: '查询用户缴费信息',
        action: 1,
        divided: true,
      },
    ],
  };

  private search(value: string) {
    this.components = [
      {
        tag: 'sql-result-table',
        props: {
          value: {
            type: this.bywhat,
            query: value,
            action: 'query',
          },
        },
      },
    ];
  }

  private onNewItem(item: Title) {
    this.components.push(item);
  }

  private p(name: string) {
    console.log(name);
  }

  private async created() {
    this.$store.commit('billquery/init', { menus: this.demoMenu });
    // await loadMenu();
  }
}
</script>

<style lang="scss" scoped>
.ivu-layout header {
  .ivu-input-wrapper {
    margin: 15px;
    width: 50%;
  }
}
</style>
