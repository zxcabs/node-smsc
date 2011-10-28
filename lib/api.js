var http = require('http'),
	utils = require('./utils');

function Smsc (login, password) {
	this._login = login;
	this._password = password;
}
module.exports = Smsc;

Smsc.prototype.list = function (list, fn) {
	return (new Msg('list', list)).on(fn);
};