'use strict'
import Collection from './dataFactory/collection-internal'
import './default-graph' // Enable static methods
import Fetcher from './fetcher'
import IndexedFormula from './store'
import Literal from './dataFactory/literal-internal'
import Statement from './statement'
import DataFactory from './dataFactory/data-factory'

/*
 * RDFlib specific factory methods
 */

function collection (elements) {
  return new Collection(elements)
}
export function fetcher (store, options) {
  return new Fetcher(store, options)
}
export function graph () {
  return new IndexedFormula()
}
export function lit (val, lang, dt) {
  return new Literal('' + val, lang, dt)
}
export function st (subject, predicate, object, graph) {
  return new Statement(subject, predicate, object, graph)
}
export function triple (subject, predicate, object) {
  return DataFactory.quad(subject, predicate, object)
}

export default {
  // rdfjs spec factory methods
  blankNode: DataFactory.blankNode,
  defaultGraph: DataFactory.defaultGraph,
  literal: DataFactory.literal,
  namedNode: DataFactory.namedNode,
  quad: DataFactory.quad,
  variable: DataFactory.variable,

  // rdflib only
  graph,
  collection,
  fetcher,
  lit,
  st,
  triple,
}
