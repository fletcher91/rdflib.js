const NamedNode = require('./named-node')

function Namespace (nsuri) {
  NamedNode.find(nsuri)

  return function (ln) {
    const fullIRI = nsuri + (ln || '')

    return NamedNode.find(fullIRI, ln)
  }
}

module.exports = Namespace
