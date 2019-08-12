<template>
  <Layout>
    <Header>
      <Input search placeholder="输入搜索关键字" @on-search="search">
        <template #prepend>
          <Select v-model="bywhat" style="text-align: left; width: 80px;">
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
        <div :is="item" :key="k"></div>
      </template>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SqlResultTable from '@/components/SqlResultTable.vue';

@Component({
  components: { SqlResultTable },
})
export default class BillQuery extends Vue {
  private bywhat = 'guess';

  private components: string[] = [];

  private search(what: string) {
    this.components.push('sql-result-table');
  }

  private clickButton() {}
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
