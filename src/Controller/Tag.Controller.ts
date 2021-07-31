import { ParameterizedContext } from 'koa';
import { route, verify, Router } from '../lib/route';
import { createTag, getTagsByGroup } from '../Service/Tag.Service';

@Router({ prefix: 'tag' })
export default class TagController {
  @route('post')
  @verify({
    type: 'body',
    rules: {
      tag: { type: 'string', required: true },
      group: { type: 'string', required: true },
    },
  })
  async create(ctx: ParameterizedContext) {
    const { body } = ctx.request;
    ctx.body = await createTag({ tag: body.tag, group: body.group });
  }

  @route({
    method: 'get',
    path: '/',
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
