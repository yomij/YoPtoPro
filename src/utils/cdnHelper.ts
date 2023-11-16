import {TENCENT_OSS_CONFIG} from '../config';
const tencentcloud = require('tencentcloud-sdk-nodejs');

const cnd = new tencentcloud.cdn.v20180606.Client({
  credential: {
    secretId: TENCENT_OSS_CONFIG.SECRET_ID,
    secretKey: TENCENT_OSS_CONFIG.SECRET_KEY,
  },
});

export const refreshCDN = () =>
  cnd.PurgePathCache({
    Paths: [
      'http://yomij.com/',
      'http://yomij.com/assets',
    ],
    FlushType: 'flush',
  });
