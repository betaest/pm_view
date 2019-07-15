interface AttachmentInfo {
  id: number;
  name: string;
}
export interface ProjectInfo {
  id: number;
  name: string;
  description: string;
  handler: string;
  department: string;
  operator: string;
  operationDateTime: Date;
  privileges?: string[];
  attachments?: Array<AttachmentInfo>;
  url?: string;
}
