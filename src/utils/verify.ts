import axios from 'axios';
import { Vue, Component } from 'vue-property-decorator';
import { VerifyReturn } from '@/types/verify';

const Verify = 'http://132.232.28.32:23978/v';

export async function verify(token?: string): Promise<VerifyReturn> {
  try {
    const response = await axios.get(`${Verify}/${token || ''}`);

    if (response.data && (response.data as VerifyReturn).success) {
      let result = response.data as VerifyReturn;

      sessionStorage.setItem('name', result.name);

      return result;
    }

    throw 1;
  } catch (e) {
    throw new Error('验证登录失败，请重新登录');
  }
}

@Component
export class VerifyMixin extends Vue {
  protected readonly verify = {
    loading: false,
    failure: false,
  };

  protected async mounted() {
    const token = this.$route.query.token as string;

    this.verify.loading = true;
    this.verify.failure = false;

    try {
      const response = await verify(token);

      this.$router.push(response.to);
    } catch (e) {
      this.$Notice.error({
        title: '错误',
        desc: (e as Error).message,
      });

      this.verify.failure = true;

      this.$router.push('404');
    } finally {
      this.verify.loading = false;
    }
  }
}
