import { ParameterizedContext } from 'koa';
import { route, verify, Router } from '../lib/route';
import { createUser, login } from '../Service/User.service';

@Router({ prefix: '/user' })
export default class UserController {
  @route('post')
  @verify({
    type: 'body',
    rules: {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      type: { type: 'string', required: true },
      permission: { type: 'array', required: true },
    },
  })
  async create(ctx: ParameterizedContext) {
    const { body } = ctx.request;
    ctx.body = await createUser({
      password: body.password,
      username: body.username,
      permission: body.permission,
      type: body.type,
    });
  }

  @route('post')
  @verify({
    type: 'body',
    rules: {
      username: {type: 'string', required: true},
      password: {type: 'string', required: true},
    },
  })
  async login(ctx: ParameterizedContext) {
    const { body } = ctx.request;
    ctx.body = await login(body.username, body.password);
  }
}
