// algorithmn copied from https://rlaanemets.com/post/show/group-array-by-adjacent-elements-in-javascript
export function groupAdjacent<T> (array: T[], cb: (l: T, r: T) => boolean): T[][] {
  return array.reduce(function (prev: T[][], cur: T) {
    if (prev.length > 0) {
      const group: T[] = prev[prev.length - 1]
      const last: T = group[group.length - 1]
      if (cb(last, cur)) {
        group.push(cur)
      } else {
        prev.push([cur])
      }
    } else {
      prev.push([cur])
    }
    return prev
  }, [])
}
