<template>
  <div style="margin: 20px">
    <div style="font-weight: bolder">
      <template v-for="(title, t) of result.title">
        <div :is="title.tag" :key="t" v-bind="title.props" v-on="title.events">{{ title.text }}</div>
      </template>
    </div>
    <Table
      :columns="result.header"
      :data="result.body"
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
import { CreateElement } from 'vue';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { FlatResult, Row, FlatRow, Column } from '@/types/billQuery';
import { execute } from '@/utils/billQuery';

@Component
export default class SqlResultTable extends Vue {
  private loading = false;

  private getName(row: Record<string, any>, index: number) {
    console.log(row, index);
    return 'normal';
  }

  private flattern({ body, footer }: { body: Array<Row>; footer?: Row }): Array<FlatRow> {
    return [];
  }

  private parse(header: Array<Column>, hasChildren: boolean): Array<Column> {
    if (header && header.length > 0 && hasChildren) {
      var render = header[0].render;

      if (typeof render === 'string') render = new Function('h', 'params', render);

      header[0].render = (h: CreateElement, params: { row: FlatRow; column: Column }) => {
        h('div', [
          h('Icon', {
            props: {
              type: 'ios-arrow-forward',
              class: `indent indent-${params.row._child_index}`,
            },
          }),
          render && typeof render === 'function' ? render(h, params) : h('span', params.row[params.column.key]),
        ]);
      };
    }
    return header;
  }

  private async execute(): Promise<FlatResult> {
    const rs = await execute();

    return {
      total: rs.total,
      title: rs.title,
      header: this.parse(rs.header, rs.body.some(b => typeof b.children !== 'undefined' && b.children.length > 0)),
      body: this.flattern({ body: rs.body, footer: rs.footer }),
    };
  }

  @Prop(Object)
  private readonly value!: any;

  private get Value() {
    return JSON.stringify(this.value);
  }
}
</script>
<style lang="scss" scoped>
.indent {
  margin-right: 10px;

  @for $index from 0 to 10 {
    .indent-#{$index} {
      margin-left: 10px * $index;
    }
  }
}
</style>