import BaseData from "../../models/BaseData";

interface State<T extends BaseData> {
  byId: { [key: string]: T };
  allIds: string[];
}

export function mergeOne<T extends BaseData>(
  state: State<T>,
  value: T
): State<T> {
  const id = value.id;

  const byId = { ...state.byId };
  byId[id] = value;

  const allIds = Array.from(new Set([...state.allIds, id]));

  return { byId: byId, allIds: allIds };
}
