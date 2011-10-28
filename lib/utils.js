var crypto = require('crypto');


var isArray = module.exports.isArray = function isArray(a) {
	return Array.isArray(a);
};

var isObject = module.exports.isObject = function isObject(o) {
	return ('object' === typeof o && o.constructor === Object);
};

var isString = module.exports.isString = function isString(s) {
	return ('string' === typeof s || ('object' === typeof s && s.constructor === String));
};

var isNumber = module.exports.isNumber = function isNumber(n) {
	return ('number' === typeof n || ('object' === typeof s && s.constructor === Number));
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
	return crypto.createHash('md5').update(str).digest('base64');
};

var extend = module.exports.extend = function extend(target, source) {
	for (var prop in source) {
		if (source[prop] !== void 0) target[prop] = source[prop];
	  }
	
	return target;
};