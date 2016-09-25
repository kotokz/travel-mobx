import * as moment from "moment";
import { action, observable, transaction } from "mobx";
import { MobxStore } from "./StoreTypes";

export interface CalendarState {
  date: moment.Moment;
  month: number;
  year: number;
  calendar: MomentRange[];
}

export interface MomentRange {
  start: moment.Moment;
  end: moment.Moment;
}

export default class CalendarStore implements MobxStore {
  //  @observable state: CalendarState;
  @observable date: moment.Moment;
  @observable month: number;
  @observable year: number;
  @observable calendar: MomentRange[];

  constructor(initialState?: CalendarStore) {
    if (initialState) {
      Object.assign(this, initialState);
      this.date = moment(initialState.date);
      this.calendar = get_calendar(this.year, this.month);
    } else {
      const month = moment().month();
      const year = moment().year();
      this.date = moment();
      this.month = month;
      this.year = year;
      this.calendar = get_calendar(year, month);
    }

  }

  ToStringArray(): string[] {
    return [
      this.month.toString(),
      this.year.toString(),
      this.date.format("YYYY-MM-DD")
    ];
  }

  FromStringArray(value: string[]) {
    transaction(() => {
      this.month = parseInt(value[0]);
      this.year = parseInt(value[1]);
      this.date = moment(value[2]);
      this.calendar = get_calendar(this.month, this.year);
    });
  }

  @action previousMonth(): void {
    let month = 0;
    let year = 0;
    if (this.month === 0) {
      month = 11;
      year = this.year - 1;
    } else {
      month = this.month - 1;
      year = this.year;
    }

    transaction(() => {
      this.month = month;
      this.year = year;
      this.calendar = get_calendar(year, month);
    });

  }

  @action setDate(day: moment.Moment) {
    this.date = day;
  }

  @action nextMonth() {
    let month = 0;
    let year = 0;
    if (this.month === 11) {
      month = 0;
      year = this.year + 1;
    } else {
      month = this.month + 1;
      year = this.year;
    }

    transaction(() => {
      this.month = month;
      this.year = year;
      this.calendar = get_calendar(year, month);
    });
  }
}

let indexOf = [].indexOf || function (item) {
  for (let i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) return i;
  }
  return -1;
};

function get_calendar(year: number, month: number): MomentRange[] {

  const startDate = moment([year, month]);
  const currentDay = moment(startDate).startOf("month");
  const endDay = moment(startDate).endOf("month");

  let weeks: number[] = [];

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
    } else {
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