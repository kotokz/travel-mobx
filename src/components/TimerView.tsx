import * as React from "react";
import { observer, inject } from "mobx-react";
import AppState from "../stores/AppStore";

@inject("appState")
@observer
export default class TimerView extends React.Component<{appState?: AppState}, {}> {
    render() {
        if (!this.props.appState)
            return <div> Not Yet Initialized </div>;
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
            </div>
        );
     }

     onReset = () => {
        if (this.props.appState)
            this.props.appState.resetTimer();
     }
};