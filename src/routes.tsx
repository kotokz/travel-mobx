import * as React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import AppView from "./components/AppView";
import TimerView from "./components/TimerView";
import MonthView from "./components/MonthView";

export default (
  <Router history={browserHistory}>
    <Route path="/" component={AppView}>
      <IndexRoute component={TimerView}/>
      <Route path="timer" component={TimerView}/>
      <Route path="month" component={MonthView}/>
    </Route>
  </Router>
);