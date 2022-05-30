export default function sortByWeight(listArray) {
  return listArray.sort((i1, i2) => {
    if (i1.weight > i2.weight) return 1
    if (i1.weight < i2.weight) return -1
    return 0
  })
}
