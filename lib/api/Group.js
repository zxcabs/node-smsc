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



function Add(sender, name, number) {
	this.__sender = sender;
	this.__name = name;
	this.__number = number;
	sender.__api.__urlObj.query.add_group = 1;
}

Add.prototype.exec = function exec(fn) {
	var api = this.__sender.__api,
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