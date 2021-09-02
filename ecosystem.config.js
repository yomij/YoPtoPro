module.exports = {
  apps: [{
    name: 'YoPtoPro',
    script: 'node_modules/.bin/ts-node',
    watch: '.',
    args: 'src/app.ts'
  }],
  deploy: {
    production: {
      key: '~/.ssh/pm2deploy',
      user: 'yomi',
      host: [{
        host: '121.4.172.117',
        port: "22",
      }],
      ref: 'origin/dev',
      repo: 'git@github.com:yomij/YoPtoPro.git',
      path: 'project',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
