import COS from 'cos-nodejs-sdk-v5';
import {TENCENT_OSS_CONFIG} from '../config';

const cos = new COS({
  SecretId: TENCENT_OSS_CONFIG.SECRET_ID,
  SecretKey: TENCENT_OSS_CONFIG.SECRET_KEY,
});

export function upToTencentStream(buff: NodeJS.ReadableStream, key: string) {
  return cos.putObject({
    Bucket: TENCENT_OSS_CONFIG.BUCKET,
    Region: TENCENT_OSS_CONFIG.REGION,
    Key: key,
    Body: buff,
  });
}
