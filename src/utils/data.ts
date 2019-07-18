import axios from 'axios';
import { ProjectInfo, ProjectInfos } from '@/types/projs';

import Cookies from 'js-cookie';
import { Base64 } from 'js-base64';

const Projects = 'https://localhost:5001/p';
const Verify = 'https://localhost:5001/v';
const Attachments = 'localhost:13148/api/Attachments';

axios.defaults.withCredentials = true;
axios.defaults.responseType = 'json';

export function download(id: number, url: string) {}

export async function remove(id: number, url: string): Promise<boolean> {
  return new Promise<boolean>(resolve => resolve(true));
}

// StaffCode,StaffName,IpAddr,YYYY-MM-DDTHH:mm:ss
export async function verify(session: string): Promise<boolean> {
  const response = await axios.get(`${Verify}/Verify/${session}`);
  const desc = Base64.decode(session).split(',');

  sessionStorage.setItem('staff', desc[1]);

  if (response.data && response.data.success) {
    Cookies.set('guid', response.data.guid);

    return true;
  }

  return false;
}

export async function get(
  page: number,
  pageSize: number,
  sorter: string,
  order: 'asc' | 'desc' | 'normal',
  keyword?: string
): Promise<ProjectInfos> {
  let guid = Cookies.get('guid');

  if (!guid) {
    const session = location.search;

    if (await verify(session)) guid = Cookies.get('guid');
  }

  const response = await axios.get(`${Projects}/Project/${keyword}`, {
    params: {
      page,
      pageSize,
      sorter,
      order,
    },
  });

  return response.data as ProjectInfos;
}
// export async function post(info: ProjectInfo): Promise<boolean> {}
// export async function put(info: ProjectInfo): Promise<boolean> {}
// export async function dele(id: number): Promise<boolean> {}
