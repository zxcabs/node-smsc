/**
 * User: jo
 * Date: 06.05.13
 * Time: 15:35
 *
 */

var srv = require('./common/srv.js'),
	should = require('should'),
	api = require('../lib/api.js'),
	LOGIN = require('./common/auth.js').LOGIN,
	PASSWORD = require('./common/auth.js').PASSWORD;

/**
 * Test for API
 */
describe('API', function () {

	/**
	 * Test for balnce
	 */
	describe('balnce', function () {

		it('should return balance', function (done) {
			api(LOGIN, PASSWORD)
				.balance()
				.exec(function (err, result) {
					should.not.exist(err);
					should.exist(result);
					done();
				});
		});
	});
});