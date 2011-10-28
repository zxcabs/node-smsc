//msg test;

var Msg = require('../').Msg,
	assert = require('assert');

module.exports = {
	'test validatePhone #1': function () {
		assert.ok(Msg.validatePhone('+79111111111'));
	},
	'test validatePhone #2': function () {
		assert.ok(Msg.validatePhone('79111111111'));
	},
	'test validatePhone #3': function () {
		assert.ok(Msg.validatePhone('89111111111'));
	},
	'test validatePhone #4': function () {
		assert.ok(Msg.validatePhone('+89111111111'));
	},	
	'test validatePhone #5': function () {
		assert.ok(!Msg.validatePhone('9111111111'));
	},	
	'test validatePhone #6': function () {
		assert.ok(!Msg.validatePhone('12345'));
	},	
	'test validatePhone #7': function () {
		assert.ok(!Msg.validatePhone('+7 911 111 11 11'));
	},	
	'test validatePhone #8': function () {
		assert.ok(!Msg.validatePhone('+71111111111'));
	},	
	'test validatePhone #9': function () {
		assert.ok(!Msg.validatePhone('+09111111111'));
	},
	'test list #1': function () {
		var msg = new Msg();
		
		msg.list({phone: '+79111111111', text: 'test'});
		
		assert.deepEqual(msg._data, {"list":"+79111111111:test"});
	},
	'test list #2': function () {
		var msg = new Msg();
		
		msg.list({phone: '+79111111111,+79222222222', text: 'test'});
		
		assert.deepEqual(msg._data, {"list":"+79111111111,+79222222222:test"});
	},
	'test list #3': function () {
		var msg = new Msg();
		
		msg.list({phone: ['+79111111111','+79222222222'], text: 'test'});
		
		assert.deepEqual(msg._data, {"list":"+79111111111,+79222222222:test"});
	},
	'test list #4': function () {
		var msg = new Msg();
		
		msg.list([{phone: ['+79111111111','+79222222222'], text: 'test'}]);
		
		assert.deepEqual(msg._data, {"list":"+79111111111,+79222222222:test"});
	},
	'test list #5': function () {
		var msg = new Msg();
		
		msg.list([{phone: ['+79111111111','+79222222222'], text: 'test'}, {phone: ['+79333333333','+79444444444'], text: 'test2'}]);
		
		assert.deepEqual(msg._data, {"list":"+79111111111,+79222222222:test\n+79333333333,+79444444444:test2"});
	}
};