<template>
  <Spin fix v-if="loading">
    <Icon type="ios-loading" size="30" class="load-icon" />
    <div>正在验证身份，请等待</div>
  </Spin>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { VerifyUrl } from '@/types/urls';
import { VerifyReturn } from '@/types/verify';

@Component
export default class Verify extends Vue {
  private loading = true;

  private async mounted() {
    const token = this.$route.query.token as string;

    try {
      const response = await axios.get(`${VerifyUrl}/${token || ''}`);

      if (response && (response.data as VerifyReturn).success) this.$emit('success', response.data);
      else this.$emit('fail', '验证登录失败，请重新登录');
    } catch (e) {
      this.$emit('fail', (e as Error).message);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-spin-fix {
  z-index: 9999 !important;
}

.load-icon {
  animation: ani-load-spin 1s linear infinite;
}

@keyframes ani-load-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
