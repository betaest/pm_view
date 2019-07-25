import axios from 'axios';
import { ProjectInfoReturn, MessageResult, ProjectInfo, AttachmentInfo } from '@/types/project';
import { VerifyReturn } from '@/types/verify';
import Cookies from 'js-cookie';

const Projects = 'https://localhost:5001/p';
const Verify = 'https://localhost:5001/v';
const Attachments = 'https://localhost:5001/a';

axios.defaults.withCredentials = true;
axios.defaults.responseType = 'json';

export const Attachment = {
  async download(id: number): Promise<boolean> {
    await verify();

    const response = await axios.get(`${Attachments}/${id}`, {
      responseType: "blob"
    });

    if ((response.data as MessageResult).message) {

    }

    return true;
  },

  async remove(id: number, url: string): Promise<boolean> {
    return true;
  },
};

async function verify() {
  let guid = Cookies.get('guid');

  if (!guid) {
    try {
      const token = location.search.substr(1);
      const response = await axios.get(`${Verify}/${token}`);

      if (response.data && (response.data as VerifyReturn).success) {
        let result = response.data as VerifyReturn;

        sessionStorage.setItem('name', result.name);
        Cookies.set('guid', result.guid);

        return;
      }

      throw 1;
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
    await verify();

    const response = await axios.get(`${Projects}/${keyword}`, {
      params: {
        page,
        pageSize,
        sorter,
        order,
      },
    });

    return response.data as ProjectInfoReturn;
  },
  async delete(id: number): Promise<MessageResult> {
    await verify();

    const response = await axios.delete(`${Projects}/${id}`);

    return response.data as MessageResult;
  },
  async save(info: ProjectInfo): Promise<MessageResult> {
    await verify();

    const data = new FormData();

    for (const name in info)
      if (info.hasOwnProperty(name) && name !== 'attachments' && !name.startsWith('operat')) {
        data.append(name, (info as any)[name].toString());
      }

    data.append('operator', sessionStorage.getItem('name')!);

    info.attachments
      .filter(f => !(f as AttachmentInfo).url)
      .forEach(f => data.append('file', f as File, (f as File).name));

    const response = await axios.request({
      method: info.id === 0 ? 'POST' : 'PUT',
      withCredentials: true,
      url: Projects,
      data,
    });

    return response.data as MessageResult;
  },
};
