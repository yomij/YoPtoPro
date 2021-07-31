import qiniu from 'qiniu';
import appConfig from '../config';

// 需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = appConfig.QINIU_ACCESS_KEY;
qiniu.conf.SECRET_KEY = appConfig.QINIU_SECRET_KEY;

let mac = new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY);

// 上传到七牛
function upToQiniu(filePath: string, key: string) {
  const options = {
    scope: appConfig.QINIU_SCOPE, // 你的七牛存储对象
    // returnBody: `{"key":${sConfig.IMG_SERVER}"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}`
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config();
  // 空间对应的机房
  // @ts-ignore
  config.zone = qiniu.zone.Zone_z2;
  const localFile = filePath;
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  // 文件上传
  return new Promise((resolved, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr: Error | undefined, respBody: any, respInfo: any) {
      if (respErr) {
        reject(respErr);
      }
      if (respInfo.statusCode === 200) {
        resolved(respBody);
      } else {
        resolved(respBody);
      }
    });
  });

}

// 上传到七牛
function upToQiniuStream(stream: NodeJS.ReadableStream, key: string) {
  const options = {
    scope: appConfig.QINIU_SCOPE, // 你的七牛存储对象
    // returnBody: `{"key":${sConfig.IMG_SERVER}"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}`
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config();
  // 空间对应的机房
  // @ts-ignore
  config.zone = qiniu.zone.Zone_z2;

  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  // 文件上传
  return new Promise((resolve, reject) => {
    formUploader.putStream(uploadToken, key, stream, putExtra, function(respErr: Error | undefined, respBody: any, respInfo: any) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody);
      } else {
        reject(respInfo.statusCode);
      }
    });
  });

}

module.exports = {
  upToQiniu,
  upToQiniuStream,
};
