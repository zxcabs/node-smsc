var request = require('./request'),
	utils = require('./utils'),
	Msg = require('./msg');

function Smsc (login, password, opt) {
	this._login = login;
	this._password = utils.md5(password).toLowerCase();
	
	if (opt.sender) this.sender = opt.sender;
	if (opt.translit) this.translit = opt.translit;
	if (opt.time) this.time = opt.time;
	if (opt.tz) this.tz = opt.tz;
	if (opt.period) this.period = opt.period;
	if (opt.freq) this.freq = opt.freq;
	if (opt.flash) this.flash = opt.flash;
	if (opt.bin) this.bin = opt.bin;
	if (opt.push) this.push = opt.push;
	if (opt.ping) this.ping = opt.ping;
	if (opt.charset) this.charset = opt.charset;
	if (opt.cost) this.cost = opt.cost;
	if (opt.fmt) this.fmt = opt.fmt;
	if (opt.valid) this.valid = opt.valid;
	if (opt.maxsms) this.maxsms = opt.maxsms;
	if (opt.err) this.err = opt.err;
}
module.exports = Smsc;

Smsc._host = 'smsc.ru';
Smsc._path = '/sys/send.php';
Smsc._method = 'POST';
Smsc._fmt = ['text', 'int', 'xml', 'json'];

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
			host: Smsc._host,
			path: Smsc._path,
			method: msg.method || this.method,
			data: {
				login: this.login,
				psw: this.password,
				fmt: 3,
				charset: 'utf-8'
			}
		};
	
	msg.list(list);
	utils.extend(param.data, msg.data);
	
	request(param, fn);
	return msg;
};