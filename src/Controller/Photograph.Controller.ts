import { ParameterizedContext } from 'koa';
import {Photograph} from '../Dao/photographDao';
import { route, verify, Router } from '../lib/route';
import {add, get, upload} from '../Service/Photograph.service';

@Router({ prefix: '/api/2b/photograph' })
export default class PhotographController {
  @route('post')
  @verify({
    type: 'body',
    rules: {
      blurStr: { type: 'string', required: true },
    },
  })
  async upload(ctx: ParameterizedContext) {
    const { files } = ctx.request;
    ctx.body = await upload(files?.file);
  }

  @route('post')
  async create(ctx: ParameterizedContext) {
    const { body } = ctx.request;
    ctx.body = await add(body as Photograph[]);
  }

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
    ctx.body = await get(Number(body.pageNo), Number(body.pageSize), <string[]>body.tags);
  }
}
