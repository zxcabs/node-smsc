module.exports.isArray = function (a) {
	return Array.isArray(a);
};

module.exports.isObject = function (o) {
	return ('object' === typeof o && o.constructor === Object);
};

module.exports.isString = function (s) {
	return ('string' === typeof s || ('object' === typeof s && s.constructor === String));
};

module.exports.inArray = function (arr, i) {
	return arr.indexOf(i) > -1;
};

//integer random [a, b]
module.exports.iRnd = function (a, b) {
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