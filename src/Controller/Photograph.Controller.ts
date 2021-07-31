import { ParameterizedContext } from 'koa';
import { route, verify, Router } from '../lib/route';
import {add, upload} from '../Service/Photograph.service';

@Router({ prefix: 'photograph' })
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
    await add();
  }
}
