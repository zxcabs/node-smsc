/**
 * User: jo
 * Date: 15.05.13
 * Time: 16:10
 *
 * Implement balnce method
 */

var Balance = module.exports = function Balance(api) {
	this.__api = api;

	api.__urlObj.pathname = '/sys/balance.php';
}

Balance.prototype.exec = function exec(fn) {

	function onExec(err, res, format) {
		if (err) return fn(err);
		if ('json' === format) return fn(null, parseFloat(res.balance, 10));
		fn(err, res, format);
	}

	this.__api.exec(onExec);
};