<template>
  <Layout>
    <Header>
      <Input search placeholder="输入搜索关键字" @on-search="search">
        <template #prepend>
          <Select v-model="bywhat" style="text-align: left; width: 100px;">
            <Option value="all">全部匹配</Option>
            <Option value="serv_id">按serv_id</Option>
            <Option value="acct_id">按acct_id</Option>
            <Option value="imsi">按IMSI</Option>
            <Option value="acc_nbr">按号码</Option>
            <Option value="acc_num">按bss号码</Option>
          </Select>
        </template>
      </Input>
    </Header>
    <Content>
      <template v-for="(item, k) in sections">
        <div :is="item.tag" :key="k" v-bind="item.props" v-on="item.events" @new="onNewItem">{{ item.text }}</div>
      </template>

      <template v-for="(menu, i) of $store.state.billquery.menus">
        <Dropdown
          :key="i"
          transfer
          placement="right-start"
          :style="{ position: 'absolute', ...getMenuState($store.state.billquery.states[i]) }"
          @on-click="p($event, { [i]: $store.state.billquery.states[i].value })"
        >
          <Icon type="ios-information-circle" color="#bbf" size="24" />
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
import { Section, MenuItemState } from '@/types/billQuery';
import { loadMenu } from '@/utils/billQuery';

@Component({
  components: { SqlResultTable },
})
export default class BillQuery extends Vue {
  private bywhat = 'all';

  private sections: Array<Section> = [];

  private getMenuState(state: MenuItemState) {
    return {
      visibility: state.visibility ? '' : 'hidden',
      left: state.left + 'px',
      top: state.top + 'px',
    };
  }

  private search(value: string) {
    this.sections = [
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

  private onNewItem(item: Section) {
    this.sections.push(item);
  }

  private p(name: string, value: object) {
    console.log(name, value);
  }

  private async created() {
    await loadMenu();
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
