const Router = require('koa-router')();
const photograph = require('./photograph');
// const wx = require('./wx');

Router.use(photograph.routes());
// Router.use(wx.routes());

module.exports = Router;