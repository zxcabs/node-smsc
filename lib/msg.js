
var utils = require('./utils');


function Msg(i, o) {
	
	this._id = (utils.isInteger(i) && i > 0 && i < 2147483647) ? i : utils.iRnd(1, 2147483647);
	
	this._data;
	this._charset = Msg._charset[0];
	this._type;
}
module.exports = Msg;

Msg._phoneRegex = /^\+?([87][34]\d{9}|[87](9[^7]|8[^02459])\d{8}|[87]7[07]\d{8}|[12456]\d{9,13}|376\d{6}|8[68]\d{10,11}|8[14]\d{10}|82\d{9,10}|90\d{10}|96(0[79]|170|13)\d{6}|96[23]\d{9}|964\d{10}|96(5[69]|89)\d{7}|96(65|77)\d{8}|92[023]\d{9}|91[1879]\d{9}|9[34]7\d{8}|959\d{7}|989\d{9}|9[79]\d{8,12}|380[4569]\d{8}|38[15]\d{9}|375[234]\d{8}|372\d{7,8}|37[0-4]\d{8}|37[6-9]\d{7,11}|30[69]\d{9}|3[1-69]\d{8,12}|38[12679]\d{8})$/;
Msg._phoneDelimiter = ',';
Msg._phoneDelemiterRegex = new RegExp(Msg._phoneDelimiter);
Msg._charset = ['utf-8', 'windows-1251', 'koi8-r'];

Msg.validatePhone = function (phone) {
	return Msg._phoneRegex.test(phone);
};

Msg._resolvePhone = function (phone) {
	var res;
	
	if (utils.isArray(phone) && phone.every(Msg.validatePhone)) {
		res = phone.join(',');
	} else if (utils.isString(phone)) {
		
		if (Msg._phoneDelemiterRegex.test(phone) && phone.split(Msg._phoneDelimiter).every(Msg.validatePhone)) {
			res = phone;
		} else if (Msg.validatePhone(phone)) {
			res = phone;
		}
		
	}
	
	return res;
};

Msg.prototype.__defineGetter__('data', function () {
	return this._data;
});

Msg.prototype.__defineGetter__('id', function () {
	return this._id;
});

Msg.prototype.__defineGetter__('charset', function () {
	return this._charset;
});

Msg.prototype.__defineSetter__('charset', function (ch) {
	
	if (utils.inArray(Msg._charset, ch)) {
		this._charset = ch;
	}
	
	return this._charset;
});

Msg.prototype.list = function (list) {
	if (!this._type) {
		this._type = 'list';
		this._list(list);
	}
	return this;
};

Msg.prototype._list = function (list) {
	var data = this._data = { list:'' }, _delimiter = '';
		
	function make(obj) {
		var phone = Msg._resolvePhone(obj.phone),
			txt = obj.text;
		
		data.list += _delimiter + phone + ':' + txt;
		
		_delimiter = '\n';
	}

	if (utils.isArray(list)) {
		list.forEach(make);
	} else if (utils.isObject(list)) {
		make(list);
	}
	
	return this;
};
