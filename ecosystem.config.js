module.exports = {
  apps: [{
    script: 'app.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],
  
  deploy: {
    production: {
      user: 'root',
      host: ["yomij.cn"],
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
