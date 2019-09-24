'use strict'
import ClassOrder from '../class-order'
import Node from './node-internal'

export default class BlankNode extends Node {
  constructor (id) {
    super()
    this.termType = BlankNode.termType

    if (id) {
      if (typeof id !== 'string') {
        console.log('Bad blank id:', id)
        throw new Error('Bad id argument to new blank node: ' + id)
      }
      if (id.includes('#')) {
        // Is a URI with hash fragment
        let fragments = id.split('#')
        id = fragments[fragments.length - 1]
      }
      this.id = id
      // this.id = '' + BlankNode.nextId++
    } else {
      this.id = 'n' + BlankNode.nextId++
    }

    this.value = this.id
  }

  /** @deprecated Use the static method {Literal.compareTerm} instead */
  compareTerm (other) {
    return BlankNode.compareTerm(this, other)
  }
  /** @deprecated Use the static method {Literal.copy} instead */
  copy (formula) {
    return BlankNode.copy(this, formula)
  }
  /** @deprecated Use the static method {Literal.toCanonical} instead */
  toCanonical () {
    return BlankNode.toCanonical(this)
  }
  /** @deprecated Use the static method {Literal.toString} instead */
  toString () {
    return BlankNode.toString(this)
  }
}

BlankNode.nextId = 0
BlankNode.termType = 'BlankNode'
BlankNode.NTAnonymousNodePrefix = '_:'
BlankNode.prototype.classOrder = ClassOrder['BlankNode']
BlankNode.prototype.isBlank = 1
BlankNode.prototype.isVar = 1
