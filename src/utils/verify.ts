import axios from './axios';
import urls from '@/urls';
import { VerifyReturn } from '@/types/verify';

export async function verify(token?: string, module?: string): Promise<VerifyReturn> {
  const response = await axios.get(`${urls.verify}/${token}`, {
    params: {
      module,
    },
  });

  return response.status === 200 ? (response.data as VerifyReturn) : { success: false, name: '', to: '/' };
}
