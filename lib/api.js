var request = require('./request'),
	utils = require('./utils'),
	Msg = require('./msg');

function Smsc (login, password, opt) {
	this._login = login;
	this._password = utils.md5(password).toLowerCase();
	//из объекта опций удаляем все лешние поля
	this._opt = opt ? utils.delPropNotIncluded(opt, ['sender']) : {};
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
	utils.extend(param.data, this._opt);
	
	request(param, function (err, result) {
		if (err) {
			fn(err);
		} else {
			try {
				result = JSON.parse(result);
			} catch (e) {
				fn(result);
			}
			
			if (result.error) {
				fn(result);
			} else {
				fn(null, result);
			}
		}			
	});
	return msg;
};