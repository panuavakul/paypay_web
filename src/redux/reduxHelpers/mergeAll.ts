import BaseData from "../../models/BaseData";

interface State<T extends BaseData> {
  byId: { [key: string]: T };
  allIds: string[];
}

export function mergeAll<T extends BaseData>(
  state: State<T>,
  values: T[]
): State<T> {
  const newItems = values;

  const byId = { ...state.byId };
  let allIds = [...state.allIds];

  for (var index in newItems) {
    const item = newItems[index];
    const id = item.id;
    byId[id] = item;
    allIds.push(id);
  }

  allIds = Array.from(new Set([...allIds]));

  return { byId: byId, allIds: allIds };
}
