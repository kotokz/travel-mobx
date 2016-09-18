import * as React from "react";
import * as moment from "moment";
import { observer, inject } from "mobx-react";
import CalendarStore, {MomentRange} from "../stores/CalendarStore";

@inject("calendarStore")
@observer
export default class Calendar extends React.Component<{calendarStore?: CalendarStore}, {}> {

    nextMonth = () => {
        if (this.props.calendarStore)
           this.props.calendarStore.nextMonth();
    }
    previousMonth = () => {
        if (this.props.calendarStore)
           this.props.calendarStore.previousMonth();
    }
    render() {
        if (!this.props.calendarStore)
            return <div> Not Yet Initialized </div>;
        return <div>
            <div className="calendar">
                <table>
                    <thead>
                        <tr>
                            <td>
                                <a href="#" className="calendar__nav calendar__nav--previous" onClick={ this.previousMonth }>&lt;</a>
                            </td>
                            <td colSpan={5}><span className="calendar__selected-date">
                                { moment().month(this.props.calendarStore.month).format("MMMM") } { this.props.calendarStore.year }
                                </span></td>
                            <td>
                                <a href="#" className="calendar__nav calendar__nav--next" onClick={ this.nextMonth }>&gt;</a>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.calendarStore.calendar.map((week: MomentRange, index: number) => {
                            return <WeekRow key={index} week={week}/>;
                        })}
                    </tbody>
                </table>
            </div>
            <SelectionDiv calendarStore={this.props.calendarStore}/>
        </div>;
    }
};

@observer
class SelectionDiv extends React.Component<{calendarStore: CalendarStore}, {}> {
    render() {
        if (!this.props.calendarStore)
            return <div> Not Yet Initialized </div>;
        return  <div>
                Selection: { this.props.calendarStore.date.format("D MMMM YYYY") }
        </div>;
    }
}

@observer
class WeekRow extends React.Component<{week: MomentRange}, {}> {
    render() {
        const dayList: moment.Moment[] = [];
        const currentDay = this.props.week.start.clone();
        do {
            dayList.push(currentDay.clone());
        }
        while (currentDay.add(1, "day").diff(this.props.week.end) < 1);

        return <tr>{ dayList.map( (day: moment.Moment, index: number) => {
            return <DayCell day={day} key={`day${index}`}/>;
        })}</tr>;
    }
}

@inject("calendarStore")
@observer
class DayCell extends React.Component<{day: moment.Moment, calendarStore?: CalendarStore}, {}> {
    setDate(day: moment.Moment) {
        if (this.props.calendarStore)
            this.props.calendarStore.setDate(day);
    }
    render() {
        if (!this.props.calendarStore)
            return <td><div> Not Yet Initialized </div></td>;
        const day = this.props.day;
        const isCurrentMonth = day.month() === this.props.calendarStore.month;
        const isToday = day.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY");
        const isSelected = day.format("DD-MM-YYYY") === this.props.calendarStore.date.format("DD-MM-YYYY");
        let dayClasses = "calendar__day";
        if (!isCurrentMonth) {
            dayClasses += " calendar__day--muted";
        }
        if (isSelected) {
            dayClasses += " calendar__day--selected";
        }
        if (isToday) {
            dayClasses += " calendar__day--today";
        }
        return <td key={day.format("D-MM")}>
            <a className={ dayClasses } onClick={ () => this.setDate(day) }>{ day.format("D") }</a>
        </td>;
    }
}