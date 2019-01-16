'use strict'
const ClassOrder = require('./class-order')
const Term = require('./term')

/**
 * @class NamedNode
 * @extends Term
 */
class NamedNode extends Term {
  /**
   * @constructor
   * @param iri {String}
   * @param ln {String|undefined} The term, if applicable
   */
  constructor (iri, ln = undefined) {
    super()
    this.termType = NamedNode.termType
    this.term = undefined

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

    const existing = NamedNode.nsMap[iri]
    if (existing) {
      return existing
    }

    this.value = iri
    NamedNode.mem(this, ln)
  }
  /**
   * Returns an $rdf node for the containing directory, ending in slash.
   */
   dir () {
     var str = this.uri.split('#')[0]
     var p = str.slice(0, -1).lastIndexOf('/')
     var q = str.indexOf('//')
     if ((q >= 0 && p < q + 2) || p < 0) return null
     return NamedNode.find(str.slice(0, p + 1))
   }
   /**
    * Returns an NN for the whole web site, ending in slash.
    * Contrast with the "origin" which does NOT have a trailing slash
    */
   site () {
     var str = this.uri.split('#')[0]
     var p = str.indexOf('//')
     if (p < 0) throw new Error('This URI does not have a web site part (origin)')
     var q = str.indexOf('/', p+2)
     if (q < 0) throw new Error('This URI does not have a web site part. (origin)')
     return NamedNode.find(str.slice(0, q + 1))
   }
  doc () {
    if (this.uri.indexOf('#') < 0) {
      return this
    } else {
      return NamedNode.find(this.uri.split('#')[0])
    }
  }

  generateString () {
     return '<' + this.uri + '>'
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

  /**
   * Retrieve or create a NamedNode by its IRI
   * @param iri {string} The IRI of the blank node
   * @param ln {string} Property accessor-friendly string representation.
   * @return {NamedNode} The resolved or created NamedNode
   */
  static find(iri, ln = undefined) {
    if (iri && iri.termType) {
      iri = iri.value
    }

    const fromMap = Term.nsMap[iri]
    if (fromMap !== undefined) {
      return fromMap
    }

    return new NamedNode(iri, ln)
  }

  /**
   * Retrieve a NamedNode by its store index
   * @param sI {integer} The store index of the NamedNode
   * @return {NamedNode | undefined}
   */
  static findByStoreIndex(sI) {
    const term = Term.termMap[sI]
    if (!term) {
      return undefined
    }
    if (term.termType === "NamedNode") {
      return term
    }

    return undefined
  }

  /**
   * Assigns an index number and adds a NamedNode instance to the indices
   * @private
   * @param nn {NamedNode} The NamedNode instance to register
   * @param ln? {string} Property accessor-friendly string representation.
   * @return {NamedNode} The updated NamedNode instance
   */
  static mem(nn, ln) {
    if (nn.sI) {
      throw new Error(`NamedNode ${nn} already registered`)
    }

    nn.sI = ++Term.termIndex
    nn.term = ln
    Term.termMap[nn.sI] = Term.nsMap[nn.value] = nn

    return nn
  }

  static fromValue (value) {
    return NamedNode.find(value)
  }
}
NamedNode.termType = 'NamedNode'
NamedNode.prototype.classOrder = ClassOrder['NamedNode']
NamedNode.prototype.isVar = 0

module.exports = NamedNode
