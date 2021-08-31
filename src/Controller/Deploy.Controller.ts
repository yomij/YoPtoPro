import { ParameterizedContext } from 'koa';
import { route, verify, Router } from '../lib/route';
import deploy from '../scripts/deploy-helper';

@Router({ prefix: '/deploy' })
export default class TagController {

  @route({
    method: 'get',
    path: '/',
  })
  async deploy(ctx: ParameterizedContext) {
    const { query } = ctx.request;
    deploy();
  }
}
