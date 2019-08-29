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
          v-on="item.on"
          @new="onNewItem"
        >{{ item.text }}</div>
      </template>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SqlResultTable from '@/components/SqlResultTable.vue';
import { DynamicComponent } from '@/types/billQuery';

@Component({
  components: { SqlResultTable },
})
export default class BillQuery extends Vue {
  private bywhat = 'all';

  private components: Array<DynamicComponent> = [];

  private search(value: string) {
    this.components = [
      {
        tag: 'sql-result-table',
        props: {
          value: {
            type: this.bywhat,
            query: value,
            action: 'query'
          },
        },
        on: {},
      },
    ];
  }

  private onNewItem(item: DynamicComponent) {
    this.components.push(item);
  }
}
</script>

<style lang="scss">
.ivu-layout header {
  .ivu-input-wrapper {
    margin: 15px;
    width: 50%;
  }
}
</style>
