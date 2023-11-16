import {DeployConfig} from '../deploy.config';
import getCurrentTime from './handleTime';
import {runCommand} from './ssh';
import { ssh } from './ssh';

// 文件上传(ssh对象、配置信息、本地待上传文件)
async function uploadFile(config: DeployConfig, targetFile: string, localFile: string) {
  return new Promise((resolve, reject) => {
    console.log('4-开始文件上传');
    handleSourceFile(config);
    ssh.putFile(localFile, config.deployDir + '/' + targetFile).then(async () => {
      resolve(console.log('5-文件上传完成'));
    }, (err: Error) => {
      reject(console.error('5-上传失败！', err));
    });
  });
}

// 处理源文件(ssh对象、配置信息)
async function handleSourceFile(config: DeployConfig) {
  if (config.openBackUp) {
    console.log('已开启远端备份!');
    await runCommand(
      `
      if [ -d ${config.releaseDir} ];
      then mv ${config.releaseDir} ${config.releaseDir}_${getCurrentTime()}
      fi
      `,
      config.deployDir);
  } else {
    console.log('提醒：未开启远端备份!');
    await runCommand(
      `
      if [ -d ${config.releaseDir} ];
      then mv ${config.releaseDir} /tmp/${config.releaseDir}_${getCurrentTime()}
      fi
      `,
      config.deployDir);
  }
}

export default uploadFile;
