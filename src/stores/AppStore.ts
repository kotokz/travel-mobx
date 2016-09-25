import { observable } from "mobx";
import { MobxStore } from "./StoreTypes";

export default class AppState implements MobxStore {
  @observable timer = 0;

  constructor(initialState: AppState) {
    Object.assign(this, initialState);
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }

  ToStringArray(): string[] {
    return [TimeRanges.toString()];
  }

  FromStringArray(value: string[]) {
    this.timer = parseInt(value[0]);
  }
}