import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "mobx-react";
import AppView from "./components/AppView";
import TimerView from "./components/TimerView";
import MonthView from "./components/MonthView";

import AppState from "./stores/AppStore";
import ShiftStore from "./stores/ShiftStore";

import "./styles/app.css";


const appState =  new AppState();
const shiftStore = new ShiftStore();
shiftStore.getAllProducts();

let doc = document.getElementById("root");

if (doc)
  ReactDOM.render(
    <Provider appState={appState} shiftStore={shiftStore}>
      <Router history={browserHistory}>
        <Route path="/" component={AppView}>
          <IndexRoute component={TimerView}/>
          <Route path="timer" component={TimerView}/>
          <Route path="month" component={MonthView}/>
        </Route>
      </Router>
    </Provider>,
     doc);
