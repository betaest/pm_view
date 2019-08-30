<template>
  <div>
    <span style="font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);">
      <template v-for="(title, t) of result.title">
        <div :is="title.tag" :key="t" v-bind="title.props" v-on="title.on">{{ title.text }}</div>
      </template>
    </span>
    <Table
      :columns="result.header"
      :data="result.body"
      :height="250"
      stripe
      border
      size="large"
      style="margin-top: 20px"
      :loading="loading"
      @on-row-click="$emit('new', { tag: 'sql-result-table' })"
    ></Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Result } from '@/types/billQuery';
import { translate, translateBody } from '@/utils/billQuery';

@Component
export default class SqlResultTable extends Vue {
  private loading = true;

  private get result(): Result {
    return {
      total: 2,
      title: [
        {
          tag: 'span',
          text: [
            {
              type: 'string',
              value: 'Hello, world',
            },
          ],
        },
      ],
      header: [
        {
          key: 'serv_id',
          title: 'serv_id',
        },
      ],
      body: [
        {
          serv_id: 10,
          world: 20,
        },
      ],
    };
  }

  @Prop(Object)
  private readonly value!: any;

  private get Value() {
    return JSON.stringify(this.value);
  }
}
</script>
