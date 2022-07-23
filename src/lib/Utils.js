var camelCase = function camelCase(str) {
    return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}

var componentExtract = function componentExtract(object,key,defaultValue){
	return ( key in object ) ? object[key] : defaultValue
}

var componentExists = function componentExists(object,key){
	return( key in object )
}

function clone(obj) {
  let result = obj;
  var type = {}.toString.call(obj).slice(8, -1);
  if (type === 'Set') {
    return new Set([...obj].map(value => clone(value)));
  }
  if (type === 'Map') {
    return new Map([...obj].map(kv => [clone(kv[0]), clone(kv[1])]));
  }
  if (type === 'Date') {
    return new Date(obj.getTime());
  }
  if (type === 'RegExp') {
    return RegExp(obj.source, getRegExpFlags(obj));
  }
  if (type === 'Array' || type === 'Object') {
    result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      // include prototype properties
      result[key] = clone(obj[key]);
    }
  }
  // primitives and non-supported objects (e.g. functions) land here
  return result;
}

function getRegExpFlags(regExp) {
  if (typeof regExp.source.flags == 'string') {
    return regExp.source.flags;
  } else {
    var flags = [];
    regExp.global && flags.push('g');
    regExp.ignoreCase && flags.push('i');
    regExp.multiline && flags.push('m');
    regExp.sticky && flags.push('y');
    regExp.unicode && flags.push('u');
    return flags.join('');
  }
}

export {camelCase, componentExtract, clone, componentExists}