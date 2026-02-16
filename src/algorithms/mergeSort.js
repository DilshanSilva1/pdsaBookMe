export function mergeSort(hotels, sortBy = 'price') {
  if (hotels.length <= 1) return hotels;
  const mid = Math.floor(hotels.length / 2);
  const left = mergeSort(hotels.slice(0, mid), sortBy);
  const right = mergeSort(hotels.slice(mid), sortBy);
  return merge(left, right, sortBy);
}
function merge(left, right, sortBy) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i][sortBy] <= right[j][sortBy]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}
