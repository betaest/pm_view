import axios from './axios';
import store from '../store';
import urls from '@/urls';
import { ProjectInfoReturn, MessageResult, ProjectInfo, AttachmentInfo } from '@/types/project';

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
    const response = await axios.get(`${urls.attachment}/${id}`, {
      responseType: 'blob',
    });

    download(response.data as Blob, filename);
  },
  async downloadAll(id: number, filename: string) {
    const response = await axios.get(`${urls.attachment}/all/${id}`, {
      responseType: 'blob',
    });

    download(response.data as Blob, filename);
  },

  async remove(id: number) {
    try {
      await axios.delete(`${urls.attachment}/${id}`);
    } catch {
      throw new Error('删除文件出错');
    }
  },
};

export const Project = {
  async get(
    page: number,
    pageSize: number,
    sorter: string,
    order: 'asc' | 'desc' | 'normal',
    keyword?: string
  ): Promise<ProjectInfoReturn> {
    const response = await axios.get(`${urls.project}/${keyword}`, {
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
    const response = await axios.delete(`${urls.project}/${id}`);

    return response.data as MessageResult;
  },
  async save(info: ProjectInfo): Promise<MessageResult> {
    const data = new FormData();

    for (const name in info)
      if (info.hasOwnProperty(name) && name !== 'attachments' && !name.startsWith('operat')) {
        data.append(name, (info as any)[name].toString());
      }

    data.append('operator', store.state.name);

    info.attachments
      .filter(f => !(f as AttachmentInfo).url)
      .forEach(f => data.append('file', f as File, (f as File).name));

    const response = await axios.request({
      method: info.id === 0 ? 'POST' : 'PUT',
      withCredentials: true,
      url: urls.project,
      data,
    });

    return response.data as MessageResult;
  },
};
