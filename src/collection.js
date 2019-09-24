import BlankNode from './blank-node'
import Collection from './dataFactory/collection-internal'

Collection.append = function append (collection, element) {
  return collection.elements.push(element)
}
Collection.close = function close (collection) {
  collection.closed = true
  return collection.closed
}
Collection.shift = function shift (collection) {
  return collection.elements.shift()
}
Collection.substitute = function substitute (collection, bindings) {
  var elementsCopy = collection.elements.map(function (ea) {
    ea.substitute(bindings)
  })
  return new Collection(elementsCopy)
}
Collection.toNT = function toNT (collection) {
  return BlankNode.NTAnonymousNodePrefix + collection.id
}
Collection.toString = function toString (collection) {
  return '(' + collection.elements.join(' ') + ')'
}
Collection.unshift = function unshift (collection, element) {
  return collection.elements.unshift(element)
}

export default Collection
