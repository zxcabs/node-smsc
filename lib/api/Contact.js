/**
 * User: jo
 * Date: 17.05.13
 * Time: 17:01
 *
 */

var lib = require('node-lib'),
	isString = lib.is.String,
	isArray = lib.is.Array,
	isUndef = lib.is.Undef;

var Contact = module.exports = function Contact(api) {
	this.__api = api;
	api.__urlObj.pathname = '/sys/phones.php';
}

Contact.prototype.add = function add(name) {
	return new Add(this, name);
};

Contact.prototype.update = function update(oldphone) {
	return new Update(this, oldphone);
};

Contact.prototype.get = function get() {
	return new Get(this);
};

Contact.prototype.del = function del() {
	return new Del(this);
};

function concat(arr, strOrArr) {
	var res,
		tmp;
	if (isUndef(strOrArr)) return arr;

	if (isString(strOrArr)) {
		tmp = strOrArr.split(/,|\s|;/g);
	} else if (isArray(strOrArr)) {
		tmp = strOrArr;
	} else {
		tmp = [strOrArr];
	}

	if (!arr) return tmp;

	res = tmp.filter(function (item, index) {
		return !~arr.indexOf(item);
	});

	return arr.concat(res);
}


/**
 * Add contact
 */
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
	this.__limit;
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

Add.prototype.birthday = function birthday(date) {
	this.__birthday = date;
	return this;
};

Add.prototype.myid = function myid(id) {
	this.__myid = id;
	return this;
};

Add.prototype.comment = function comment(str) {
	this.__comment = str;
	return this;
};

Add.prototype.tags = function tags(tags) {
	this.__tags = concat(this.__tags, tags);
	return this;
};

Add.prototype.other = function other(phones) {
	this.__other = concat(this.__other, phones);
	return this;
};

Add.prototype.limit = function limit(limit) {
	this.__limit = limit || '';
	return this;
};

Add.prototype.exec = function exec(fn) {
	var api = this.__contact.__api,
		query = api.__urlObj.query;

	query.name = this.__name;
    query.phone = this.__phone.join(',');

	if (this.__group) query.grp = this.__group.join(',');
	if (this.__first) query.fnm = this.__first;
	if (this.__middle) query.mnm = this.__middle;
	if (this.__last) query.lnm = this.__last;
	if (this.__birthday) query.bd = lib.dateformat(this.__birthday, 'dd.mm.yyyy');
	if (this.__myid) query.myid = this.__myid;
	if (this.__comment) query.cmt = this.__comment;
	if (this.__tags) query.tags = this.__tags.join(',');
	if (this.__other) query.pho = this.__other.join(',');
	if (this.__limit) query.lmt = this.__limit;

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn(null, res.id);
		fn(err, res, format);
	}

	api.exec(onExec);
};


/**
 * Update contact
 */
function Update(contact, oldphone) {
	this.__contact = contact;
	contact.__api.__urlObj.query.chg = 1;

	this.__oldphone;
	this.__name;
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
	this.__limit;

	if (oldphone) this.oldphone(oldphone);
}

Update.prototype.oldphone = function oldphone(phones) {
	this.__oldphone = concat(this.__oldphone, phones);
	return this;
};

Update.prototype.name = function name(name) {
	this.__name = name;
	return this;
};

Update.prototype.phone = function phone(phones) {
	this.__phone = concat(this.__phone, phones);
	return this;
};

Update.prototype.group = function group(phones) {
	this.__group = concat(this.__group, phones);
	return this;
};

Update.prototype.first = function name(first) {
	this.__first = first;
	return this;
};

Update.prototype.middle = function name(middle) {
	this.__middle = middle;
	return this;
};

Update.prototype.last = function name(last) {
	this.__last = last;
	return this;
};

Update.prototype.birthday = function birthday(date) {
	this.__birthday = date;
	return this;
};

Update.prototype.myid = function myid(id) {
	this.__myid = id;
	return this;
};

Update.prototype.comment = function comment(str) {
	this.__comment = str;
	return this;
};

Update.prototype.tags = function tags(tags) {
	this.__tags = concat(this.__tags, tags);
	return this;
};

Update.prototype.other = function other(phones) {
	this.__other = concat(this.__other, phones);
	return this;
};

Update.prototype.limit = function limit(limit) {
	this.__limit = limit || '';
	return this;
};

Update.prototype.exec = function exec(fn) {
	var api = this.__contact.__api,
		query = api.__urlObj.query;

	query.phone = this.__oldphone.join(', ');

	if (this.__phone) query.new_phone = this.__phone.join(',');
	if (!isUndef(this.__name)) query.name = this.__name;
	if (this.__group) query.grp = this.__group.join(',');
	if (!isUndef(this.__first)) query.fnm = this.__first;
	if (!isUndef(this.__middle)) query.mnm = this.__middle;
	if (!isUndef(this.__last)) query.lnm = this.__last;
	if (this.__birthday) query.bd = lib.dateformat(this.__birthday, 'dd.mm.yyyy');
	if (!isUndef(this.__myid)) query.myid = this.__myid;
	if (!isUndef(this.__comment)) query.cmt = this.__comment;
	if (this.__tags) query.tags = this.__tags.join(',');
	if (this.__other) query.pho = this.__other.join(',');
	if (!isUndef(this.__limit)) query.lmt = this.__limit;


	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn(null, res);
		fn(err, res, format);
	}

	api.exec(onExec);
};


/**
 * Get contact list
 */
function Get(contact) {
	this.__contact = contact;
	contact.__api.__urlObj.query.get = 1;
}

Get.prototype.exec = function exec(fn) {
	var api = this.__contact.__api;

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn(null, res);
		fn(err, res, format);
	}

	api.exec(onExec);
};


/**
 * Delete contact
 */
function Del(contact) {
	this.__contact = contact;
	contact.__api.__urlObj.query.del = 1;

	this.__phone;
}

Del.prototype.phone = function phone(phones) {
	this.__phone = concat(this.__phone, phones);
	return this;
};

Del.prototype.exec = function exec(fn) {
	var api = this.__contact.__api,
		query = api.__urlObj.query;

	if (this.__phone) query.phone = this.__phone.join(', ');

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn(null);
		fn (err, res, format);
	}

	api.exec(onExec);
};