import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import routes from "./routes";

import AppState from "./stores/AppStore";
import ShiftStore from "./stores/ShiftStore";
import CalendarStore from "./stores/CalendarStore";

import "./styles/app.css";

const appState =  new AppState();
const shiftStore = new ShiftStore();
shiftStore.getAllProducts();

const calendarStore = new CalendarStore();

let doc = document.getElementById("root");

if (doc)
  ReactDOM.render(
    <Provider appState={appState} shiftStore={shiftStore} calendarStore={calendarStore}>
      { routes }
    </Provider>,
     doc);
