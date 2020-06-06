import BaseData from "../../models/BaseData";

interface State<T extends BaseData> {
  byId: { [key: string]: T };
  allIds: string[];
}

export function removeId<T extends BaseData>(
  state: State<T>,
  targetId: string
): State<T> {
  const byId = { ...state.byId };
  delete byId[targetId];

  const allIds = [...state.allIds].filter(id => `${targetId}` !== `${id}`);

  return { byId: byId, allIds: allIds };
}
