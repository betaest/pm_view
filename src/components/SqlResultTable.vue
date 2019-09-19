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
      @on-row-click="rowClick"
    ></Table>
  </div>
</template>

<script lang="ts">
import { CreateElement } from 'vue';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { FlatResult, Row, FlatRow, Column, Title } from '@/types/billQuery';
import { execute } from '@/utils/billQuery';

@Component
export default class SqlResultTable extends Vue {
  private loading = true;
  private result: FlatResult = {
    total: 0,
    title: [],
    header: [],
    body: [],
  };

  private getName(row: FlatRow, index: number) {
    const body = this.result.body;
    return (row._parent === -1 || body[row._parent]._status) && row._status ? '' : 'invisible-row';
  }

  private rowClick(row: FlatRow, index: number) {
    if (row.children) {
      for (let i = 1; i < row._children + 1; ++i)
        this.result.body[index + i]._status = !this.result.body[index + i]._status;
    }
  }

  private flattern(
    body: Array<Row>,
    footer?: Row,
    indexer: number = 0,
    visibile: boolean = true,
    parent: number = -1
  ): Array<FlatRow> {
    if (!body) return [];

    const rs: Array<FlatRow> = [];

    for (const row of body) {
      rs.push({
        ...row,
        _parent: parent,
        _children: row.children ? row.children.length : 0,
        _child_index: indexer,
        _status: visibile,
      });

      if (row.children) rs.push(...this.flattern(row.children, undefined, indexer + 1, false, parent + rs.length));
    }

    return rs;
  }

  private parse(header: Array<Column>, hasChildren: boolean): Array<Column> {
    if (header && header.length > 0 && hasChildren) {
      let render = header[0].render;

      if (typeof render === 'string') render = new Function('h', 'params', render);

      header[0].render = (h: CreateElement, params: { row: FlatRow; column: Column; index: number }) => {
        const body = this.result.body;
        return h('div', [
          h('Icon', {
            props: {
              type:
                params.row._children !== 0
                  ? body[params.row._children + params.index]._status
                    ? 'md-arrow-dropdown'
                    : 'md-arrow-dropright'
                  : '',
              size: 24,
            },
            class: `indent indent-${params.row._child_index}`,
          }),
          render && typeof render === 'function' ? render(h, params) : h('span', params.row[params.column.key]),
        ]);
      };
    }

    return header;
  }

  private async created() {
    const rs = await execute();

    this.result = {
      total: rs.total,
      title: rs.title,
      header: this.parse(rs.header, rs.body.some(b => typeof b.children !== 'undefined' && b.children.length > 0)),
      body: this.flattern(rs.body, rs.footer, 0),
    };

    this.loading = false;
  }
}
</script>
<style lang="scss">
.indent {
  margin-right: 10px;
}

@for $index from 0 to 10 {
  .indent-#{$index} {
    margin-left: 20px * $index;
  }

  .invisible-row {
    display: none;
  }
}
</style>