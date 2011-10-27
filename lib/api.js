var http = require('http'),
	utils = require('./utils');

function Smsc (login, password) {
	this._login = login;
	this._password = password;
}
module.exports = Smsc;

Smsc._phoneRegex = /^\+?([87][34]\d{9}|[87](9[^7]|8[^02459])\d{8}|[87]7[07]\d{8}|[12456]\d{9,13}|376\d{6}|8[68]\d{10,11}|8[14]\d{10}|82\d{9,10}|90\d{10}|96(0[79]|170|13)\d{6}|96[23]\d{9}|964\d{10}|96(5[69]|89)\d{7}|96(65|77)\d{8}|92[023]\d{9}|91[1879]\d{9}|9[34]7\d{8}|959\d{7}|989\d{9}|9[79]\d{8,12}|380[4569]\d{8}|38[15]\d{9}|375[234]\d{8}|372\d{7,8}|37[0-4]\d{8}|37[6-9]\d{7,11}|30[69]\d{9}|3[1-69]\d{8,12}|38[12679]\d{8})$/;
Smsc._phoneDelimiter = ',';
Smsc._phoneDelemiterRegex = new RegExp(Smsc._phoneDelimiter);

Smsc.validPhone = function (phone) {
	return Smsc._phoneRegex.test(phone);
};

Smsc._resolvePhone = function (phone) {
	var res, valid = false;
	
	if (isArray(phone)) {
		valid = phone.some(Smsc.validPhone);
	} else if (isString(phone))
		
		if (Smsc._phoneDelemiterRegex.test(phone)) {
			
		}
	}
	
	return res;
};

Smsc.prototype.list = function (list, fn) {
	
	if (utils.isArray(list)) {
		//TODO
	} else if (utils.isObject(list)) {
		//TODO
	}
};