import AllStores from "../allStores";
import { MobxState } from "../stores/StoreTypes";

export function getFreshStores() {
  const freshStores: MobxState  = {};

  Object.keys(AllStores).forEach((value: string) => {
    freshStores[value] = new AllStores[value];
  });
  return freshStores;
}

export function createStoresFromState(state: MobxState ) {
  const createdStores: MobxState  = {};

  Object.keys(AllStores).forEach((value: string) => {
    createdStores[value] = new AllStores[value](state[value]);
  });

  return createdStores;
}