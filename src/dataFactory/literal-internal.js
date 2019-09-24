'use strict'
import rdfFactory from '@ontologies/core'
import ClassOrder from '../class-order'
import Node from './node-internal'

export default class Literal extends Node {
  constructor (value, language, datatype) {
    super()
    this.termType = Literal.termType
    this.value = value
    if (language) {
      this.lang = language
      datatype = rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString")
    }
    // If not specified, a literal has the implied XSD.string default datatype
    if (datatype) {
      this.datatype = rdfFactory.namedNode(datatype)
    }
  }
  copy () {
    return rdfFactory.literal(this.value, this.lang || this.datatype)
  }
  equals (other) {
    if (!other) {
      return false
    }
    return (this.termType === other.termType) &&
      (this.value === other.value) &&
      (this.language === other.language) &&
      ((!this.datatype && !other.datatype) ||
        (this.datatype && rdfFactory.equals(this.datatype, other.datatype)))
  }
  get language () {
    return this.lang
  }
  set language (language) {
    this.lang = language || ''
  }

  toNT() {
    return Literal.toNT(this)
  }
  toString () {
    return '' + this.value
  }

}
Literal.termType = 'Literal'
Literal.prototype.classOrder = ClassOrder['Literal']
Literal.prototype.lang = ''
Literal.prototype.isVar = 0
