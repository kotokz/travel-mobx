import { Context } from "koa";
import { match } from "react-router";
import render from "../middleware/renderMiddleware";
import routes from "../../src/routes";

function _match (location: any): Promise<any> {
  return new Promise((resolve, reject) => {
    match(location, (error, redirectLocation, renderProps) => {
      if (error) {
        return reject(error);
      }
      resolve({redirectLocation, renderProps});
    });
  });
}
export default async (ctx: Context, next: Function) => {
  try {
    const { redirectLocation, renderProps } = await _match({ routes, location: ctx.url });
    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      await render(ctx, next, renderProps);
    } else {
      await next();
    }
  } catch (e) {
    console.error("Server-Render Error Occurs: %s", e.stack);
    // await ctx.render("500", {
    //   msg: ctx.app.env === "development" ? e.message : false
    // });
  }
};