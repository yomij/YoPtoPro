const Router = require('koa-router')();
const photograph = require('./photograph');


Router.use(photograph.routes());

module.exports = Router;