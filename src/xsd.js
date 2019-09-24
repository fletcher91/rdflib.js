import rdfFactory from '@ontologies/core'

export default class XSD {}

XSD.boolean = rdfFactory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')
XSD.dateTime = rdfFactory.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')
XSD.decimal = rdfFactory.namedNode('http://www.w3.org/2001/XMLSchema#decimal')
XSD.double = rdfFactory.namedNode('http://www.w3.org/2001/XMLSchema#double')
XSD.integer = rdfFactory.namedNode('http://www.w3.org/2001/XMLSchema#integer')
XSD.langString = rdfFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
XSD.string = rdfFactory.namedNode('http://www.w3.org/2001/XMLSchema#string')
