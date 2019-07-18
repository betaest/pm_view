<template>
  <div>
    <Table
      :columns="columns"
      :loading="loading"
      :data="data"
      stripe
      :height="height"
      :max-height="height"
      size="large"
      border
      ref="table"
      @on-sort-change="changeSort"
    >
      <template #operation="{row}">
        <ButtonGroup shape="circle" style="position: static" size="small">
          <Tooltip content="下载" v-if="row.attachments">
            <Button custom-icon="iconfont icon-download" type="primary" @click="$emit('download', row)" />
          </Tooltip>

          <Tooltip content="编辑" v-if="(row.privileges || []).includes('put')">
            <Button custom-icon="iconfont icon-edit" @click="$emit('edit', row)" />
          </Tooltip>

          <Tooltip content="删除" v-if="(row.privileges || []).includes('delete')">
            <Button custom-icon="iconfont icon-delete" type="error" @click="$emit('delete', row.id)" />
          </Tooltip>
        </ButtonGroup>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="total"
          :current="1"
          placement="top"
          transfer
          show-total
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { ProjectInfo } from '@/types/projs';
import { CreateElement } from 'vue';
import { get } from '@/utils/data';

type OrderType = 'asc' | 'desc' | 'normal';

@Component
export default class DataTable extends Vue {
  @Prop(String)
  private readonly keyword!: string;

  private loading: boolean = false;
  private data: Array<ProjectInfo> = [];
  private height: number = 0;
  private total: number = 0;
  private pageSize: number = 10;
  private page: number = 1;
  private sorter: string = '';
  private order: OrderType = 'normal';

  private formatDateTime(dt: Date) {
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }

  public mounted() {
    this.height = document.body.clientHeight - 170;
    window.addEventListener('resize', () => (this.height = document.body.clientHeight - 170));

    this.get();
  }

  private get columns(): any[] {
    return [
      {
        title: '名称',
        key: 'name',
        sortable: true,
        width: 150,
      },
      {
        title: '描述',
        key: 'description',
        width: 500,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '发起人',
        key: '$custom',
        sortable: true,
        width: 150,
        render: (h: CreateElement, { row }: { row: ProjectInfo }) => h('span', `${row.department}-${row.handler}`),
      },
      {
        title: '录入人',
        key: 'operator',
        width: 150,
        sortable: true,
      },
      {
        title: '发起时间',
        key: 'operateDateTime',
        sortable: true,
        width: 150,
        render: (h: CreateElement, { row }: { row: ProjectInfo }) =>
          h('span', this.formatDateTime(new Date(row.operateDateTime))),
      },
      {
        title: ' ',
        slot: 'operation',
      },
    ];
  }

  private async changePage(page: number) {
    this.page = page;

    await this.get();
  }

  private async changePageSize(pageSize: number) {
    this.pageSize = pageSize;

    await this.get();
  }

  private async changeSort({ key, order }: { key: string; order: OrderType }) {
    // if (this.total <= this.pageSize) return;

    this.sorter = key;
    this.order = order;

    await this.get();
  }

  @Watch('keyword')
  private async changeKeyword() {
    await this.get();
  }

  private async get() {
    this.loading = true;

    try {
      const data = await get(this.page, this.pageSize, this.sorter, this.order, this.keyword);

      this.total = data.total;
      this.data = data.rows;
      this.loading = false;
    } catch (e) {
      this.loading = false;

      this.$Notice.error({
        title: '连接数据',
        desc: e.message,
      });
    }
  }
}
</script>

<style lang="scss">
.ivu-btn-group:not(.ivu-btn-group-vertical) > .ivu-tooltip {
  &:first-child:not(:last-child) .ivu-btn {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  &:last-child:not(:first-child) .ivu-btn {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  &:not(:first-child):not(:last-child) .ivu-btn {
    border-radius: 0;
  }
}
</style>
