/**
 * User: jo
 * Date: 15.05.13
 * Time: 16:10
 *
 * Implement balnce method
 */
var exec = require('./exec.js');


module.exports = Balance;

function Balance(api) {
	this.__api = api;

	api.__urlObj.pathname = '/sys/balance.php';
}

Balance.prototype.exec = exec;