<template>
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
            @click="$emit('download', row.url)"
          />
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProjectInfo } from '@/types/projs';
import { CreateElement } from 'vue';

@Component
export default class DataTable extends Vue {
  public loading: boolean = false;
  public data: Array<ProjectInfo> = [];
  public height: number = 0;

  private formatDateTime(dt: Date) {
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }

  public mounted() {
    this.height = document.body.clientHeight - 128;

    window.addEventListener('resize', () => (this.height = document.body.clientHeight - 128));
  }

  public get columns(): any[] {
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

  public get session(): string {
    return location.href;
  }

  public get(session: string, keyword?: string) {
    this.data.push(
      ...[
        {
          id: 1,
          name: '人生地不熟',
          description:
            '这个是一个很长的关于他的描述，这个是一个很长的关于他的描述，这个是一个很长的关于他的描述<br/>这个是一个很长的关于他的描述,这个是一个很长的关于他的描述',
          department: '市场部',
          handler: '薛青',
          operator: '吴兆强',
          operationDateTime: new Date(2017, 5, 3),
          privileges: ['put'],
          attachments: [{ id: 1, name: 'x.xlsx' }],
          url: 'xxx-file.zip',
        },
        {
          id: 2,
          name: '人生地不熟',
          description: '这个是一个很长的关于他的描述',
          department: '市场部',
          handler: '薛青',
          operator: '李哲人',
          operationDateTime: new Date(),
          attachments: [],
          privileges: ['put', 'delete'],
        },
        {
          id: 3,
          name: '人生地不熟',
          description: '这个是一个很长的关于他的描述',
          department: '市场部',
          handler: '薛青',
          operator: '吴兆强',
          operationDateTime: new Date(),
          attachments: [{ id: 1, name: 'xls.xlsx' }],
        },
      ]
    );
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
