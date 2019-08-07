import axios from 'axios';
import { ProjectInfoReturn, MessageResult, ProjectInfo, AttachmentInfo } from '@/types/project';
import { VerifyReturn } from '@/types/verify';

const Projects = 'http://132.232.28.32:23978/p';
const Verify = 'http://132.232.28.32:23978/v';
const Attachments = 'http://132.232.28.32:23978/a';

axios.defaults.withCredentials = true;
axios.defaults.responseType = 'json';

function download(blob: Blob, filename: string) {
  if (typeof window.navigator.msSaveBlob !== 'undefined') navigator.msSaveBlob(blob, filename);
  else {
    var blobURL = window.URL.createObjectURL(blob);
    var tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    if (typeof tempLink.download === 'undefined') tempLink.setAttribute('target', '_blank');

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}

export const Attachment = {
  async download(id: number, filename: string) {
    // await verify();
    const response = await axios.get(`${Attachments}/${id}`, {
      responseType: 'blob',
    });

    download(response.data as Blob, filename);
  },
  async downloadAll(id: number, filename: string) {
    // await verify();
    const response = await axios.get(`${Attachments}/all/${id}`, {
      responseType: 'blob',
    });

    download(response.data as Blob, filename);
  },

  async remove(id: number) {
    // await verify();
    try {
      await axios.delete(`${Attachments}/${id}`);
    } catch {
      throw new Error('删除文件出错');
    }
  },
};

export async function verify(token: string): Promise<VerifyReturn> {
  try {
    const response = await axios.get(`${Verify}/${token}`);

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

export const Project = {
  async get(
    page: number,
    pageSize: number,
    sorter: string,
    order: 'asc' | 'desc' | 'normal',
    keyword?: string
  ): Promise<ProjectInfoReturn> {
    // await verify();
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
    // await verify();
    const response = await axios.delete(`${Projects}/${id}`);

    return response.data as MessageResult;
  },
  async save(info: ProjectInfo): Promise<MessageResult> {
    // await verify();

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
