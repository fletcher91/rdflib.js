const NamedNode = require('./named-node')

function Namespace (nsuri) {
  NamedNode.find(nsuri)
  const mem = {};

  return function (ln) {
    if (mem[ln]) {
      return mem[ln]
    }

    const fullIRI = nsuri + (ln || '')

    return mem[ln] = NamedNode.find(fullIRI, ln)
  }
}

module.exports = Namespace
