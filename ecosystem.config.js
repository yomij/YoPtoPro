module.exports = {
  apps: [{
    name: 'YoPtoPro',
    script: 'app.js',
    watch: '.'
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

      repo: 'https://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@github.com/yomij/YoPtoPro.git',
      path: 'project',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
