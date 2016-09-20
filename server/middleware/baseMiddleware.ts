import { Context } from "koa";
import * as compress from "koa-compress";
import * as serve from "koa-static";
import * as mount from "koa-mount";
import * as compose from "koa-compose";
let logger = require("koa-logger");

export function serveStaticFiles() {
  const staticFolder = mount("/static", serve(`${__dirname}/../../static`));
  const distFolder = mount("/dist", serve(`${__dirname}/../../dist`));

  return compose([staticFolder, distFolder]);
}

export function baseErrorHandling() {
  return async (ctx: Context, next: Function) => {
    try {
      await next();
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  };
}

export function serverLogging() {
  return logger();
}

export function compressResponse() {
  return compress();
}
