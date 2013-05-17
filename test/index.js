/**
 * User: jo
 * Date: 06.05.13
 * Time: 15:35
 *
 */

var srv = require('./common/srv.js'),
	should = require('should'),
	crypto = require('crypto'),
	api = require('../lib/index.js'),
	LOGIN = '',
	PASSWORD = '';

/**
 * You need create ./common/auth.js and export LOGIN and PASSWORD
 * Proxy server will be replace auth data in times calculate hash sum
 */
try {
	var auth = require('./common/auth.js');
	LOGIN = auth.LOGIN;
	PASSWORD = auth.PASSWORD;
} catch (e) {
	console.warn('You need create ./common/auth.js and export LOGIN and PASSWORD');
}

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
	 * Test for api constructor
	 */
	describe('constructor', function () {
		it('should password eql md5(password).toLowerCase()', function () {
			var hash = crypto.createHash('md5').update(PASSWORD).digest('hex').toLowerCase();

			api(LOGIN, PASSWORD)
				.password.should.eql(hash);
		});
	});


	/**
	 * Test for balance
	 */
	describe('#balance', function () {

		it('should return balance', function (done) {
			api(LOGIN, PASSWORD, APIOPT)
				.balance()
				.exec(function (err, balance) {
					should.not.exist(err);
					balance.should.eql(15);
					done();
				});
		});
	});

	/**
	 * Test for send
	 */
	describe('#send', function () {

		it('should send message to one phone', function (done) {
			//TODO
			done();
		});
	});
});