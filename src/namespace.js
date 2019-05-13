const NamedNode = require('./named-node')

/**
 * Defines a Namespace to ease IRI generation
 * @param nsuri The base IRI of the namespace, prepended before all terms
 * @param terms Optional list of predefined terms which are accessible as members
 * @return {Function} Function to mint IRI's on the namespace with predefined members.
 */
function Namespace (nsuri, terms = []) {
  NamedNode.find(nsuri)
  const mem = {};

  const ns = function (ln) {
    if (mem[ln]) {
      return mem[ln]
    }

    const fullIRI = nsuri + (ln || '')

    return mem[ln] = NamedNode.find(fullIRI, ln)
  }

  if (terms && typeof terms.length !== "undefined") {
    for (let i = 0; i < terms.length; i++) {
      Object.defineProperty(ns, terms[i], {
        enumerable: true,
        value: ns(terms[i]),
        writable: false,
      });
    }
  }

  return ns;
}

module.exports = Namespace
