export function binarySearchDate(sortedDates, targetDate) {
  let left = 0, right = sortedDates.length - 1, steps = 0;
  while (left <= right) {
    steps++;
    const mid = Math.floor((left + right) / 2);
    const midTime = new Date(sortedDates[mid]).getTime();
    const targetTime = new Date(targetDate).getTime();
    if (midTime === targetTime) return { found: true, index: mid, date: sortedDates[mid], steps };
    if (midTime < targetTime) left = mid + 1;
    else right = mid - 1;
  }
  return { found: false, steps };
}
