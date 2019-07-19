<template>
  <div>
    <Layout>
      <Header>
        <Toolbar @select="select" @search="search" />
      </Header>
      <Content>
        <DataTable ref="dt" :keyword="keyword" @edit="editDataTable" />
      </Content>
    </Layout>
    <Editor :show="showEditor" :items="data" :title="editorTitle" @save="saveEditor" @cancel="cancelEditor" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import { ProjectInfo, AttachmentInfo } from '@/types/project';

import Toolbar from '@/components/Toolbar.vue';
import DataTable from '@/components/DataTable.vue';
import Editor from '@/components/Editor.vue';

@Component({ components: { Toolbar, DataTable, Editor } })
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

  private select(which: string) {
    if (which === '1') {
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
  }

  private search(what: string) {
    this.keyword = what;
  }

  private editDataTable(dt: ProjectInfo) {
    this.editorTitle = '修改项目';
    this.data = JSON.parse(JSON.stringify(dt));
    this.showEditor = true;
  }

  private saveEditor(data: ProjectInfo) {
    new Promise(r => setTimeout(() => (this.showEditor = false), 1000));
  }

  private cancelEditor() {
    this.showEditor = false;
  }
}
</script>
