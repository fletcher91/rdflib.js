'use strict'

/**
 * The superclass of all RDF Statement objects, that is
 * NamedNode, Literal, BlankNode, etc.
 * @class Node
 */

export default class Node {
  /** @deprecated Use the static method {Node.substitute} instead */
  substitute (node, bindings) {
    return this.constructor.substitute(this, node, bindings)
  }
  /** @deprecated Use the static method {Node.compareTerm} instead */
  compareTerm (node, other) {
    return this.constructor.compareTerm(this, node, other)
  }
  /** @deprecated Use the static method {Node.equals} instead */
  equals (node, other) {
    return this.constructor.equals(this, node, other)
  }
  /** @deprecated Use the static method {Node.hashString} instead */
  hashString (node) {
    return this.constructor.hashString(this, node)
  }
  /** @deprecated Use the static method {Node.sameTerm} instead */
  sameTerm (node, other) {
    return this.constructor.sameTerm(this, node, other)
  }
  /** @deprecated Use the static method {Node.toCanonical} instead */
  toCanonical (node) {
    return this.constructor.toCanonical(this, node)
  }
  /** @deprecated Use the static method {Node.toNT} instead */
  toNT (node) {
    return this.constructor.toNT(this, node)
  }
  /** @deprecated Use the static method {Node.toString} instead */
  toString (node) {
    return this.constructor.toString(this, node)
  }
}
