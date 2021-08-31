import Schema from 'async-validator';
import * as Koa from 'koa';
import KoaRouter from 'koa-router';

import {ParameterizedContext} from 'koa';
import { AnyParamConstructor, HTTP_METHOD, Interface, RouteOption, VerifyOption } from './define';

const routerMap = new Map<any, Map<string, Interface>>();
const verifyMap = new Map<any, Map<string, VerifyOption[]>>();

const routeMap = new Map<any, KoaRouter>();
const middlewareList: Koa.Middleware[] = [];

function createHandler(handler: KoaRouter.IMiddleware, verifyOptions?: VerifyOption[] ) {
  try {
    if (verifyOptions && verifyOptions.length) {
      return async (ctx: ParameterizedContext, ...rest: any[]) => {
        for (let i = 0; i < verifyOptions.length; i++) {
          const option = verifyOptions[i];
          try {
            // @ts-ignore
            await createAsyncValidator(option)(ctx, ...rest);
          } catch (e: any) {
            if (option.handleError) {
              option.handleError(ctx, e);
            } else {
              ctx.status = 400;
              ctx.body = {
                status: 400,
                message: e.errors,
              };
            }
            return;
          }
        }
        // @ts-ignore
        await handler(ctx, ...rest);
      };
    }
  } catch (e) {
    throw e;
  }

  return handler;
}

export function Router(opt?: KoaRouter.IRouterOptions) {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    const originRouterMap = routerMap.get(constructor.prototype);
    let router: KoaRouter;
    if (!originRouterMap?.size) {
      router = new KoaRouter(opt);
    } else {
      router = new KoaRouter({
        ...(opt || {}),
        prefix: opt?.prefix?.startsWith('/') ? opt?.prefix : `/${opt?.prefix}` || `/${constructor.name}`,
      });
      try {
        originRouterMap.forEach(item => {
          const { description } = item;
          const verifyOpts = verifyMap.get(constructor.prototype)?.get(item.handler.name);
          router[description.method](
            description.path || `/${item.handler.name}`,
            createHandler(item.handler, verifyOpts),
          );
        });
      } catch (e) {
        console.log(e);
      }
    }
    routeMap.set(constructor.prototype, router);
  };
}

export function route(opt: HTTP_METHOD | RouteOption) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let option: RouteOption = typeof opt === 'string'
      ? { method: opt.toLowerCase() as HTTP_METHOD }
      : { ...opt };
    let map = routerMap.get(target) || new Map<string, Interface>();
    map.set(propertyKey, {
      description: option,
      handler: descriptor.value,
    });
    routerMap.set(target, map);
  };
}

function createAsyncValidator(opt: VerifyOption) {
  return async function AsyncValidator(ctx: ParameterizedContext) {
    let data = {
      ...(ctx.request[opt.type] || {}),
    };
    const schema = new Schema(opt.rules);
    await schema.validate(data);
  };
}

export function verify<T>(opt: VerifyOption | VerifyOption[]) {
  return function<T>(target: any, propertyKey: string) {
    let map = verifyMap.get(target) || new Map<string, VerifyOption[]>();
    if (!Array.isArray(opt)) {
      opt = [ opt ];
    }
    map.set(propertyKey, opt);
    verifyMap.set(target, map);
  };
}

export function getRouterFromClass<U extends AnyParamConstructor<any>>(cl: U, ops: any[] = []) {
  new cl(...ops);
  return routeMap.get(cl.prototype)?.routes() || (() => void 0);
}
