// const base = 'http://132.232.28.32:23978';
const base = process.env.NODE_ENV !== 'production'? 'http://localhost:23978': 'http://132.232.28.32:23978';

export const ProjectUrl = `${base}/p`;
export const AttachmentUrl = `${base}/a`;
export const VerifyUrl = `${base}/v`;
