'use strict'
const Node = require('./node')

class Term extends Node {
  /**
   * Retrieve a term (NamedNode, BlankNode or Literal) by its store index
   * @param sI {integer} The store index of the term
   * @return {BlankNode|NamedNode|Literal|undefined}
   */
  static termByStoreIndex(sI) {
    return Term.termMap[sI]
  }

  constructor() {
    super()

    // Complete the object shape https://stackoverflow.com/a/44467873
    this.sI = undefined
  }


  equals (other) {
    return other === this
  }

  hashString () {
    return this.sI
  }

  sameTerm (other) {
    return other === this
  }

  generateString () {
    return `${this.value}`
  }

  toString () {
    if (!this.string) {
      this.string = this.generateString()
    }

    return this.string
  }
}

/**
 * Running counter which assigns ids
 * @package
 * @type {number}
 */
Term.termIndex = 0

/**
 * Maps terms to their (integer) index
 * @type {Array<BlankNode | NamedNode>}
 */
Term.termMap = []

/**
 * Maps IRIs to their NamedNode counterparts
 * @package
 * @type {Object<string, NamedNode>}
 */
Term.nsMap = {}

/**
 * Maps blank ids to their BlankNode counterparts
 * @package
 * @type {Object<string, BlankNode>}
 */
Term.bnMap = {}

/**
 * Maps literals to their Literal counterparts
 * @package
 * @type {Array<Array<Literal|Array<Literal>>>}
 */
Term.litMap = []

module.exports = Term
