import * as Koa from "koa";
import * as webpack from "webpack";
import * as serve from "koa-static";
import * as mount from "koa-mount";
import * as compose from "koa-compose";
import * as config from "config";
import webpackDevMiddleware from "./middleware/webpack-dev";
import webpackHMRMiddleware from "./middleware/webpack-hmr";
import { renderReact }  from "./middleware/renderMiddleware";
import router from "./router";
let Pug = require("koa-pug");

function serveStaticFiles() {
  console.log(`${__dirname}/../dist`);
  const staticFolder = mount("/static", serve(`${__dirname}/../static`));
  const distFolder = mount("/dist", serve(`${__dirname}/../dist`));

  return compose([staticFolder, distFolder]);
}

const app = new Koa();
// Enable koa-proxy if it has been enabled in the config.
// if (config.has("proxy")) {
//   const proxyOption = config.get("proxy");
//   app.use(convert(proxy(proxyOption)));
// }

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
// app.use(convert(historyApiFallback({
//   verbose: false
// })));

const pug = new Pug({ viewPath: "./server/views" });
pug.use(app);

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
}

app.use(serveStaticFiles());
app.use(router.routes());
app.use(renderReact());

const port = config.get("server.port");
app.listen(port, () => {
  console.log(`Now server is listening at http://localhost:${port}/`);
});
