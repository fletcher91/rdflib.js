'use strict'
const ClassOrder = require('./class-order')
const Term = require('./term')

class BlankNode extends Term {
  /** @private */
  static normalizeID (id) {
    if (typeof id === 'string' && id.includes('#')) {
      // Is a URI with hash fragment
      let fragments = id.split('#')
      return fragments[fragments.length - 1]
    }

    return id
  }

  constructor (id) {
    super()
    this.termType = BlankNode.termType

    if (id) {
      if (typeof id !== 'string') {
        console.log('Bad blank id:', id)
        throw new Error('Bad id argument to new blank node: ' + id)
      }

      this.id = BlankNode.normalizeID(id)

      const existing = BlankNode.bnMap[this.id]
      if (existing) {
        return existing
      }
    } else {
      this.id = 'n' + BlankNode.nextId++
    }

    this.value = this.id
    BlankNode.mem(this)
  }

  compareTerm (other) {
    if (this.classOrder < other.classOrder) {
      return -1
    }
    if (this.classOrder > other.classOrder) {
      return +1
    }
    if (this.id < other.id) {
      return -1
    }
    if (this.id > other.id) {
      return +1
    }
    return 0
  }

  copy (formula) { // depends on the formula
    var bnodeNew = new BlankNode()
    formula.copyTo(this, bnodeNew)
    return bnodeNew
  }

  toCanonical () {
    return '_:' + this.value
  }

  generateString () {
    return BlankNode.NTAnonymousNodePrefix + this.id
  }

  /**
   * Retrieve or create a BlankNode by its ID
   * @param idOrIRI? {string} The ID of the blank node or a hash fragment IRI
   * @return {BlankNode} The resolved or created BlankNode
   */
  static find(idOrIRI) {
    const BlankNode = require('./blank-node')
    const id = BlankNode.normalizeID(idOrIRI)
    const fromMap = Term.bnMap[id]
    if (fromMap !== undefined) {
      return fromMap
    }

    return new BlankNode(id);
  }

  /**
   * Assigns an index number and adds a BlankNode instance to the indices
   * @private
   * @param bn The BlankNode instance to register
   * @return {BlankNode} The updated BlankNode instance
   */
  static mem(bn) {
    if (bn.sI) {
      throw new Error(`BlankNode ${bn} already registered`)
    }

    bn.sI = ++Term.termIndex
    Term.termMap[bn.sI] = Term.bnMap[bn.value] = bn

    return bn
  }
}

BlankNode.nextId = 0
BlankNode.termType = 'BlankNode'
BlankNode.NTAnonymousNodePrefix = '_:'
BlankNode.prototype.classOrder = ClassOrder['BlankNode']
BlankNode.prototype.isBlank = 1
BlankNode.prototype.isVar = 1

module.exports = BlankNode
