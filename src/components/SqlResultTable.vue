<template>
  <Table :columns="column" :data="data" stripe border size="large" style="margin-top: 20px"></Table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SqlResultTable extends Vue {
  private column = [
    {
      title: 'Hello',
      key: 'id',
    },
    {
      title: 'expression',
      key: 'exp',
    },
  ];

  private data = [
    {
      id: 10,
      exp: 'Hello, world',
    },
    {
      id: 20,
      exp: 'list files',
    },
  ];

  @Prop(String)
  private readonly add!: string;
}
</script>
