export function fromJsonArray<T>(data: any, converter: (data: any) => T): T[] {
  if ((data?.length ?? 0) < 1) {
    return [];
  }
  const result: T[] = [];
  for (let index in data) {
    const performance = converter(data[index]);
    result.push(performance);
  }
  console.log(result);
  return result;
}
