<template>
  <div style="margin: 20px">
    <div style="margin-bottom: 5px;">
      <template v-for="(title, t) of title">
        <div :is="title.tag" :key="t" v-bind="title.props" v-on="title.events">{{ title.text }}</div>
      </template>
    </div>
    <Table
      :columns="header"
      :data="body"
      :height="200"
      stripe
      size="small"
      :loading="loading"
      :row-class-name="rowClass"
      @on-row-click="rowClick"
      @mouseover.native.stop="handleMouseOver"
    >
      <Row slot="footer" style="margin-left: 10px">
        <Col span="16">
          <span>测试footer</span>
        </Col>
        <Col span="8" style="float: right">
          <Page :total="total" size="small"></Page>
        </Col>
      </Row>
    </Table>
  </div>
</template>

<script lang="ts">
import { CreateElement } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Row, FlatRow, Column, Section, QueryJsonL } from '@/types/billQuery';
import { execute } from '@/utils/billQuery';
import { offset } from '@/utils/dom';
import { translateBody, translateHeader } from '@/utils/assist';
import BillingCyclePicker from './BillingCyclePicker.vue';

@Component({ components: { BillingCyclePicker } })
export default class SqlResultTable extends Vue {
  private loading = true;
  private total = 0;
  private title: Array<Section> = [];
  private header: Array<Column> = [];
  private body: Array<FlatRow> = [];

  private rowClass(row: FlatRow, index: number) {
    return `${(row._parent === -1 || this.body[row._parent]._status) && row._status ? '' : 'invisible-row'} ${
      row._children !== 0 ? 'row-pointer' : ''
    }`;
  }

  private find(offset: number): FlatRow {
    return this.body[offset];
  }

  private rowClick(row: FlatRow, index: number) {
    if (row.children)
      for (let i = 1; i < row._children + 1; ++i) this.find(index + i)._status = !this.find(index + i)._status;
  }

  private handleMouseOver(ev: MouseEvent) {
    let el = (ev.target || ev.srcElement) as HTMLElement;

    while (el && el.nodeName !== 'TD') el = el.parentElement as HTMLElement;

    if (el) {
      const span = el.querySelector('.ivu-table-cell-ellipsis > span') as HTMLElement;
      const icon = el.querySelector('.ivu-table-cell-ellipsis > .ivu-icon') as HTMLElement;
      const pos = offset(el);

      let name = el.className;
      if (/(?:^|\s+)key-(.*)\s*$/.test(name)) name = RegExp.$1;

      let left = 0;

      if (icon) {
        const iconStyle = getComputedStyle(icon);

        left += icon.offsetWidth + parseInt(iconStyle.marginLeft || '0px') + parseInt(iconStyle.marginRight || '0px');
      }

      this.$store.commit('billquery/pop', {
        name,
        left: pos.left + Math.min(left + span.offsetWidth + 16, el.offsetWidth - 36),
        top: pos.top + el.offsetHeight / 2 - 12,
        value: span.textContent || span.innerText,
      });
    }
  }

  private async created() {
    const rs = await execute(this.value);

    this.total = rs.total;
    this.title = rs.title;
    this.body = translateBody(rs.body, 0);
    this.header = translateHeader(
      rs.header,
      rs.body.some(b => typeof b.children !== 'undefined' && b.children.length > 0),
      this.find
    );
    this.loading = false;
  }

  @Prop(Object)
  private readonly value!: QueryJsonL;
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

.row-pointer {
  cursor: pointer;
}
</style>
