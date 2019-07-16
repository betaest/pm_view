<template>
  <div>
    <Layout>
      <Header>
        <Toolbar @select="select" @search="search" />
      </Header>
      <Content>
        <DataTable ref="dt" @edit="editDataTable" />
      </Content>
    </Layout>
    <Editor :show="showEditor" :items="data" :title="editorTitle" @save="saveEditor" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ProjectInfo } from '@/types/projs';

import Toolbar from '@/components/Toolbar.vue';
import DataTable from '@/components/DataTable.vue';
import Editor from '@/components/Editor.vue';

@Component({ components: { Toolbar, DataTable, Editor } })
export default class ProjectManager extends Vue {
  private showEditor = false;

  private data: ProjectInfo = {
    id: 0,
    name: '',
    description: '',
    handler: '',
    department: '',
    operator: '',
    operationDateTime: new Date(),
  };

  private editorTitle = '';

  public select(which: string) {
    if (which === '1') {
      this.showEditor = true;
    }
  }

  public search(what: string) {
    (this.$refs.dt as DataTable).get('Hello');
  }

  public editDataTable(dt: ProjectInfo) {
    this.editorTitle = '修改项目';
    this.data = dt;
    this.showEditor = true;
  }

  public saveEditor(data: ProjectInfo, files: File[]) {
    this.$Notice.info({
      title: '通知',
      desc: '正在保存中',
      name: 'savingNotice'
    });
    new Promise(r => setTimeout(() => (this.showEditor = false), 1000));
  }
}
</script>
