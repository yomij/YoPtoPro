import { ParameterizedContext } from 'koa';
import { route, verify, Router } from '../lib/route';
import { getTagsByGroup } from '../Service/Tag.Service';

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
  async getTag(ctx: ParameterizedContext) {
    const { query } = ctx.request;
    ctx.body = await getTagsByGroup(query.group as string);
  }
}
