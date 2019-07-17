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
    >
      <template #operation="{row}">
        <ButtonGroup shape="circle" style="position: static" size="small">
          <Tooltip content="下载" v-if="row.attachments">
            <Button
              custom-icon="iconfont icon-download"
              type="primary"
              @click="$emit('download', row)"
            />
          </Tooltip>

          <Tooltip content="编辑" v-if="(row.privileges || []).includes('put')">
            <Button custom-icon="iconfont icon-edit" @click="$emit('edit', row)" />
          </Tooltip>

          <Tooltip content="删除" v-if="(row.privileges || []).includes('delete')">
            <Button
              custom-icon="iconfont icon-delete"
              type="error"
              @click="$emit('delete', row.id)"
            />
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

  private formatDateTime(dt: Date) {
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }

  public mounted() {
    this.height = document.body.clientHeight - 170;

    window.addEventListener('resize', () => (this.height = document.body.clientHeight - 170));
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
        key: 'operationDateTime',
        sortable: true,
        width: 150,
        render: (h: CreateElement, { row }: { row: ProjectInfo }) =>
          h('span', this.formatDateTime(row.operationDateTime)),
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

  @Watch('keyword')
  private async changeKeyword() {
    await this.get();
  }

  private async get() {
    this.loading = true;

    try {
      const data = await get(this.page, this.pageSize, this.keyword);

      this.total = data.total;
      this.data = data.rows;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      
      this.$Notice.error({
        title: '连接数据',
        desc: e.message
      })
    }
    // this.data.push(
    //   ...[
    //     {
    //       id: 1,
    //       name: '人生地不熟',
    //       description:
    //         '这个是一个很长的关于他的描述，这个是一个很长的关于他的描述，这个是一个很长的关于他的描述<br/>这个是一个很长的关于他的描述,这个是一个很长的关于他的描述',
    //       department: '市场部',
    //       handler: '薛青',
    //       operator: '吴兆强',
    //       operationDateTime: new Date(2017, 5, 3),
    //       privileges: ['put'],
    //       attachments: [{ id: 1, name: 'x.xlsx', url: 'x.xfwel.xlsx' }],
    //     },
    //     {
    //       id: 2,
    //       name: '人生地不熟',
    //       description: '这个是一个很长的关于他的描述',
    //       department: '市场部',
    //       handler: '薛青',
    //       operator: '李哲人',
    //       operationDateTime: new Date(),
    //       attachments: [],
    //       privileges: ['put', 'delete'],
    //     },
    //     {
    //       id: 3,
    //       name: '人生地不熟',
    //       description: '这个是一个很长的关于他的描述',
    //       department: '市场部',
    //       handler: '薛青',
    //       operator: '吴兆强',
    //       operationDateTime: new Date(),
    //       attachments: [{ id: 1, name: 'xls.xlsx', url: 'xjlsdf.xlsx' }],
    //     },
    //   ]
    // );
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
