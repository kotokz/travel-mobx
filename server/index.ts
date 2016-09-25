import * as Koa from "koa";
import * as webpack from "webpack";
import * as config from "config";
import {
  serverLogging,
  baseErrorHandling,
  serveStaticFiles,
  compressResponse
} from "./middleware/baseMiddleware";
import webpackDevMiddleware from "./middleware/webpack-dev";
import webpackHMRMiddleware from "./middleware/webpack-hmr";
import { injectState } from "./middleware/renderMiddleware";
import router from "./router";
import * as Pug from "koa-pug";

const app = new Koa();
// Enable koa-proxy if it has been enabled in the config.
// if (config.has("proxy")) {
//   const proxyOption = config.get("proxy");
//   app.use(convert(proxy(proxyOption)));
// }

const pug = new Pug({
  viewPath: "./server/views"
});
pug.use(app);

app
  .use(serverLogging())
  .use(baseErrorHandling());

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.util.getEnv("NODE_ENV") === "development") {
  const webpackConfig = require("../webpack.config");
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const publicPath = config.get("webpack.publicPath");
  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));
} else {
  app.use(compressResponse());
}

app
  .use(serveStaticFiles())
  .use(injectState())
  .use(router);

const port = config.get("server.port");
app.listen(port, () => {
  console.log(`Now server is listening at http://localhost:${port}/`);
});