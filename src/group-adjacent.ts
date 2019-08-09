// algorithmn copied from https://rlaanemets.com/post/show/group-array-by-adjacent-elements-in-javascript
export function groupAdjacent<T>(array: Array<T>, cb: (l: T, r: T) => boolean): Array<Array<T>> {
  return array.reduce(function(prev: Array<Array<T>>, cur: T) {
    if (prev.length > 0) {
      const group: Array<T> = prev[prev.length - 1]
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
