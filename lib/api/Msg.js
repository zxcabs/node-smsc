/**
 * User: jo
 * Date: 21.05.13
 * Time: 15:27
 *
 */


var tools = require('../tools.js'),
	concat = tools.concat,
	lib = require('node-lib'),
	isDate = lib.is.Date,
	isString = lib.is.String;


module.exports = Msg;


function Msg(send, msg) {
	this.__send = send;

	this.__query = {};
	if (msg) this.msg(msg);
}

Msg.prototype.msg = function msg(msg) {
	this.__query.mes = msg;
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

/**
 * Время отправки SMS-сообщения абоненту.
 * Форматы:
 * 1) Date
 * 2) h1-h2. Задает диапазон времени в часах. Если текущее время меньше h1, то
 *    SMS-сообщение будет отправлено абоненту при наступлении времени h1, если текущее время попадает в промежуток
 *    от h1 до h2, то сообщение будет отправлено немедленно, в другом случае отправка будет выполнена на следующий день
 *    при достижении времени h1. Данная функция, например, полезна для того, чтобы не допустить получение SMS-сообщений
 *    абонентами в ночное время.
 * 3) 0ts, где ts – timestamp, время в секундах, прошедшее с 1 января 1970 года.
 * 4) +m. Задает относительное смещение времени от текущего в минутах.
 *    Символ + должен кодироваться как %2B в http-запросе.
 *
 *    Если time = 0 (по умолчанию), то сообщение будет отправлено немедленно.
 */
Msg.prototype.time = function time(h1, h2) {
	var time;

	if (!h2) {
		if (isDate(h1)) {
			time = lib.dateformat(h1, 'dd.mm.yy HH:MM')
		} else if (/^+|0/.test(h1)) {
			time = h1;
		}
	} else {
		time = tools.getHour(h1);
		time += '-' + tools.getHour(h2);
	}

	this.__query.time = time;
	return this;
};

/**
 * @param {Integer} tz Часовой пояс, в котором задается параметр time. Указывается относительно московского времени.
 *                     Параметр tz может быть как положительным, так и отрицательным. Если tz равен 0,
 *                     то будет использован московский часовой пояс, если же параметр tz не задан, то часовой пояс
 *                     будет взят из настроек Клиента.
 * @returns {*}
 */
Msg.prototype.tz = function tz(tz) {
	this.__query.tz = parseInt(tz, 10) || 0;
	return this;
};

/**
 * @param {Number} period Промежуток времени, в течение которого необходимо отправить рассылку.
 *                       Представляет собой число в диапазоне от 0.1 до 720 часов. Применяется совместно
 *                       с параметром freq. Данный параметр позволяет растянуть рассылку во времени для постепенного
 *                       получения SMS-сообщений абонентами.
 * @returns {*}
 */
Msg.prototype.period = function period(period) {
	period = parseFloat(period);

	if (period && period > 0) {
		period = period > 720
			? 720
			: (period * 10 | 0) / 10;

	} else {
		period = 0.1;
	}

	this.__query.period = period;
	return this;
};


/**
 * @param {Integer} freq Интервал или частота, с которой нужно отправлять SMS-рассылку на очередную группу номеров.
 *                       Количество номеров в группе рассчитывается автоматически на основе параметров period и freq.
 *                       Задается в промежутке от 1 до 1440 минут. Без параметра period параметр freq игнорируется.
 * @returns {*}
 */
Msg.prototype.freq = function freq(freq) {
	freq = freq | 0;
	this.__query.freq = freq < 1
		? 1
		: freq > 1440
		? 1440
		: freq;
	return this;
};

/**
 *
 * @param {Boolean} flag Признак Flash сообщения, отображаемого сразу на экране телефона.
 *                       0 (по умолчанию) – обычное сообщение.
 *                       1 – Flash сообщение
 * @returns {*}
 */
Msg.prototype.flash = function flash(flag) {
	this.__query.flash = flag ? 1: 0;
	return this;
};

/**
 *
 * @param {Integer} flag Признак бинарного сообщения.
 *                       0 (по умолчанию) – обычное сообщение.
 *                       1 – бинарное сообщение. В http-запросе необходимо закодировать с помощью функции urlencode.
 *                       2 – бинарное сообщение, представленное в виде шестнадцатеричной строки (hex).
 * @returns {*}
 */
Msg.prototype.bin = function bin(flag) {
	flag = flag | 0;
	this.__query.bin = flag >= 0 && flag <= 2 ? flag: 0;
	return this;
};

/**
 *
 * @param {Boolean} flag Признак wap-push сообщения, с помощью которого можно отправить интернет-ссылку на телефон.
 *                       0 (по умолчанию) – обычное сообщение.
 *                       1 – wap-push сообщение. В параметре mes необходимо передать
 *                       ссылку и заголовок через перевод строки
 * @returns {*}
 */
Msg.prototype.push = function push(flag) {
	this.__query.push = flag ? 1: 0;
	return this;
};

/**
 *
 * @param {Integer} cost Признак необходимости получения стоимости рассылки.
 *                       0 (по умолчанию) – обычная отправка.
 *                       1 – получить стоимость рассылки без реальной отправки.
 *                       2 – обычная отправка, но добавить в ответ стоимость выполненной рассылки.
 *                       3 – обычная отправка, но добавить в ответ стоимость и новый баланс Клиента.
 * @returns {*}
 */
Msg.prototype.cost = function cost(cost) {
	cost = cost | 0;
	this.__query.cost = cost >= 0 && cost <= 3 ? cost: 0;
	return this;
};


var validReg = /^(([1-9]|[1]\d|2[0-4])|(00:0[1-9]|0[1-9]:[0-5]\d|1\d:[0-5]\d|2[0-4]:[0-5]\d)|(:0[1-9]|:[1-5]\d))$/;
/**
 *
 * @param {String} tm Срок "жизни" SMS-сообщения. Определяет время, в течение которого оператор будет
 *                    пытаться доставить сообщение абоненту. Диапазон от 1 до 24 часов.
 *                    Также возможно передавать время в формате чч:мм в диапазоне от 00:01 до 24:00.
 * @returns {*}
 */
Msg.prototype.valid = function valid(tm) {

	if (tm) {
		tm += '';
		if (validReg.test(tm)) this.__query.valid = ':' === tm[0] ? '00' + tm: tm;
	} else {
		delete this.__query.tm;
	}

	return this;
};

/**
 *
 * @param {Integer} max Максимальное количество SMS, на которые может разбиться длинное сообщение.
 *                      Слишком длинные сообщения будут обрезаться так, чтобы не переполнить количество SMS,
 *                      требуемых для их передачи. Этим параметром вы можете ограничить максимальную стоимость
 *                      сообщений, так как за каждое SMS снимается отдельная плата.
 * @returns {*}
 */
Msg.prototype.maxsms = function maxsms(max) {
	max = max | 0;
	this.__query.maxsms = max > 0 ? max : 0;
	return this;
};

/**
 *
 * @param {Boolean} flag Признак необходимости добавления в ответ сервера списка ошибочных номеров.
 *                       0 (по умолчанию) – не добавлять список (обычный ответ сервера).
 *                       1 – в ответ добавляется список ошибочных номеров телефонов с соответствующими статусами.
 * @returns {*}
 */
Msg.prototype.err = function err(flag) {
	this.__query.err = flag ? 1: 0;
	return this;
};

/**
 *
 * @param id Осуществляет привязку Клиента в качестве реферала к определенному ID партнера.
 *           При передаче данного параметра в виде "pp=<ID партнера>" Клиент с логином login становится
 *           рефералом партнера с ID <ID партнера>. Сделать рефералом можно только нового Клиента,
 *           зарегистрированного в сервисе не более месяца назад и имеющего не более 1000 отправленных сообщений,
 *           который еще не является рефералом другого партнера. Данный параметр позволяет устанавливать Клиента
 *           в качестве реферала из своих сервисов и программ, где нет возможности зарегистрировать
 *           Клиента по реферальной ссылке.
 * @returns {*}
 */
Msg.prototype.pp = function pp(id) {
	this.__query.pp = id;
	return this;
};

Msg.prototype.exec = function exec(fn) {
	var api = this.__send.__api,
		query = api.__urlObj.query;

	lib.util.merge(query, this.__query);

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json') return fn(null, res);
		fn(err, res, format);
	}

	api.exec(onExec);
};

