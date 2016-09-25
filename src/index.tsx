import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import routes from "./routes";
import { createStoresFromState } from "./utils";

if (typeof document !== "undefined") {
  require("./styles/app.css");
  let doc = document.getElementById("root");

  if (doc) {
    const initialState = JSON.parse((window as any).__INITIAL_STATE__ as string);
    const stores = createStoresFromState(initialState);

    ReactDOM.render(
      <Provider { ...stores }>
        { routes }
      </Provider>,
      doc);
  }
}
