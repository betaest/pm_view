export interface AttachmentInfo {
  id: number;
  name: string;
  url: string;
}
export interface ProjectInfo {
  id: number;
  name: string;
  description: string;
  handler: string;
  department: string;
  operator: string;
  operateDateTime: string;
  attachments: Array<AttachmentInfo | File>;
}

export interface ProjectInfoReturn {
  total: number;
  rows: Array<ProjectInfo>;
}

export interface MessageResult {
  success: boolean;
  message: string;
}