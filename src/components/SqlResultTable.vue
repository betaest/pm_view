<template>
  <div style="margin: 20px">
    <div style="font-weight: bolder">
      <template v-for="(title, t) of result.title">
        <div :is="title.tag" :key="t" v-bind="title.props" v-on="title.events">{{ title.text }}</div>
      </template>
    </div>
    <Table
      :columns="result.header"
      :data="flattern(result.body)"
      :height="250"
      stripe
      size="small"
      :loading="loading"
      :row-class-name="getName"
      @on-row-click="$emit('new', { tag: 'sql-result-table' })"
    ></Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Result, Value, Title, Row } from '@/types/billQuery';

@Component
export default class SqlResultTable extends Vue {
  private loading = false;

  private flattern(rows: Array<Row>): Array<Row & { _children: number[]; _child_level: number }> {
    return [{ _child_level: 0, _children: [], ...rows[0] }];
  }

  private getName(row: Record<string, any>, index: number) {
    console.log(row, index);
    return 'normal';
  }

  private get result(): Result {
    const title: Array<Title> = [];
    const body = [];

    for (let i = 0; i < Math.round(Math.random() * 3); ++i)
      title.push({
        tag: 'span',
        text: `${new Date()} -- ${Math.round(Math.random() * 3)}`,
        props: {
          style: 'font-style: italic'
        },
      });

    for (let i = 0; i < Math.round(Math.random() * 100); ++i)
      body.push({
        serv_id: i,
        world: Math.round(Math.random() * 100),
        children: {
          serv_id: i + 10,
          world: Math.round(Math.random() * 100),
        },
      });

    return {
      total: body.length,
      title,
      header: [
        // { key: 'index', title: '#', type: 'index', width: 50, fixed: true },
        // { key: 'expand', title: '', width: 50 },
        {
          key: 'serv_id',
          title: 'serv_id',
        },
        {
          key: 'world',
          title: '世界',
        },
      ],
      body,
    };
  }

  @Prop(Object)
  private readonly value!: any;

  private get Value() {
    return JSON.stringify(this.value);
  }
}
</script>
