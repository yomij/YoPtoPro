import compressFile from './core/compressFile';
import deleteFile from './core/deleteFile';
import helper from './core/helper';
import { connectServe, runCommand  } from './core/ssh';
import uploadFile from './core/uploadFile';
import { config } from './deploy.config';

// 主程序(可单独执行)
async function main() {
  try {
    const SELECT_CONFIG = (await helper(config)).value!; // 所选部署项目的配置信息
    console.log('您选择了部署 ' + SELECT_CONFIG.name);
    const targetFile = `${SELECT_CONFIG.releaseDir}.zip`; // 本地压缩文件
    const localFile = `${__dirname}/${targetFile}`; // 待上传本地文件
    if (SELECT_CONFIG.openCompress) {
      await compressFile(SELECT_CONFIG.targetDir, localFile, SELECT_CONFIG.releaseDir);
    }
    await connectServe(SELECT_CONFIG.ssh); // 连接
    await runCommand('mkdir -p ' + SELECT_CONFIG.deployDir);
    await uploadFile(SELECT_CONFIG, targetFile, localFile); // 上传
    await runCommand('unzip ' + targetFile, SELECT_CONFIG.deployDir); // 解压
    await runCommand('rm -f ' + targetFile, SELECT_CONFIG.deployDir); // 删除
    deleteFile(localFile); // 删除本地压缩文件
  } catch (err) {
    console.log('部署过程出现错误！', err);
  } finally {
    process.exit();
  }
}

async function t() {
  const SELECT_CONFIG = (await helper(config)).value!; // 所选部署项目的配置信息
  await connectServe(SELECT_CONFIG.ssh); // 连接
  await runCommand('ls');
  await runCommand('mkdir -p ' + SELECT_CONFIG.deployDir);
}
// run main
main();

// t();
