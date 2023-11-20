module.exports = {
  apps: [{
    name: 'YoPtoPro',
    script: 'node_modules/.bin/ts-node',
    watch: '.',
    args: 'src/app.ts'
  }],
  deploy: {
    production: {
      key: '~/.ssh/server',
      user: 'yomi',
      host: [{
        host: '150.158.198.110',
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
