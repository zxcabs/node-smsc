module.exports.isArray = function (a) {
	return Array.isArray(a);
};

module.exports.isObject = function (o) {
	return ('object' === typeof o && o.constructor === Object);
};

module.exports.isString = function (s) {
	return ('string' === typeof s || ('object' === typeof s && s.constructor === String));
};