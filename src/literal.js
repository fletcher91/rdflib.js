import rdfFactory from '@ontologies/core'

import NamedNode from './named-node'
import Literal from './dataFactory/literal-internal'
import XSD from './xsd'

Literal.prototype.datatype = rdfFactory.namedNode("http://www.w3.org/2001/XMLSchema#string")

Literal.toNT = function toNT(literal) {
  if (typeof literal.value === 'number') {
    return Literal.toString(literal)
  } else if (typeof literal.value !== 'string') {
    throw new Error('Value of RDF literal is not string or number: ' +
      literal.value)
  }
  var str = literal.value
  str = str.replace(/\\/g, '\\\\')
  str = str.replace(/\"/g, '\\"')
  str = str.replace(/\n/g, '\\n')
  str = '"' + str + '"'

  if (literal.language) {
    str += '@' + literal.language
  } else if (!rdfFactory.equals(literal.datatype, XSD.string)) {
    // Only add datatype if it's not a string
    str += '^^' + NamedNode.toCanonical(literal.datatype)
  }
  return str
}

/**
 * @method fromBoolean
 * @static
 * @param value {Boolean}
 * @return {Literal}
 */
Literal.fromBoolean = function fromBoolean (value) {
  let strValue = value ? '1' : '0'
  return rdfFactory.literal(strValue, XSD.boolean)
}
/**
 * @method fromDate
 * @static
 * @param value {Date}
 * @return {Literal}
 */
Literal.fromDate = function fromDate (value) {
  if (!(value instanceof Date)) {
    throw new TypeError('Invalid argument to Literal.fromDate()')
  }
  let d2 = function (x) {
    return ('' + (100 + x)).slice(1, 3)
  }
  let date = '' + value.getUTCFullYear() + '-' + d2(value.getUTCMonth() + 1) +
    '-' + d2(value.getUTCDate()) + 'T' + d2(value.getUTCHours()) + ':' +
    d2(value.getUTCMinutes()) + ':' + d2(value.getUTCSeconds()) + 'Z'
  return rdfFactory.literal(date, XSD.dateTime)
}
/**
 * @method fromNumber
 * @static
 * @param value {Number}
 * @return {Literal}
 */
Literal.fromNumber = function fromNumber (value) {
  if (typeof value !== 'number') {
    throw new TypeError('Invalid argument to Literal.fromNumber()')
  }
  let datatype
  const strValue = value.toString()
  if (strValue.indexOf('e') < 0 && Math.abs(value) <= Number.MAX_SAFE_INTEGER) {
    datatype = Number.isInteger(value) ? XSD.integer : XSD.decimal
  } else {
    datatype = XSD.double
  }
  return rdfFactory.literal(strValue, datatype)
}
/**
 * @method fromValue
 * @param value
 * @return {Literal}
 */
Literal.fromValue = function fromValue (value) {
  if (typeof value === 'undefined' || value === null) {
    return value
  }
  if (typeof value === 'object' && value.termType) {  // this is a Node instance
    return value
  }
  switch (typeof value) {
    case 'object':
      if (value instanceof Date) {
        return Literal.fromDate(value)
      }
    case 'boolean':
      return Literal.fromBoolean(value)
    case 'number':
      return Literal.fromNumber(value)
    case 'string':
      return rdfFactory.literal(value)
  }
  throw new Error("Can't make literal from " + value + ' of type ' +
    typeof value)

}

export default Literal
