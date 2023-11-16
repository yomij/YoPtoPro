import { ParameterizedContext } from 'koa';
import { route, Router } from '../lib/route';
import {doRefresh} from '../Service/Util.Service';
import { loggerInfo } from '../utils/logger';

@Router({ prefix: '/project' })
export default class TagController {

  @route({
    method: 'get',
  })
  async refreshFrontCND(ctx: ParameterizedContext) {
    const { query } = ctx.request;
    loggerInfo.info(query);
    ctx.body = await doRefresh();
  }
}


@Router({ prefix: '/' })
export class HealthController {

  @route({
    method: 'get',
  })
  async health(ctx: ParameterizedContext) {
    const { query } = ctx.request;
    loggerInfo.info(query);
    ctx.body = 'success'
  }
}