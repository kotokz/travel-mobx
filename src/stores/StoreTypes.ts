export interface MobxStore {
  ToStringArray(): string[]|Map<string, any>;
  FromStringArray(value: string[]|Map<string, any>);
}