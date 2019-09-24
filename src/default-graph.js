'use strict'
import DefaultGraph from './dataFactory/default-graph-internal'

DefaultGraph.toCanonical = function toCanonical (defaultGraph) {
  console.log('DEFAULT_GRAPH toCanonical')
  return defaultGraph.value
}

DefaultGraph.toString = function toString () {
  console.log('DEFAULT_GRAPH toString')
  return ''
}

export default DefaultGraph
