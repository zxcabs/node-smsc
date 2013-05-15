/**
 * User: jo
 * Date: 06.05.13
 * Time: 15:35
 *
 */

var srv = require('./common/srv.js'),
	should = require('should'),
	api = require('../lib/index.js'),
	LOGIN = require('./common/auth.js').LOGIN,
	PASSWORD = require('./common/auth.js').PASSWORD;

//API options
var APIOPT = {
		hostname: 'localhost',
		port: srv.localport
};

/**
 * Test for API
 */
describe('API', function () {

	before(function (done) {
		srv.listen(done);
	});

	after(function (done) {
		srv.close(done);
	});

	/**
	 * Test for balance
	 */
	describe('balance', function () {

		it('should return balance', function (done) {
			api(LOGIN, PASSWORD, APIOPT)
				.balance()
				.exec(function (err, balance) {
					should.not.exist(err);
					result.should.eql(15);
					done();
				});
		});
	});
});