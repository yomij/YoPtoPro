module.exports = {
  apps: [{
    name: 'YoPtoPro',
    script: 'app.js',
    watch: '.'
  }],
  deploy: {
    production: {
      user: 'root',
      host: ["yomij.com"],
      port: "22",
      ref: 'origin/master',
      repo: 'git@github.com:yomij/YoPtoPro.git',
      path: '/root/yomi',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
