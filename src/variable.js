import Variable from './dataFactory/variable-internal';

Variable.equals = function equals (variable, other) {
  if (!other) {
    return false
  }
  return (variable.termType === other.termType) && (variable.value === other.value)
}
Variable.hashString = function hashString (variable) {
  return Variable.toString(variable)
}
Variable.substitute = function substitute (variable, bindings) {
  var ref
  return (ref = bindings[Variable.toNT(variable)]) != null ? ref : variable
}
Variable.toString = function toString (variable) {
  if (variable.uri.slice(0, variable.base.length) === variable.base) {
    return '?' + variable.uri.slice(variable.base.length)
  }
  return '?' + variable.uri
}

export default Variable
