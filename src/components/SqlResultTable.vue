<template>
  <div style="margin: 20px">
    <div style="font-weight: bolder">
      <template v-for="(title, t) of result.title">
        <div
          :is="title.tag"
          :key="t"
          v-bind="title.props"
          v-on="title.on"
          :style="title.style"
          :class="title.classNames"
        >
          {{ title.text }}
        </div>
      </template>
    </div>
    <Table
      :columns="result.header"
      :data="result.body"
      :height="250"
      stripe
      size="small"
      :loading="loading"
      @on-row-click="$emit('new', { tag: 'sql-result-table' })"
    ></Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Result, DynamicValue, DynamicString } from '@/types/billQuery';

@Component
export default class SqlResultTable extends Vue {
  private loading = false;

  private get result(): Result {
    const title: Array<DynamicString> = [];
    const body = [];

    for (let i = 0; i < Math.round(Math.random() * 3); ++i)
      title.push({
        tag: 'span',
        text: `${new Date()} -- ${Math.round(Math.random() * 3)}`,
      });

    for (let i = 0; i < Math.round(Math.random() * 100); ++i)
      body.push({
        serv_id: i,
        world: Math.round(Math.random() * 100),
      });

    return {
      total: body.length,
      title,
      header: [
        // { key: 'index', title: '#', type: 'index', width: 50, fixed: true },
        { key: 'expand', title: '', type: 'expand', width: 50 },
        {
          key: 'serv_id',
          title: 'serv_id',
        },
        {
          key: 'world',
          title: '世界',
        },
      ],
      body,
    };
  }

  @Prop(Object)
  private readonly value!: any;

  private get Value() {
    return JSON.stringify(this.value);
  }
}
</script>
