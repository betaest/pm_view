<template>
  <Layout>
    <Header>
      <Input search placeholder="输入搜索关键字" @on-search="search">
        <template #prepend>
          <Select v-model="bywhat" style="text-align: left; width: 100px;">
            <Option value="guess">全部匹配</Option>
            <Option value="byserv">按serv_id</Option>
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
  private bywhat = 'guess';

  private components: Array<DynamicComponent> = [];

  private search(value: string) {
    console.log(this.bywhat, value);

    this.components = [
      {
        tag: 'sql-result-table',
        props: {
          searchby: this.bywhat,
          value: {
            [this.bywhat]: value
          },
        },
        on: {},
      },
    ];
  }

  private onNewItem(item: DynamicComponent, v: string) {
    this.components.push(item);
    console.log(v);
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
