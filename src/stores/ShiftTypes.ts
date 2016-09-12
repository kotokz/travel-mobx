import { ObservableMap } from "mobx";

export interface MonthDate {
  date: string;
  dayOfWeek: string;
  isoweekdate: number;
  isoFormat: string;
}

export enum Shift {
  Morning = 1,
  Normal,
  Late
}

export type ShiftMap = ObservableMap<Shift>;

export function SampleData() {
  return {
    "2016-01-01": Shift.Morning,
    "2016-01-04": Shift.Morning,
    "2016-01-05": Shift.Morning,
    "2016-01-06": Shift.Morning,
    "2016-01-07": Shift.Morning,
    "2016-01-08": Shift.Morning,
    "2016-01-11": Shift.Normal,
    "2016-01-12": Shift.Normal,
    "2016-01-13": Shift.Normal,
    "2016-01-14": Shift.Normal,
    "2016-01-15": Shift.Normal,
    "2016-01-18": Shift.Late,
    "2016-01-19": Shift.Late,
    "2016-01-20": Shift.Late,
    "2016-01-21": Shift.Late,
    "2016-01-22": Shift.Late,
    "2016-01-25": Shift.Morning,
    "2016-01-26": Shift.Morning,
    "2016-01-27": Shift.Morning,
    "2016-01-28": Shift.Morning,
    "2016-01-29": Shift.Morning,
  };
}
