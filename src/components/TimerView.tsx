import * as React from "react";
import { observer, inject } from "mobx-react";
import AppState from "../stores/AppStore";

@inject("appState")
@observer
export default class TimerView extends React.Component<{appState?: AppState}, {}> {
    render() {
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
            </div>
        );
     }

     onReset = () => {
         this.props.appState.resetTimer();
     }
};