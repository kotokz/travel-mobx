import { action, ObservableMap, asMap, transaction } from "mobx";
import * as moment from "moment";
import * as _ from "lodash";
import { Shift, SampleData, MonthDate, ShiftMap } from "./ShiftTypes";


export default class ShiftStore {
  public peopleMap: ObservableMap<ShiftMap> = asMap();

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
        isoFormat: date.format("YYYY-MM-DD"),
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
      this.peopleMap.set("Tony Zhou", asMap().merge(SampleData()));
      this.peopleMap.set("Simon Fan", asMap().merge(SampleData()));
      this.peopleMap.set("Cashlin Chen", asMap().merge(SampleData()));
      this.peopleMap.set("Jay Yuan", asMap().merge(SampleData()));
      this.peopleMap.set("Lex Guan", asMap().merge(SampleData()));
      this.peopleMap.set("Sophie Su", asMap().merge(SampleData()));
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