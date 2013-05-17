/**
 * User: jo
 * Date: 17.05.13
 * Time: 15:13
 *
 */

var Group = module.exports = function Group(api) {
	this.__api = api;
	api.__urlObj.pathname = '/sys/phones.php';
}

Group.prototype.add = function add(name, number) {
	return new Add(this, name, number);
};

Group.prototype.rename = function rename(id, name) {
	return new Rename(this, id, name);
};

Group.prototype.del = function del(id) {
	return new Del(this, id);
};

Group.prototype.get = function get() {
	return new Get(this);
};



function Add(group, name, number) {
	this.__group = group;
	this.__name = name;
	this.__number = number;
	group.__api.__urlObj.query.add_group = 1;
}

Add.prototype.exec = function exec(fn) {
	var api = this.__group.__api,
		query = api.__urlObj.query;

	query.name = this.__name;

	if (this.__number) {
		query.num = this.__number;
	}

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn(null, res.id);
		fn(err, res, format);
	}

	api.exec(onExec);
};



function Rename(group, groupId, name) {
	this.__group = group;
	this.__groupId = groupId;
	this.__name = name;
	group.__api.__urlObj.query.chg_group = 1;
}

Rename.prototype.exec = function exec(fn) {
	var api = this.__group.__api,
		query = api.__urlObj.query;

	query.grp = this.__groupId;
	query.name = this.__name;

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn();
		fn(err, res, format);
	}

	api.exec(onExec);
};


function Del(group, groupId) {
	this.__group = group;
	this.__groupId = groupId;
	group.__api.__urlObj.query.del_group = 1;
}

Del.prototype.exec = function exec(fn) {
	var api = this.__group.__api,
		query = api.__urlObj.query;

	query.grp = this.__groupId;

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn();
		fn(err, res, format);
	}

	api.exec(onExec);
};


function Get(group) {
	this.__group = group;
	group.__api.__urlObj.query.get_group = 1;
}

Get.prototype.exec = function exec(fn) {
	var api = this.__group.__api,
		query = api.__urlObj.query;

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn(null, res);
		fn(err, res, format);
	}

	api.exec(onExec);
};