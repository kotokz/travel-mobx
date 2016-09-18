import * as React from "react";
import * as moment from "moment";
import * as _ from "lodash";

let indexOf = [].indexOf || function(item) { for (let i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

function get_calendar(year: number, month: number): MomentRange[] {

    let startDate = moment([year, month]);
    let currentDay = moment(startDate).startOf("month");
    let endDay = moment(startDate).endOf("month");

    let weeks: number[] = [];

    // monthRange.by("days", (moment) => {
    //   let ref: number;
    //   if (ref = moment.week(), indexOf.call(weeks, ref) < 0) {
    //     return weeks.push(moment.week());
    //   }
    // });

    do {
      let ref: number;
      if (ref = currentDay.week(), indexOf.call(weeks, ref) < 0) {
        weeks.push(currentDay.week());
      }
    }
    while (currentDay.add(1, "day").diff(endDay) < 1);

    let calendar: MomentRange[] = [];
    let firstWeekDay: moment.Moment;
    let lastWeekDay: moment.Moment;

    for (let i = 0, len = weeks.length; i < len; i++) {
      let week = weeks[i];
      if (i > 0 && week < weeks[i - 1]) {
      	// We have switched to the next year

        firstWeekDay = moment([year, month]).add(1, "year").week(week).day(1);
        lastWeekDay = moment([year, month]).add(1, "year").week(week).day(7);
      }
      else {
        firstWeekDay = moment([year, month]).week(week).day(1);
        lastWeekDay = moment([year, month]).week(week).day(7);
      }
      const weekRange = {
          start: firstWeekDay,
          end: lastWeekDay
      };
      calendar.push(weekRange);
    }

    return calendar;
}

interface CalendarState {
    date: moment.Moment;
    month: number;
    year: number;
    calendar: MomentRange[];
}

interface MomentRange {
    start: moment.Moment;
    end: moment.Moment;
}

export default class Calendar extends React.Component<{}, CalendarState> {

    constructor(props: any) {
        super(props);
        const month = moment().month();
        const year = moment().year();
        this.state = {
            date: moment(),
            month: month,
            year: year,
            calendar: get_calendar(year, month)
        };
    }
    setDate(day: moment.Moment, e: Event) {
        e.preventDefault();
        console.log(day);
        this.setState({
            date: day
        } as CalendarState);
    }
    nextMonth = (e: any) => {
        e.preventDefault();
        let month = 0;
        let year = 0;
        if (this.state.month === 11) {
            month = 0;
            year = this.state.year + 1;
        }
        else {
            month = this.state.month + 1;
            year = this.state.year;
        }

        this.setState({
            month: month,
            year: year,
            calendar: get_calendar(year, month)
        } as CalendarState);
    }
    previousMonth = (e: any) => {
        e.preventDefault();
        let month = 0;
        let year = 0;
        if (this.state.month === 0) {
            month = 11;
            year = this.state.year - 1;
        }
        else {
            month = this.state.month - 1;
            year = this.state.year;
        }

        this.setState({
            month: month,
            year: year,
            calendar: get_calendar(year, month)
        } as CalendarState);

    }
    render() {
        let context = this;
        let state = this.state;
        let setDate = this.setDate;
        let weekCount = 0;
        let weeks = state.calendar.map((week: MomentRange) => {
            weekCount++;
            let dayList: moment.Moment[] = [];
            // week.by("days", function(day: moment.Moment){
            //     dayList.push(day);
            // });
            let currentDay = week.start.clone();

            do {
                dayList.push(currentDay.clone());
            }
            while (currentDay.add(1, "day").diff(week.end) < 1);

            let days = dayList.map(function(day: moment.Moment){
                let isCurrentMonth = day.month() === state.month;
                let isToday = day.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY");
                let isSelected = day.format("DD-MM-YYYY") === state.date.format("DD-MM-YYYY");
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
                    <a href="#" className={ dayClasses } onClick={ setDate.bind(context, day) }>{ day.format("D") }</a>
                </td>;
            });
            return <tr key={ weekCount }>{ days }</tr>;
        });
        return <div>
            <div className="calendar">
                <table>
                    <thead>
                        <tr>
                            <td>
                                <a href="#" className="calendar__nav calendar__nav--previous" onClick={ this.previousMonth }>&lt;</a>
                            </td>
                            <td colSpan={5}><span className="calendar__selected-date">{ moment().month(this.state.month).format("MMMM") } { this.state.year }</span></td>
                            <td>
                                <a href="#" className="calendar__nav calendar__nav--next" onClick={ this.nextMonth }>&gt;</a>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {weeks}
                    </tbody>
                </table>
            </div>
            <div>
                Selection: { this.state.date.format("D MMMM YYYY") }
            </div>
        </div>;
    }
};