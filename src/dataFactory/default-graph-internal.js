'use strict'
import Node from './node-internal'

class DefaultGraph extends Node {
  constructor () {
    super()
    this.termType = 'DefaultGraph'
    this.value = ''
  }
}

export default DefaultGraph
