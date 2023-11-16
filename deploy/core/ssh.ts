import {Config, NodeSSH} from 'node-ssh';
export const ssh = new NodeSSH();

// 连接服务器
export function connectServe(sshInfo: Config) {
  return new Promise((resolve, reject) => {
    ssh.connect({ ...sshInfo }).then(() => {
      resolve(console.log('3-' + sshInfo.host + ' 连接成功'));
    }).catch((err) => {
      reject(console.error('3-' + sshInfo.host + ' 连接失败', err));
    });
  });
}

export function runCommand(command: string, path?: string) {
  return new Promise((resolve, reject) => {
    ssh.execCommand(command, {
      cwd: path,
      onStdout: (v) => {
        console.log(v.toString());
      },
    }).then((res) => {
      if (res.stderr) {
        reject(console.error('命令执行发生错误:' + res.stderr));
        process.exit();
      } else {
        resolve(console.log(command + ' 执行完成！'));
      }
    });
  });
}

