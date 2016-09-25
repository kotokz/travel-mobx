export interface MobxStore {
  ToStringArray(): string[]|Map<string, any>;
  FromStringArray(value: string[]|Map<string, any>): void;
}

export interface MobxState { [key: string]: MobxStore; };