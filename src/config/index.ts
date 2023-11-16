import path from 'path';
import qiniu from 'qiniu';

export const TENCENT_OSS_CONFIG = {
  SECRET_ID: 'AKIDxjGWXHkwsYw3tTr1uYw3tSklW0EApENF',
  SECRET_KEY: 'cy3rOM3TbS2NQChvta081dy2qNdcKmxq',
  BUCKET: 'y2-p-1258869367',
  REGION: 'ap-shanghai',
  IMG_SERVER: 'http://img.yomij.com/',
};

export const QINIU_OSS_CONFIG = {
  IMG_SERVER: 'http://imgqiniu.yomij.com/',
  QINIU_ACCESS_KEY: 'FRCRP7V2kY12Pt3EOoxhO3T4sgKkwvOoG12pBqaT',
  QINIU_SECRET_KEY: 'y55ZOLjQ9yeSJjpOvHR45gT4KShU0HBzKfgzcs4Z',
  BUCKET: 'yomi-pic-origin',
  REGION: qiniu.zone.Zone_z2,
};

export default {
  APP_PORT: 3333,
  PHOTOGRAPH_PATH: path.join(process.cwd(), 'public', 'photograph'),
  PHOTOGRAPH_SIZE_SMALL: 416,
  PHOTOGRAPH_SIZE_MIDDLE: 1000,
  DB_NAME: 'YomiWebside',
  DB_PROT: 27017,
  DB_HOST: 'localhost',
  SECRET: 'yomi',
  TENCENT_OSS_CONFIG,
  QINIU_OSS_CONFIG,
};
