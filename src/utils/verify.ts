import axios from './axios';
import { VerifyUrl } from '@/types/urls';
import { VerifyReturn } from '@/types/verify';

export async function verify(token?: string, module?: string): Promise<VerifyReturn> {
  const response = await axios.get(`${VerifyUrl}/${token}`);

  return response.status === 200 ? (response.data as VerifyReturn) : { success: false, name: '', to: '/' };
}
