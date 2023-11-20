module.exports = {
  apps: [{
    name: 'YoPtoPro',
    script: 'dist/src/app.js',
    watch: ['dist'],
    ignore_watch: [
      'dist/src/logs',
    ]
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
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
