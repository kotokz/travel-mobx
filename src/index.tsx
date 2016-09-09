import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "mobx-react";
import AppView from "./components/AppView";
import TimerView from "./components/TimerView";

import AppState from "./stores/AppStore";
import "./styles/app.css";


const appState =  new AppState();

let doc = document.getElementById("root");

if (doc)
  ReactDOM.render(
    <Provider appState={appState}>
      <Router history={browserHistory}>
        <Route path="/" component={AppView}>
          <IndexRoute component={TimerView}/>
          <Route path="timer" component={TimerView}/>
        </Route>
      </Router>
    </Provider>,
     doc);
