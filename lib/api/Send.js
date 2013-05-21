/**
 * User: jo
 * Date: 20.05.13
 * Time: 16:38
 *
 * Send sms
 */

var Msg = require('./Msg');

module.exports = Send;

function Send(api) {
	this.__api = api;
	api.__urlObj.pathname = '/sys/send.php';
}

Send.prototype.msg = function msg(msg) {
	return new Msg(this, msg);
};