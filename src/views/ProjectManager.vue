<template>
  <div>
    <Layout>
      <Header>
        <Toolbar />
      </Header>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';

@Component({ components: { Toolbar } })
export default class ProjectManager extends Vue {}
</script>
