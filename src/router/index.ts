import Router from 'koa-router';

const route = new Router();

route.get('/a', (ctx) => {
  ctx.body = {
    t: 1,
  };
});

export default route.routes();
