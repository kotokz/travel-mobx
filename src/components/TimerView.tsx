import * as React from "react";
import { observer, inject } from "mobx-react";
import AppState from "../stores/AppStore";

@inject("AppState")
@observer
export default class TimerView extends React.Component<{AppState?: AppState}, {}> {
    render() {
        if (!this.props.AppState)
            return <div> Not Yet Initialized </div>;
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.AppState.timer}
                </button>
            </div>
        );
     }

     onReset = () => {
        if (this.props.AppState)
            this.props.AppState.resetTimer();
     }
};