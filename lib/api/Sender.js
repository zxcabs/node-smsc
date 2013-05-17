/**
 * User: jo
 * Date: 17.05.13
 * Time: 12:30
 *
 */

var node_lib = require('node-lib'),
	isNumber = node_lib.is.Number;

var Sender = module.exports = function Sender(api) {
	this.__api = api;
	api.__urlObj.pathname = '/sys/senders.php';
}


Sender.prototype.add = function add(name, comment) {
	return new Add(this, name, comment);
};

Sender.prototype.del = function del(name) {
	return new Del(this, name);
};



function Add(sender, name, comment) {
	this.__sender = sender;
	this.name = name;
	this.comment = comment;
}

Add.prototype.exec = function exec(fn) {
	var api = this.__sender.__api,
		query = api.__urlObj.query;

	query.add = 1;
	query.sender = this.name;
	query.cmt = this.comment;

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn(null, res.sender);
		fn(err, res, format);
	}

	api.exec(onExec);
};


function Del(sender, nameOrId) {
	this.__sender = sender;
	this.__name;
	this.__id;

	if (isNumber(nameOrId)) {
		this.__id = nameOrId;
	} else {
		this.__name = nameOrId;
	}
};

Del.prototype.exec = function exec(fn) {
	var api = this.__sender.__api,
		query = api.__urlObj.query;

	query.del = 1;

	if (this.__name) {
		query.sender = this.__name;
	} else if (this.__id) {
		query.id = this.__id;
	}

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn();
		fn(err, res, format);
	}

	api.exec(onExec);
};