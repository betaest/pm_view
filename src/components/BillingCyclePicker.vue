<template>
  <span>
    <DatePicker
      type="month"
      style="width: 110px"
      :options="{disabledDate}"
      :format="format"
      :value="startDate"
      :start-date="startDate"
      :clearable="false"
      :editable="false"
      @on-change="$emit('on-change', $event)"
    ></DatePicker>
    {{ text }}
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BillingCyclePicker extends Vue {
  @Prop(String)
  private readonly text!: string;

  @Prop({ type: String, default: 'yyyy年MM月' })
  private readonly format!: string;

  @Prop({
    type: [Number, String],
    default: 6,
    validator(val: string | number) {
      return (typeof val === 'number' && val >= 2) || (typeof val === 'string' && val.toLowerCase() === 'unlimited');
    },
  })
  private readonly maxMonth!: string | number;

  private get startDate(): Date {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);

    return now;
  }

  private disabledDate(val: Date) {
    const now = new Date();

    if (this.maxMonth === 'unlimited') return val > now;

    const bf = new Date();
    bf.setMonth(bf.getMonth() - <number>this.maxMonth - 1);

    return val > now || val < bf;
  }
}
</script>

<style lang="scss">
</style>