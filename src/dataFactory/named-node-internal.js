'use strict'
import ClassOrder from '../class-order'
import Node from './node-internal'

/**
 * @class NamedNode
 * @extends Node
 */
export default class NamedNode extends Node {
  /**
   * @constructor
   * @param iri {String}
   */
  constructor (iri) {
    super()
    this.termType = NamedNode.termType

    if (iri && iri.termType === NamedNode.termType) {  // param is a named node
      iri = iri.value
    }

    if (!iri) {
      throw new Error('Missing IRI for NamedNode')
    }

    if (!iri.includes(':')) {
      throw new Error('NamedNode IRI "' + iri + '" must be absolute.')
    }

    if (iri.includes(' ')) {
      var message = 'Error: NamedNode IRI "' + iri + '" must not contain unencoded spaces.'
      throw new Error(message)
    }

    this.value = iri
  }

  /* The local identifier with the document
  */
  static id (namedNode) {
    return namedNode.value.split('#')[1]
  }

  /** @deprecated Use the static method {NamedNode.dir} instead */
  dir() {
    return NamedNode.dir(this)
  }

  /** @deprecated Use the static method {NamedNode.site} instead */
  site() {
    return NamedNode.site(this)
  }

  /** @deprecated Use the static method {NamedNode.doc} instead */
  doc() {
    return NamedNode.doc(this)
  }

  /** @deprecated Use the static method {NamedNode.toString} instead */
  toString() {
    return NamedNode.toString(this)
  }

  /**
   * Legacy getter and setter alias, node.uri
   */
  get uri () {
    return this.value
  }
  set uri (uri) {
    this.value = uri
  }
  static fromValue (value) {
    if (typeof value === 'undefined' || value === null) {
      return value
    }
    const isNode = value && value.termType
    if (isNode) {
      return value
    }
    return new NamedNode(value)
  }
}
NamedNode.termType = 'NamedNode'
NamedNode.prototype.classOrder = ClassOrder['NamedNode']
NamedNode.prototype.isVar = 0
