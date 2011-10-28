var request = require('./request'),
	utils = require('./utils'),
	Msg = require('./msg');

function Smsc (login, password) {
	this._login = login;
	this._password = utils.md5(password).toLowerCase();
}
module.exports = Smsc;

Smsc._host = 'smsc.ru';
Smsc._path = '/sys/send.php';
Smsc._method = 'POST';

Smsc.prototype.__defineGetter__('method', function () {
	return this._method || Smsc._method;
});

Smsc.prototype.__defineSetter__('method', function (m) {
	return this._method = m;
});

Smsc.prototype.__defineGetter__('login', function () {
	return this._login;
});

Smsc.prototype.__defineSetter__('login', function (l) {
	return this._login = l;
});

Smsc.prototype.__defineGetter__('password', function () {
	return this._password;
});

Smsc.prototype.__defineSetter__('password', function (p) {
	return this._password = utils.md5(p).toLowerCase();
});

Smsc.prototype.list = function (list, fn) {
	var msg = new Msg(),
		param = {
			method: msg.method || this.method,
			data: {
				login: this.login,
				psw: this.password,
			}
		};
	
	msg.list(list);
	utils.extend(param.data, msg.data);
	
	request(param, fn);
	return msg;
};