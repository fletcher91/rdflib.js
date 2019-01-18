'use strict'
const BlankNode = require('./blank-node')
const Collection = require('./collection')
const DefaultGraph = require('./default-graph')
const Fetcher = require('./fetcher')
const IndexedFormula = require('./store')
const Literal = require('./literal')
const NamedNode = require('./named-node')
const Statement = require('./statement')
const Variable = require('./variable')

function blankNode (value) {
  return BlankNode.find(value)
}
function collection (elements) {
  return new Collection(elements)
}
function defaultGraph () {
  return new DefaultGraph()
}
function fetcher (store, options) {
  return new Fetcher(store, options)
}
function graph () {
  return new IndexedFormula()
}
function lit (val, lang, dt) {
  return Literal.find('' + val, lang, dt)
}
function literal (value, languageOrDatatype) {
  if (typeof languageOrDatatype === 'string') {
    if (languageOrDatatype.indexOf(':') === -1) {
      return Literal.find(value, languageOrDatatype)
    } else {
      return Literal.find(value, null, namedNode(languageOrDatatype))
    }
  } else {
    return Literal.find(value, null, languageOrDatatype)
  }
}
function namedNode (value) {
  return NamedNode.find(value)
}
function quad (subject, predicate, object, graph) {
  graph = graph || new DefaultGraph()
  return Statement.from(subject, predicate, object, graph)
}
function st (subject, predicate, object, graph) {
  return Statement.from(subject, predicate, object, graph)
}
function triple (subject, predicate, object) {
  return quad(subject, predicate, object)
}
function variable (name) {
  return new Variable(name)
}

// rdfjs spec factory methods
module.exports.blankNode = blankNode
module.exports.defaultGraph = defaultGraph
module.exports.graph = graph
module.exports.literal = literal
module.exports.namedNode = namedNode
module.exports.quad = quad
module.exports.triple = triple
module.exports.variable = variable

// rdflib only
module.exports.collection = collection
module.exports.fetcher = fetcher
module.exports.lit = lit
module.exports.st = st
