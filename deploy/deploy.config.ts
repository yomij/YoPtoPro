/*
  deploy.config.js说明：
  ssh: 连接服务器用户信息
  targetDir: 需要压缩的文件目录（启用本地压缩后生效）
  openCompress: 关闭后，将跳过本地文件压缩，直接上传同级目录下指定文件
  openBackUp: 开启后，若远端存在相同目录，则会修改原始目录名称，不会直接覆盖
  deployDir: 指定远端部署地址
  releaseDir: 指定远端部署地址下的发布目录名称
*/

export interface DeployConfig {
  name: string;
  ssh: {
    host: string;
    port: number;
    username: string;
    password?: string;
    privateKey?: string;
    passphrase?: string;
  };
  targetDir: string;
  openCompress: boolean;
  openBackUp?: boolean;
  deployDir: string;
  releaseDir: string;
}

export const config: DeployConfig[] = [
  {
    name: 'y2',
    ssh: {
      host: '150.158.198.110',
      port: 22,
      username: 'yomi',
      // password: 'HLJhp111',
      privateKey: '-----BEGIN OPENSSH PRIVATE KEY-----\n' +
        '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\n' +
        '-----END OPENSSH PRIVATE KEY-----\n', // ssh私钥(不使用此方法时请勿填写， 注释即可)
      // passphrase: 's', // ssh私钥对应解密密码(不存在设为''即可)
    },
    targetDir: '../../src', // 目标压缩目录(可使用相对地址)
    openCompress: true, // 是否开启本地压缩
    openBackUp: true, // 是否开启远端备份
    deployDir: 'node_deploy/y2', // 远端目录
    releaseDir: 'dist', // 发布目录
  },
];
