var request = require('./request'),
	utils = require('./utils');

function Smsc (login, password) {
	this._login = login;
	this._password = password;
}
module.exports = Smsc;

Smsc.prototype.list = function (list, fn) {
	var msg = new Msg();
	
	msg.list(list);
	return msg;
};