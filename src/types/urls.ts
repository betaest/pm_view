// const base = 'http://132.232.28.32:23978';
const base = `http://${process.env.NODE_ENV !== 'production' ? 'localhost' : '132.232.28.32'}:23978`;

export const ProjectUrl = `${base}/p`;
export const AttachmentUrl = `${base}/a`;
export const VerifyUrl = `${base}/v`;
export const MenuUrl = `${base}/m`;
export const BillQueryUrl = `${base}/b`;
