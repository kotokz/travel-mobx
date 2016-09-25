import AppState from "./stores/AppStore";
import ShiftStore from "./stores/ShiftStore";
import CalendarStore from "./stores/CalendarStore";
import { MobxState } from "./stores/StoreTypes";

export interface Stores {
  AppState: AppState;
  ShiftStore: ShiftStore;
  CalendarStore: CalendarStore;
}
export default {
  AppState,
  ShiftStore,
  CalendarStore
} as any;