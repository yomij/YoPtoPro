import { ParameterizedContext } from 'koa';
import { route, verify, Router } from '../lib/route';
import deploy from '../scripts/deploy-helper';
import {logger, loggerInfo} from "../utils/logger";

@Router({ prefix: '/deploy' })
export default class TagController {

  @route({
    method: 'get',
    path: '/',
  })
  async deploy(ctx: ParameterizedContext) {
    const { query } = ctx.request;
    console.log(query);
    deploy();
    ctx.body = { msg: 1 };
  }

  @route({
    method: 'post',
    path: '/',
  })
  async deployPost(ctx: ParameterizedContext) {
    const { body } = ctx.request;
    loggerInfo.info({a: 1});
    ctx.body = { msg: 1 };
  }
}
