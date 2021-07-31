import {Rules} from 'async-validator';
import * as Koa from 'koa';
import {ParameterizedContext} from 'koa';

export type verifyType = 'query' | 'header' | 'body';

export type AnyParamConstructor<T> = new (...args: any) => T;

export type HTTP_METHOD = 'get' | 'post' | 'delete' | 'put';

export interface Interface {
  handler: Koa.Middleware;
  description: RouteOption;
}

export interface RouteOption {
  method: HTTP_METHOD;
  path?: string;
}

export interface VerifyOption {
  type: verifyType;
  rules: Rules;
  handleError?: (ctx: ParameterizedContext, e: Error) => any;
}
