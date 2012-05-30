//utils test;

var utils = require('../lib/utils'),
	assert = require('assert');

module.exports = {
	'test extend #1': function () {
		var a = {}, b = { foo: 1};
		
		a = utils.extend(a, b);
		assert.deepEqual(a, b);
	}
};