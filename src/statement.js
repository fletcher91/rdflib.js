'use strict'
import rdfFactory from '@ontologies/core'

import Statement from './dataFactory/statement-internal';

Statement.equals = function equals (one, other) {
  return rdfFactory.equals(other.subject, one.subject)
    && rdfFactory.equals(other.predicate, one.predicate)
    && rdfFactory.equals(other.object, one.object)
    && rdfFactory.equals(other.graph, one.graph)
}

Statement.substitute = function substitute (statement, bindings) {
  const y = new Statement(
    statement.subject.substitute(bindings),
    statement.predicate.substitute(bindings),
    statement.object.substitute(bindings),
    statement.why.substitute(bindings)) // 2016
  console.log('@@@ statement substitute:' + y)
  return y
}

Statement.toCanonical = function toCanonical (statement) {
  let terms = [
    this.subject.toCanonical(),
    this.predicate.toCanonical(),
    this.object.toCanonical()
  ]
  if (this.graph && this.graph.termType !== 'DefaultGraph') {
    terms.push(this.graph.toCanonical())
  }
  return terms.join(' ') + ' .'
}

Statement.toNT = function toNT (statement) {
  return [statement.subject.toNT(), statement.predicate.toNT(),
    statement.object.toNT()].join(' ') + ' .'
}

Statement.toString = function toString (statement) {
  return this.toNT()
}

export default Statement
