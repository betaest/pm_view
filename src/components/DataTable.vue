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
        <Tooltip content="下载" v-if="row.attachments && row.attachments.filter(a => a.state === 'A').length !== 0">
          <Button shape="circle" custom-icon="iconfont icon-download" type="primary" @click="download(row)" />
        </Tooltip>

        <Tooltip content="编辑" v-if="editable(row)">
          <Button shape="circle" custom-icon="iconfont icon-edit" @click="$emit('edit', row)" />
        </Tooltip>

        <Tooltip content="删除" v-if="editable(row)">
          <Poptip confirm title="你确认删除这个项目吗？" placement="left" @on-ok="remove(row.id)">
            <Button shape="circle" custom-icon="iconfont icon-delete" type="error" />
          </Poptip>
        </Tooltip>
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
import { ProjectInfo, AttachmentInfo } from '@/types/project';
import { Project, Attachment } from '@/utils/data';
import { CreateElement } from 'vue';

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
    this.height = document.body.clientHeight - 120;
    window.addEventListener('resize', () => (this.height = document.body.clientHeight - 120));

    this.get();
  }

  private get columns(): any[] {
    return [
      {
        title: '名称',
        key: 'name',
        sortable: true,
      },
      {
        title: '描述',
        key: 'description',
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '发起人',
        key: '$custom',
        sortable: true,
        render: (h: CreateElement, { row }: { row: ProjectInfo }) => h('span', `${row.department}-${row.handler}`),
      },
      {
        title: '录入人',
        key: 'operator',
        sortable: true,
      },
      {
        title: '发起时间',
        key: 'operateDateTime',
        sortable: true,
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
    if (this.total <= this.pageSize) return;

    this.sorter = key;
    this.order = order;

    await this.get();
  }

  @Watch('keyword')
  private async changeKeyword() {
    await this.get();
  }

  private editable(row: ProjectInfo): boolean {
    return row.operator === this.$store.state.name;
  }

  public async get() {
    this.loading = true;

    try {
      const data = await Project.get(this.page, this.pageSize, this.sorter, this.order, this.keyword);

      this.total = data.total;
      this.data = data.rows;
    } catch (e) {
      this.$Notice.error({
        title: '获取数据',
        desc: e.message,
      });
    } finally {
      this.loading = false;
    }
  }

  private async remove(i: number) {
    this.loading = true;

    try {
      const result = await Project.delete(i);

      if (result) {
        if (result.success) await this.get();

        this.$Notice[result.success ? 'success' : 'error']({
          title: '删除',
          desc: result.message,
        });
      }
    } finally {
      this.loading = false;
    }
  }

  private async download(row: ProjectInfo) {
    try {
      const attachments = row.attachments.filter(a => (a as AttachmentInfo).state === 'A');
      const filename = attachments.length === 1 ? attachments[0].name : `${row.name}.zip`;

      await Attachment.downloadAll(row.id, filename);
    } catch (e) {
      this.$Notice.error({
        title: '下载',
        desc: (e as Error).message.endsWith('404') ? '查看文件未找到' : e.message,
      });
    }
  }
}
</script>

<style lang="scss">
.ivu-tooltip-rel {
  position: static;
}

.ivu-btn-circle {
  margin-right: 5px;
}

$widths: 15%, 30%, 15%, 12%, 12%, 15%;

.ivu-table-header,
.ivu-table-body {
  table > colgroup {
    @for $i from 1 through 6 {
      col:nth-child(#{$i}) {
        width: #{nth($widths, $i)};
      }
    }
  }
}
</style>
