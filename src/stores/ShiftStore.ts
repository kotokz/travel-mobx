import { action, ObservableMap, asMap, transaction, observable } from "mobx";
import * as moment from "moment";
import * as _ from "lodash";
import { Shift, SampleData, MonthDate, ShiftMap } from "./ShiftTypes";
import { MobxStore } from "./StoreTypes";

export default class ShiftStore implements MobxStore {
  public peopleMap: ObservableMap<ShiftMap> = asMap();

  constructor(initialState?: ShiftStore) {
    if (initialState) {
      //Object.assign(this, initialState);
      this.peopleMap = asMap().merge(initialState.peopleMap);
    }
    this.getAllProducts();
  }
  ToStringArray(): string[] {
    return [];
  }

  FromStringArray(value: string[]) {
    // transaction(() => {
    //   this.peopleMap = asMap().merge(value);
    // });
  }
  getDaysByMonth(year: number, month: number): Array<MonthDate> {
    let monthDate = moment().year(year).month(month).startOf("month");
    return this.DateToArray(monthDate, monthDate.daysInMonth());
  }

  getDaysByWeek(year: number, week: number): Array<MonthDate> {
    let monthDate = moment().year(year).day("Monday").week(week);
    return this.DateToArray(monthDate, 7);
  }

  DateToArray(date: moment.Moment, len: number): Array<MonthDate> {
    let days: Array<MonthDate> = [];

    _.times(len, () => {
      days.push({
        date: date.format("MMM/D"),
        dayOfWeek: date.format("ddd"),
        isoweekdate: date.isoWeekday(),
        isoFormat: date.format("YYYY-MM-DD")
      });
      date.add(1, "day");
    });
    return days;
  }

  @action SetShift(name: string, newShift: Shift, date: MonthDate) {
    this.peopleMap.get(name).set(date.isoFormat, newShift);
  }

  @action getAllProducts(): void {
    transaction(() => {
      this.peopleMap.set("Adam Tom", asMap().merge(SampleData()));
      this.peopleMap.set("Steven Fan", asMap().merge(SampleData()));
      this.peopleMap.set("Adrian Chen", asMap().merge(SampleData()));
      this.peopleMap.set("Dan luke", asMap().merge(SampleData()));
      this.peopleMap.set("Alex An", asMap().merge(SampleData()));
      this.peopleMap.set("Sophie Xie", asMap().merge(SampleData()));
    });
  }

  @action SetWholeWeekShift(name: string, newShift: Shift, date: MonthDate) {
    let weekDate = moment(date.isoFormat).startOf("week");
    transaction(() => {
      _.times(5, () => {
        weekDate.add(1, "day");
        this.peopleMap.get(name).set(weekDate.format("YYYY-MM-DD"), newShift);
      });
    });
  }
}