import AllStores from "../allStores";

export function getFreshStores() {
  const freshStores: any = {};

  Object.keys(AllStores).forEach((value: any) => {
    freshStores[value] = new AllStores[value];
  });

  return freshStores;
}

export function createStoresFromState(state: any) {
  const createdStores: any = {};

  Object.keys(AllStores).forEach((value: any) => {
    createdStores[value] = new AllStores[value](state[value]);
  });

  return createdStores;
}