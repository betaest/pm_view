import axios from 'axios';
import { ProjectInfo, ProjectInfos } from '@/types/projs';

const Projects = 'https://localhost:44393/api/';
const Verify = '//localhost:13148/api/Verify';
const Attachments = 'localhost:13148/api/Attachments';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = Projects;
axios.defaults.responseType = 'json';

export function download(id: number, url: string) {}

export async function remove(id: number, url: string): Promise<boolean> {
  return new Promise<boolean>(resolve => resolve(true));
}

// async function verify(session: string): Promise<boolean> {
//   const response = await axios.get(Verify, {
//     data: session,
//   });
// }

export async function get(page: number, pageSize: number, keyword?: string): Promise<ProjectInfos> {
  const response = await axios.get('./Project');

  return response.data as ProjectInfos;
}
// export async function post(info: ProjectInfo): Promise<boolean> {}
// export async function put(info: ProjectInfo): Promise<boolean> {}
// export async function dele(id: number): Promise<boolean> {}
