import axios from 'axios';
import { ProjectInfoReturn } from '@/types/project';
import { VerifyReturn } from '@/types/verify';

import Cookies from 'js-cookie';

const Projects = 'https://localhost:5001/p';
const Verify = 'https://localhost:5001/v';
const Attachments = 'https://localhost:5001/a';

axios.defaults.withCredentials = true;
axios.defaults.responseType = 'json';

export const Attachment = {
  download(id: number, url: string) {},

  async remove(id: number, url: string): Promise<boolean> {
    return true;
  },
};

// StaffCode,StaffName,IpAddr,YYYY-MM-DDTHH:mm:ss
async function verify(token: string): Promise<VerifyReturn> {
  const response = await axios.get(`${Verify}/Verify/${token}`);

  return response.data ? (response.data as VerifyReturn) : { success: false, name: '', guid: '' };
}

async function verifyit() {
  let guid = Cookies.get('guid');

  if (!guid) {
    try {
      const token = location.search.substr(1);
      const result = await verify(token);

      if (result.success) {
        sessionStorage.setItem('name', result.name);
        Cookies.set('guid', result.guid);
        guid = result.guid;
      } else {
        throw new Error('验证登录失败，请重新登录');
      }
    } catch (e) {
      throw new Error('验证登录失败，请重新登录');
    }
  }
}

export const Project = {
  async get(
    page: number,
    pageSize: number,
    sorter: string,
    order: 'asc' | 'desc' | 'normal',
    keyword?: string
  ): Promise<ProjectInfoReturn> {
    await verifyit();

    const response = await axios.get(`${Projects}/Project/${keyword}`, {
      params: {
        page,
        pageSize,
        sorter,
        order,
      },
    });

    return response.data as ProjectInfoReturn;
  },
  async delete(id: number) {
    await verifyit();

    await axios.delete(`${Projects}/Project/${id}`);
  },
};

// export async function post(info: ProjectInfo): Promise<boolean> {}
// export async function put(info: ProjectInfo): Promise<boolean> {}
