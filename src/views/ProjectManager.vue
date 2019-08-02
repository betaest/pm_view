<template>
  <div>
    <Layout>
      <Header>
        <Tooltip content="新建项目" placement="right">
          <Button type="primary" custom-icon="iconfont icon-appstoreadd" shape="circle" @click="addProject"></Button>
        </Tooltip>
        <Input search placeholder="输入搜索关键字" @on-search="search">
          <template #prepend>
            <span>按关键字搜索：</span>
          </template>
        </Input>
      </Header>
      <Content>
        <DataTable ref="dt" :keyword="keyword" @edit="editDataTable" />
      </Content>
    </Layout>
    <Editor :show="showEditor" :item="data" :title="editorTitle" @save="saveEditor" @cancel="cancelEditor" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import { ProjectInfo, AttachmentInfo } from '@/types/project';
import { Project } from '@/utils/data';

import DataTable from '@/components/DataTable.vue';
import Editor from '@/components/Editor.vue';

@Component({ components: { DataTable, Editor } })
export default class ProjectManager extends Vue {
  @Ref()
  private readonly dt!: DataTable;

  private showEditor = false;
  private keyword = '';

  private data: ProjectInfo = {
    id: 0,
    name: '',
    description: '',
    handler: '',
    department: '',
    operator: '',
    operateDateTime: '',
    attachments: [],
  };

  private editorTitle = '';

  private addProject() {
    this.data = {
      id: 0,
      name: '',
      description: '',
      handler: '',
      department: '',
      operator: '',
      operateDateTime: '',
      attachments: [],
    };
    this.showEditor = true;
  }

  private search(what: string) {
    this.keyword = what;
  }

  private editDataTable(dt: ProjectInfo) {
    this.editorTitle = '修改项目';
    this.data = JSON.parse(JSON.stringify(dt));

    this.showEditor = true;
  }

  private async saveEditor(data: ProjectInfo) {
    const result = await Project.save(data);

    if (result) {
      this.$Notice[result.success ? 'success' : 'error']({
        title: '提示',
        desc: result.message,
      });

      this.showEditor = false;
      await this.dt.get();
    }
  }

  private cancelEditor() {
    this.showEditor = false;
  }
}
</script>

<style lang="scss">
.ivu-layout header {
  background-color: #515a6e;

  .ivu-tooltip {
    margin: 15px;
    float: left;
    font-size: 16px;
  }

  .ivu-input-wrapper {
    margin: 15px;
    width: 50%;

    span {
      font-weight: bolder;
    }
  }
}
</style>
