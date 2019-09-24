'use strict'
import BlankNode from './blank-node-internal'
import DefaultGraph from './default-graph-internal'
import Literal from './literal-internal'
import NamedNode from './named-node-internal'
import Statement from './statement-internal'
import Variable from './variable-internal'

export function blankNode (value) {
  return new BlankNode(value)
}

export function defaultGraph () {
  return new DefaultGraph()
}

export function equals (a, b) {
  if (!a || !b) {
    return a === b
  }

  if (['NamedNode', 'BlankNode', 'Literal'].includes(a.termType)) {
    return (a.termType === b.termType) && (a.value === b.value)
  }

  if (Object.prototype.hasOwnProperty.call(a, 'equals')) {
    return a.equals(b)
  }

  return a === b
}

export function literal (value, languageOrDatatype) {
  if (typeof languageOrDatatype === 'string') {
    if (languageOrDatatype.indexOf(':') === -1) {
      return new Literal(value, languageOrDatatype)
    } else {
      return new Literal(value, null, namedNode(languageOrDatatype))
    }
  } else {
    return new Literal(value, null, languageOrDatatype)
  }
}

export function namedNode (value) {
  return new NamedNode(value)
}

export function quad (subject, predicate, object, graph) {
  graph = graph || new DefaultGraph()
  return new Statement(subject, predicate, object, graph)
}

export function variable (name) {
  return new Variable(name)
}

export default {
  blankNode,
  defaultGraph,
  literal,
  namedNode,
  quad,
  variable,
  equals,
}
