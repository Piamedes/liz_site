import {DIR_LIST} from "./Constants.js";


var camelCase = function camelCase(str) {
    return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}


var dirText = function dirText(direction){
	let text = null;

	if(!direction.length)
		text = 'You look around '
	else if(direction.length){
		if(DIR_LIST.includes(direction))
			text = 'You go ' + direction + ' into ';
		else
			text = 'You ' + direction + ' ';		
	}

	return text;
}

var setSavedValue = function setSavedValue(id,key,value){
	let string = JSON.stringify(value);

	localStorage.setItem(id+":"+key,string);
}

var getSavedValue = function getSavedValue(id,key,defaultValue){
	let string = localStorage.getItem(id+":"+key);
	let value  = (string !== null && string !== "undefined") ? JSON.parse(string) : defaultValue

	return (value===null) ? defaultValue : value;
}

var tableInit = function tableInit(table){
	let objects = [];

	if( table.length > 1 ){
		let keys 	= table[0];
		let pairs   = [];

		for(let rowIdx=0; rowIdx<table.length;rowIdx++){
			if(rowIdx !== 0){
				for(let colIdx=0;colIdx<keys.length;colIdx++){
					pairs.push([keys[colIdx],table[rowIdx][colIdx]])
				}
			}

			if(pairs.length){
				objects.push(Object.fromEntries(pairs));
				pairs = [];	
			}
		}
	}

	return objects
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

export {camelCase, componentExtract, clone, componentExists,tableInit,dirText,getSavedValue,setSavedValue}