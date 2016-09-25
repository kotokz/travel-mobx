import router from "./api";
import render from "./render";

export default async (ctx: any, next: () => Promise<any>) => {
  // api server through koa-router
  if (ctx.path.match(/^\/api/)) {
    return await router.routes()(ctx, next);
  }
  // others react-router to render
  await render(ctx, next);
};