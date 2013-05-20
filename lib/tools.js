/**
 * User: jo
 * Date: 20.05.13
 * Time: 16:59
 *
 */

var lib = require('node-lib'),
	isArray = lib.is.Array,
	isString = lib.is.String,
	isUndef = lib.is.Undef;

exports.concat = function concat(arr, param) {
		var res,
			tmp;
		if (isUndef(param)) return arr;

		if (isString(param)) {
			tmp = param.split(/,|\s|;/g);
		} else if (isArray(param)) {
			tmp = param;
		} else {
			tmp = [param];
		}

		if (!arr) return tmp;

		res = tmp.filter(function (item, index) {
			return !~arr.indexOf(item);
		});

		return arr.concat(res);
};
