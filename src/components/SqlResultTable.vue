<template>
  <div>
    <Table
      :columns="column"
      :data="result"
      stripe
      border
      size="large"
      style="margin-top: 20px"
      @on-row-click="$emit('new', { tag: 'sql-result-table' })"
    ></Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class SqlResultTable extends Vue {
  private get column() {
    return [
      {
        title: 'Value',
        key: 'id',
      },
      {
        title: 'Search By',
        key: 'exp',
      },
    ];
  }

  private get result() {
    return [
      {
        id: 10,
        exp: 'Hello, world' + new Date(),
      },
      {
        id: this.Value,
        exp: '',
      },
    ];
  }

  @Prop(Object)
  private readonly value!: any;

  private get Value() {
    return JSON.stringify(this.value);
  }
}
</script>
