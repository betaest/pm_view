<template>
  <Layout>
    <Header>
      <Input search placeholder="输入搜索关键字" @on-search="search">
        <template #prepend>
          <span>万能匹配：</span>
        </template>
      </Input>
    </Header>
    <Content>
      <Button @click="clickButton"></Button>
      <template v-for="item in components">
        <div :is="item" :add="test"></div>
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
  private test = 'Hello, world';

  private components: string[] = [];

  private search(what: string) {
    this.components.push('sql-result-table');
  }

  private clickButton() {
    this.test = this.test.toUpperCase();
  }
}
</script>

<style lang="scss">
.ivu-layout header {
  // background-color: #24292e;

  .ivu-input-wrapper {
    margin: 15px;
    width: 50%;
  }
}
</style>
