/**
 * User: jo
 * Date: 20.05.13
 * Time: 16:38
 *
 * Send sms
 */

var concat = require('../tools.js').concat;

function Send(api) {
	this.__api = api;
	api.__urlObj.pathname = '/sys/send.php';
}

Send.prototype.msg = function msg(msg) {
	return new Msg(this, msg);
};


/**
 * Msg
 */
function Msg(send, msg) {
	this.__send = send;

	this.__query = {};
	if (msg) this.msg(msg);
}

Msg.prototype.msg = function msg(msg) {
	this.__query.msg = msg;
	return this;
};

Msg.prototype.phones = function phones(phones) {
	this.__query.phones = concat(this.__query.phones, phones);
	return this;
};

/**
 * @param id Идентификатор сообщения. Назначается Клиентом. Служит для дальнейшей идентификации сообщения.
 *           Если не указывать, то будет назначен автоматически. Не обязательно уникален.
 *           В случае 2-х одинаковых идентификаторов по запросу статуса будет возвращен статус последнего сообщения.
 *           Идентификатор представляет собой 32-битное число в диапазоне от 1 до 2147483647.
 * @returns {Msg}
 */
Msg.prototype.id = function id(id) {
	if (id >= 1 && id <= 2147483647) this.__query.id = id;
	return this;
};

/**
 * @param sender Имя отправителя, отображаемое в телефоне получателя. Разрешены английские буквы, цифры,
 *               пробел и некоторые символы. Длина – 11 символов или 15 цифр.
 *               Динамическое имя включается по запросу. Для отключения Sender ID по умолчанию необходимо
 *               в качестве имени передать пустую строку.
 * @returns {Msg}
 */
Msg.prototype.sender = function sender(sender) {
	sender = '' + sender;

	if (/^\d+$/.test(sender) && sender.length && sender.length <= 15 ||
		sender.length && sender.length <= 11) {

		this.__query.sender = sender;
	}

	return this;

};

/**
 * @param flag Признак того, что сообщение необходимо перевести в транслит.
 *             0 (по умолчанию) – не переводить в транслит.
 *             1 – перевести в транслит в виде "translit".
 *             2 – перевести в транслит в виде "mpaHc/Ium".
 * @returns {Msg}
 */
Msg.prototype.translit = function translit(flag) {
	this.__query.translit = flag >= 0 || flag <= 3 ? flag: 0;
	return this;
};

Msg.prototype.time = function time(date) {
	this.__time = date;
	return this;
};

Msg.prototype.tz = function tz(tz) {
	this.__tz = tz;
	return this;
};

Msg.prototype.period = function period(period) {
	this.__period = period;
	return this;
};

Msg.prototype.freq = function freq(freq) {
	this.__freq = freq;
	return this;
};

Msg.prototype.flash = function flash(flag) {
	this.__flash = flag;
	return this;
};

Msg.prototype.bin = function bin(flag) {
	this.__bin = flag;
	return this;
};

Msg.prototype.push = function push(flag) {
	this.__push = flag;
	return this;
};

Msg.prototype.cost = function cost(cost) {
	this.__cost = cost;
	return this;
};

Msg.prototype.valid = function valid(tm) {
	this.__valid = tm;
	return this;
};

Msg.prototype.maxsms = function maxsms(max) {
	this.__maxsms = max;
	return this;
};

Msg.prototype.err = function err(flag) {
	this.__err = flag;
	return this;
};

Msg.prototype.pp = function pp(id) {
	this.__pp = id;
	return this;
};