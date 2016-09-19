import * as WebpackDevMiddleware from "webpack-dev-middleware";
import { Context } from "koa";
import { compiler } from "webpack";
import applyExpressMiddleware from "../libs/apply-express-middleware";

export default function (compiler: compiler.Compiler, publicPath: string) {

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    hot: true,
    quiet: false,
    noInfo: false,
    stats: {
      chunks : false,
      chunkModules : false,
      colors : true
    }
  });

  return async function koaWebpackDevMiddleware (ctx: Context, next: () => Promise<any>) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content: any) => (ctx.body = content),
      setHeader: function () {
        ctx.set.apply(ctx, arguments);
      }
    });

    if (hasNext) {
      await next();
    }
  };
}
