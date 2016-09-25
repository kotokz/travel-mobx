import AppState from "./stores/AppStore";
import ShiftStore from "./stores/ShiftStore";
import CalendarStore from "./stores/CalendarStore";

export interface Stores {
  appStore: AppState;
  shiftStore: ShiftStore;
  calendarStore: CalendarStore;
}
export default {
  AppState,
  ShiftStore,
  CalendarStore
};