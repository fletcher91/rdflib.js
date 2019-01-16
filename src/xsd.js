const ns = require('./ns')

class XSD {}

XSD.boolean = ns.xsd('boolean')
XSD.date = ns.xsd('date')
XSD.dateTimeStamp = ns.xsd('dateTimeStamp')
XSD.dateTime = ns.xsd('dateTime')
XSD.decimal = ns.xsd('decimal')
XSD.double = ns.xsd('double')
XSD.float = ns.xsd('float')
XSD.int = ns.xsd('int')
XSD.integer = ns.xsd('integer')
XSD.langString = ns.rdf('langString')
XSD.long = ns.rdf('long')
XSD.string = ns.xsd('string')

module.exports = XSD
