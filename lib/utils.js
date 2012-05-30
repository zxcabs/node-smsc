var crypto = require('crypto');

var objString = function (obj) {
	var __toString = Object.prototype.toString;
	
	objString = function (obj) {
		return __toString.call(obj);
	};
	
	return objString(obj);
};

var isArray = module.exports.isArray = function isArray(a) {
	return Array.isArray(a);
};

var isObject = module.exports.isObject = function isObject(o) {
	return ('object' === typeof o && objString(o) === '[object Object]');
};

var isString = module.exports.isString = function isString(s) {
	return ('string' === typeof s || ('object' === typeof s && objString(s) === '[object String]'));
};

var isNumber = module.exports.isNumber = function isNumber(n) {
	return ('number' === typeof n || ('object' === typeof n && objString(n) === '[object Number]'));
};

var isInteger = module.exports.isInteger = function isInteger(n) {
	return (isNumber(n) && (n | 0) === n);
};

var inArray = module.exports.inArray = function inArray(arr, i) {
	return arr.indexOf(i) > -1;
};

//integer random [a, b]
var iRnd = module.exports.iRnd = function iRnd(a, b) {
	var res = 0;
	
	if (arguments.length === 2) {
		res = Math.random() * (b - 1) | a;
	} else if (a) {
		res = Math.random() * (a + 1) | 0;
	} else {
		res = Math.random() * 100000000 | 0;
	}
	
	return res;
};


var md5 = module.exports.md5 = function md5(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

var extend = module.exports.extend = function extend(target, source) {
	var keys = Object.keys(source),
		l, key;
		
	for (l = keys.length; l--;) {
		key = keys[l];
		target[key] = source[key];
	}
	
	return target;
};