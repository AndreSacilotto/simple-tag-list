export function arrayInsertAt<T>(arr: T[], index: number, ...item: T[])
{
  arr.splice(index, 0, ...item);
  return arr;
}

export function arrayRemoveAt<T>(arr: T[], index: number)
{
  if (index > -1){
    return arr.splice(index, 1)[0];
  }
  return null;
}

export function arrayRemoveOnce<T>(arr: T[], value: T)
{
  const index = arr.indexOf(value);
  return arrayRemoveAt(arr, index);
}

export function arrayRemoveAll<T>(arr: T[], value: T)
{
  let sum = 0;
  for (let i = arr.length - 1; i >= 0; i--)
    if (arr[i] === value)
      sum += arr.splice(i, 1).length;
  return sum;
}

export function arrayBetween<T>(arr: T[], skip = 0, limit = 0) {
  return arr.slice(skip, arr.length - limit - 1);
}