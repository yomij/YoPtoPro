import {ExtendableContext, Next} from 'koa';
import Koa from 'koa';
import koaBody from 'koa-body';
import path from 'path';
import config from './config';

const cors = require('koa2-cors');
const serve = require('koa-static');

const jwtKoa = require('koa-jwt');
const jwt = require('jsonwebtoken');
const verify = require('util').promisify(jwt.verify);

const main = serve(path.join(__dirname, 'public'));
const app = new Koa();
import {getRouterFromClass} from './lib/route';
import r from './router';

import PhotographController from './Controller/Photograph.Controller';
import TagController from './Controller/Tag.Controller';
import UCController from './Controller/User.Controller';

// 连接mongoose
require('./utils/dbConnect')();

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 20 * 1024 * 1024, // 设置上传文件大小最大限制
  },
}));

interface VerifyContext extends ExtendableContext {
  verify: string;
  state: {
    userToken: string | null;
  };
}

// Custom 401 handling
// app.use(async (ctx: VerifyContext, next: Next) => {
//   ctx.verify = verify;
//   if (ctx.query.token) {
//     try {
//       ctx.state.userToken = await verify(ctx.query.token, config.SECRET);
//     } catch (e) {
//       ctx.state.userToken = null;
//     }
//   }
//   return next().catch((err) => {
//     if (401 === err.status) {
//       ctx.status = 401;
//       ctx.body = {
//         status: 401,
//         data: null,
//         message: 'token失效请重新登陆',
//       };
//     } else {
//       throw err;
//     }
//   });
// });

// token
// app.use(jwtKoa(
//   {
//     debug: true,
//     secret: config.SECRET,
//   }).unless({
//   path: [
//     /^\/api\/user\/phone*/,
//     /^\/api\/.+\/t0/,
//     /^\/api\/.+\/t0\/*/,
//     '/api/user/WXlogin',
//     '/api/user/login',
//     /.+\.[html|ico|jpg)]/,
//     // /^\/api2b\/*/
//   ], // 数组中的路径不需要通过jwt验证
// }));

// logger
app.use(async (ctx: ExtendableContext, next: Next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx: ExtendableContext, next: Next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// console.log(Route());
app.use(cors());
app.use(main);
// app.use(Route);
app.use(getRouterFromClass(UCController));
app.use(getRouterFromClass(PhotographController));
app.use(getRouterFromClass(TagController));
app.use(r);

// console.log(Router)
app.listen(
  config.APP_PORT,
  () =>
    console.log(`running http://localhost:${config.APP_PORT}/test.html`,
      'test',
    ),
);
