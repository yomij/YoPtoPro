import { ParameterizedContext } from 'koa';
import { route, verify, Router } from '../lib/route';
import {getTags, getTagsByGroup} from '../Service/Tag.Service';

@Router({ prefix: '/api/2c/tag' })
export default class TagController {

  @route({
    method: 'get',
    path: '/getByGroup',
  })
  @verify({
    type: 'query',
    rules: {
      group: { type: 'string', required: true },
    },
  })
  async getByGroup(ctx: ParameterizedContext) {
    const { query } = ctx.request;
    ctx.body = await getTagsByGroup(query.group as string);
  }
  
  @route({
    method: 'get',
    path: '/',
  })
  async getTag(ctx: ParameterizedContext) {
    const { query } = ctx.request;
    ctx.body = await getTags()
  }
}
