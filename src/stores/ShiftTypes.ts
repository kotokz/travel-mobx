import { ObservableMap } from "mobx";

export interface MonthDate {
  date: string;
  dayOfWeek: string;
  isoweekdate: number;
}

export enum Shift {
  Morning = 1,
  Normal,
  Late
}

export type ShiftMap = ObservableMap<Shift>;

export function SampleData() {
  return {
    "Jan/1": Shift.Morning,
    "Jan/4": Shift.Morning,
    "Jan/5": Shift.Morning,
    "Jan/6": Shift.Morning,
    "Jan/7": Shift.Morning,
    "Jan/8": Shift.Morning,
    "Jan/11": Shift.Normal,
    "Jan/12": Shift.Normal,
    "Jan/13": Shift.Normal,
    "Jan/14": Shift.Normal,
    "Jan/15": Shift.Normal,
    "Jan/18": Shift.Late,
    "Jan/19": Shift.Late,
    "Jan/20": Shift.Late,
    "Jan/21": Shift.Late,
    "Jan/22": Shift.Late,
    "Jan/25": Shift.Morning,
    "Jan/26": Shift.Morning,
    "Jan/27": Shift.Morning,
    "Jan/28": Shift.Morning,
    "Jan/29": Shift.Morning,
  };
}
