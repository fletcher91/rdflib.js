import rdfFactory from '@ontologies/core'

import NamedNode from './dataFactory/named-node-internal'

NamedNode.dir = function (namedNode) {
  var str = namedNode.uri.split('#')[0]
  var p = str.slice(0, -1).lastIndexOf('/')
  var q = str.indexOf('//')
  if ((q >= 0 && p < q + 2) || p < 0) return null
  return rdfFactory.namedNode(str.slice(0, p + 1))
}
/**
 * Returns an NN for the whole web site, ending in slash.
 * Contrast with the "origin" which does NOT have a trailing slash
 */
NamedNode.site = function (namedNode) {
  var str = namedNode.uri.split('#')[0]
  var p = str.indexOf('//')
  if (p < 0) throw new Error('This URI does not have a web site part (origin)')
  var q = str.indexOf('/', p+2)
  if (q < 0) {
    return rdfFactory.namedNode(str.slice(0) + '/')   // Add slash to a bare origin
  } else {
    return rdfFactory.namedNode(str.slice(0, q + 1))
  }
}
NamedNode.doc = function (namedNode) {
  if (namedNode.uri.indexOf('#') < 0) {
    return namedNode
  } else {
    return rdfFactory.namedNode(namedNode.uri.split('#')[0])
  }
}
NamedNode.toString = function (namedNode) {
  return '<' + namedNode.value + '>'
}

export default NamedNode
