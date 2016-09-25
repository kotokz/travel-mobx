import * as koaRouter from "koa-router";
import { Context } from "koa";

const router = new koaRouter();
router.prefix("/api");
router.get("/", async(ctx: Context, next: Function) => {
  console.log("Setting counter random value and getting a random user profile");

  await next();
});

export default router;