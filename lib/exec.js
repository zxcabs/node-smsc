/**
 * User: jo
 * Date: 15.05.13
 * Time: 16:19
 *
 * Call exec method
 */

module.exports = function exec() {
	var api = this.__api;
	api.exec.apply(api, arguments);
};
