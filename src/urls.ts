// const base = 'http://132.232.28.32:23978';
const base = `http://${process.env.NODE_ENV !== 'production' ? 'localhost' : '132.232.28.32'}:23978`;

export default {
  project: `${base}/p`,
  attachment: `${base}/a`,
  verify: `${base}/v`,
  menu: `${base}/m`,
  billQuery: `${base}/bq`,
};
