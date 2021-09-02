import fs from 'fs';
import Koa, {ExtendableContext, Next} from 'koa';
import koaBody from 'koa-body';
import path from 'path';
import config from './config';
import registerRoute from './Controller';
import { logger, accessLogger } from "./utils/logger";

const cors = require('koa2-cors');
const serve = require('koa-static');

const jwtKoa = require('koa-jwt');
const jwt = require('jsonwebtoken');
const verify = require('util').promisify(jwt.verify);

const assetsPath = path.join(__dirname, '../public/dist');
const main = serve(assetsPath);
const app = new Koa();

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

app.use(accessLogger());

app.use(async (ctx, next) => { // history 中间件
  await next(); // 等待请求执行完毕
  const router = [
    '/photograph',
  ];
  if (ctx.response.status === 404 && router.includes(ctx.request.url)) { // 判断是否符合条件
    ctx.type = 'text/html; charset=utf-8'; // 修改响应类型
    ctx.body = fs.readFileSync(path.join(assetsPath, 'index.html')); // 修改响应体
  }
});

// console.log(Route());
app.use(cors());
app.use(main);
// app.use(Route);
registerRoute(app);

app.on('error', err => logger.error(err));

// console.log(Router)
app.listen(
  config.APP_PORT,
  () =>
    console.log(`running http://localhost:${config.APP_PORT}`,
      'test',
    ),
);
