/**
 * User: jo
 * Date: 17.05.13
 * Time: 17:01
 *
 */

var lib = require('node-lib'),
	isString = lib.is.String,
	isArray = lib.is.Array;

var Contact = module.exports = function Contact(api) {
	this.__api = api;
	api.__urlObj.pathname = '/sys/phones.php';
}

Contact.prototype.add = function add(name) {
	return new Add(this, name);
};

function concat(arr, strOrArr) {
	var res,
		tmp;
	if (!strOrArr) return arr;

	if (isString(strOrArr)) {
		tmp = strOrArr.split(/,|\s|;/g);
	} else if (isArray(strOrArr)) {
		tmp = strOrArr;
	}

	if (!arr) return tmp;

	res = tmp.filter(function (item, index) {
		return !~arr.indexOf(item);
	});

	return arr.concat(res);
}

function Add(contact, name) {
	this.__contact = contact;
	contact.__api.__urlObj.query.add = 1;

	this.__name = name;
	this.__phone;
	this.__group;
	this.__first;
	this.__middle;
	this.__last;
	this.__birthday;
	this.__myid;
	this.__comment;
	this.__tags;
	this.__other;
}

Add.prototype.name = function name(name) {
	this.__name = name;
	return this;
};

Add.prototype.phone = function phone(strOrArr) {
	this.__phone = concat(this.__phone, strOrArr);
	return this;
};

Add.prototype.group = function group(strOrArr) {
	this.__group = concat(this.__group, strOrArr);
	return this;
};

Add.prototype.first = function name(first) {
	this.__first = first;
	return this;
};

Add.prototype.middle = function name(middle) {
	this.__middle = middle;
	return this;
};

Add.prototype.last = function name(last) {
	this.__last = last;
	return this;
};

//TODO