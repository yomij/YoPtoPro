import { ParameterizedContext } from 'koa';
import {Photograph} from '../Dao/photographDao';
import { route, verify, Router } from '../lib/route';
import {add, get, upload} from '../Service/Photograph.service';

@Router({ prefix: '/api/2c/photograph' })
export default class PhotographController2C {

  @route({ method: 'post',  path: '/'})
  @verify({
    type: 'body',
    rules: {
      tag: { type: 'array', required: false },
      pageNo: { type: 'number', required: true },
      pageSize: { type: 'number', required: true },
    },
  })
  async query(ctx: ParameterizedContext) {
    const { body } = ctx.request;
    ctx.body = await get(Number(body.pageNo), Number(body.pageSize), <string[]>body.tag);
  }
}
