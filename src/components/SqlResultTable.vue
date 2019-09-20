<template>
  <div style="margin: 20px">
    <div style="font-weight: bolder">
      <template v-for="(title, t) of title">
        <div :is="title.tag" :key="t" v-bind="title.props" v-on="title.events">{{ title.text }}</div>
      </template>
    </div>
    <Table
      :columns="header"
      :data="body"
      :height="250"
      stripe
      size="small"
      :loading="loading"
      :row-class-name="rowClass"
      @on-row-click="rowClick"
      @mouseover.native.stop="enter"
    ></Table>
  </div>
</template>

<script lang="ts">
import { CreateElement, VNodeChildren } from 'vue';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Row, FlatRow, Column, Title } from '@/types/billQuery';
import { execute } from '@/utils/billQuery';

@Component
export default class SqlResultTable extends Vue {
  private loading = true;
  private total = 0;
  private title: Array<Title> = [];
  private header: Array<Column> = [];
  private body: Array<FlatRow> = [];
  private showTooltip: boolean = true;

  private rowClass(row: FlatRow, index: number) {
    return (row._parent === -1 || this.body[row._parent]._status) && row._status ? '' : 'invisible-row';
  }

  private rowClick(row: FlatRow, index: number) {
    if (row.children)
      for (let i = 1; i < row._children + 1; ++i) this.body[index + i]._status = !this.body[index + i]._status;
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
    for (const h of header) {
      h.tooltip = true;
      h.className = `key-${h.key}`;

      if (typeof h.render === 'string') h.render = new Function('h', 'params', h.render);
    }

    if (header && header.length > 0 && hasChildren) {
      let render = header[0].render;

      header[0].className = `has-child ${header[0].className}`;

      header[0].render = (h: CreateElement, params: { row: FlatRow; column: Column; index: number }) => {
        return render && typeof render === 'function'
          ? render(h, params)
          : h(
              'Tooltip',
              {
                props: {
                  content: params.row[params.column.key],
                  transfer: true,
                  maxWidth: 300,
                },
                class: 'ivu-table-cell-tooltip',
              },
              [
                h(
                  'div',
                  {
                    class: 'ivu-table-cell-tooltip-content',
                  },
                  [
                    h('Icon', {
                      props: {
                        type:
                          params.row._children !== 0
                            ? this.body[params.row._children + params.index]._status
                              ? 'md-arrow-dropdown'
                              : 'md-arrow-dropright'
                            : '',
                        size: 24,
                      },
                      class: `indent indent-${params.row._child_index}`,
                    }),
                    h('span', params.row[params.column.key]),
                  ]
                ),
              ]
            );
      };
    }

    return header;
  }

  private getOffset(el: HTMLElement) {
    const box = el.getBoundingClientRect();

    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft,
    };
  }

  private enter(ev: MouseEvent) {
    let el = ev.srcElement as HTMLElement;
    while (el && el.nodeName !== 'TD') el = el.parentElement as HTMLElement;

    if (el) {
      const pos = this.getOffset(el);

      console.log({
        name: el.className,
        left: pos.left + el.offsetWidth,
        top: pos.top + el.offsetHeight,
      });

      this.$store.commit('billquery/pop', {
        name: el.className,
        left: pos.left + el.offsetWidth,
        top: pos.top + el.offsetHeight,
      });
    }
  }

  private async created() {
    const rs = await execute();

    (this.total = rs.total),
      (this.title = rs.title),
      (this.header = this.parse(
        rs.header,
        rs.body.some(b => typeof b.children !== 'undefined' && b.children.length > 0)
      )),
      (this.body = this.flattern(rs.body, rs.footer, 0)),
      (this.loading = false);
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
}

.invisible-row {
  display: none;
}

td.has-child .ivu-table-cell {
  padding: 0;
}
</style>