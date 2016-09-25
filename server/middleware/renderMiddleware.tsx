import * as React from "react";
import { Context } from "koa";
import { RouterContext } from "react-router";
let { renderToString } = require("react-dom/server");
import { Provider } from "mobx-react";
import { getFreshStores } from "../../src/utils";

export function injectState() {
  return async(ctx: Context, next: Function) => {
    console.log("Injecting (MobX) state into current request/response context");

    ctx.state.mobx = getFreshStores();

    await next();
  };
}

export default async (ctx: any, next: Function, renderProps: any) => {

  const html = renderToString(
      <Provider {...ctx.state.mobx}>
        <RouterContext {...renderProps} />
      </Provider>
    );
  await ctx.render("base", {
      html,
      initialState: JSON.stringify(ctx.state.mobx)
    });
};
