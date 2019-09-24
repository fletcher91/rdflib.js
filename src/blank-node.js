
import BlankNode from './dataFactory/blank-node-internal';

BlankNode.compareTerm = function compareTerm (one, other) {
  if (one.classOrder < other.classOrder) {
    return -1
  }
  if (one.classOrder > other.classOrder) {
    return +1
  }
  if (one.id < other.id) {
    return -1
  }
  if (one.id > other.id) {
    return +1
  }
  return 0
}

BlankNode.copy = function copy (blankNode, formula) { // depends on the formula
  var bnodeNew = new BlankNode()
  formula.copyTo(blankNode, bnodeNew)
  return bnodeNew
}

BlankNode.toCanonical = function toCanonical (blankNode) {
  return '_:' + blankNode.value
}

BlankNode.toString = function toString (blankNode) {
  return BlankNode.NTAnonymousNodePrefix + blankNode.id
}

export default BlankNode
