'use strict'
import BlankNode from '../blank-node'
import ClassOrder from '../class-order'
import Node from './node-internal'

export default class Collection extends Node {
  constructor (initial) {
    super()
    this.termType = Collection.termType
    this.id = BlankNode.nextId++
    this.elements = []
    this.closed = false
    if (initial && initial.length > 0) {
      initial.forEach(element => {
        this.elements.push(Node.fromValue(element))
      })
    }
  }
  append (element) {
    return Collection.append(this, element)
  }
  close () {
    return Collection.close(this)
  }
  shift () {
    return Collection.shift(this)
  }
  substitute (bindings) {
    return Collection.substitute(this, bindings)
  }
  toNT () {
    return Collection.toNT(this)
  }
  toString () {
    return Collection.toString(this)
  }
  unshift (element) {
    return Collection.unshift(this, element)
  }
}
Collection.termType = 'Collection'
Collection.prototype.classOrder = ClassOrder['Collection']
Collection.prototype.compareTerm = BlankNode.prototype.compareTerm
Collection.prototype.isVar = 0
