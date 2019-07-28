<template>
  <Layout>
    <Header>
      <Toolbar @search="search" :show-new-menu="false" />
    </Header>
    <Content>
      <div id="root"></div>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';
import SqlResultTable from '@/components/SqlResultTable.vue';
import renderComponent from '@/utils/renderComponent';

@Component({
  components: { Toolbar, SqlResultTable },
})
export default class BillQuery extends Vue {
  private search(what: string) {
    renderComponent('#root', h => h(SqlResultTable));
  }
}
</script>
