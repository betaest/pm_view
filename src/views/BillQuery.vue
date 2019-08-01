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
      <div id="root"></div>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SqlResultTable from '@/components/SqlResultTable.vue';
import renderComponent from '@/utils/renderComponent';

@Component({
  components: { SqlResultTable },
})
export default class BillQuery extends Vue {
  private search(what: string) {
    renderComponent('#root', h => h(SqlResultTable));
  }
}
</script>

<style lang="scss" scoped>
.ivu-layout header {
  background-color: #24292E;

  .ivu-input-wrapper {
    margin: 15px;
    width: 50%;
  }
}
</style>
