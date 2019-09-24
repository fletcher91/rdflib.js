'use strict'
import DefaultGraph from './dataFactory/default-graph-internal'

DefaultGraph.toCanonical = function toCanonical (defaultGraph) {
  return defaultGraph.value
}

DefaultGraph.toString = function toString () {
  return ''
}

export default DefaultGraph
