import { observable, computed, action, useStrict, ObservableMap, asMap } from "mobx";
import * as moment from "moment";
import * as _ from "lodash";
import { Shift, SampleData, MonthDate, ShiftMap } from "./ShiftTypes";

export default class ShiftStore {
  public peopleMap: ObservableMap<ShiftMap> = asMap();

  getDaysByMonth(year: number, month: number): Array<MonthDate> {
    let days: Array<MonthDate> = [];
    let monthDate = moment().year(year).month(month).startOf("month");

    _.times(monthDate.daysInMonth(), n => {
      days.push({
        date: monthDate.format("MMM/D"),
        dayOfWeek: monthDate.format("ddd"),
        isoweekdate: monthDate.isoWeekday(),
      });
      monthDate.add(1, "day");
    });
    return days;
  }

  getDaysByWeek(year: number, week: number): Array<MonthDate> {
    let days: Array<MonthDate> = [];
    let monthDate = moment().year(year).day("Monday").week(week);

    _.times(7, n => {
      days.push({
        date: monthDate.format("MMM/D"),
        dayOfWeek: monthDate.format("ddd"),
        isoweekdate: monthDate.isoWeekday(),
      });
      monthDate.add(1, "day");
    });
    return days;
  }

  @action SetShift(name: string, newShift: Shift, date: MonthDate) {
    this.peopleMap.get(name).set(date.date, newShift);
  }

  @action getAllProducts(): void {
    this.peopleMap.set("Tony Zhou", asMap().merge(SampleData()));
    this.peopleMap.set("Simon Fan", asMap().merge(SampleData()));
    this.peopleMap.set("Cashlin Chen", asMap().merge(SampleData()));
    this.peopleMap.set("Jay Yuan", asMap().merge(SampleData()));
    this.peopleMap.set("Lex Guan", asMap().merge(SampleData()));
    this.peopleMap.set("Sophie Su", asMap().merge(SampleData()));
  }
}