import  * as WebpackHotMiddleware from "webpack-hot-middleware";
import { Context } from "koa";
import { compiler } from "webpack";
import applyExpressMiddleware from "../libs/apply-express-middleware";

export default function (compiler: compiler.Compiler, opts?: any) {
  const middleware = WebpackHotMiddleware(compiler, opts);
  return async function koaWebpackHMR (ctx: Context, next: () => Promise<any>) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);

    if (hasNext && next) {
      await next();
    }
  };
}
