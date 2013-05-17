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

	/**
	 * Test for senders
	 */
	describe('#senders', function () {
		var name = 'my_test_1';

		/**
		 * Test for add
		 */
		describe('#add', function () {
			it('should add new sender ' + name, function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.sender()
					.add(name, 'New sender')
					.exec(function (err, senderId) {
						should.not.exist(err);
						senderId.should.eql(24336);
						done();
					});
			});

			it('should return error if comment not set', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.sender()
					.add('test_2')
					.exec(function (err) {
						should.exist(err);
						err.should.have.property('error', 'parameters error');
						err.should.have.property('error_code', 1);
						done();
					});
			});

			it('should return error if sender comment a null string', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.sender()
					.add('test_3', '')
					.exec(function (err, senderId) {
						should.exist(err);
						err.should.have.property('error', 'parameters error');
						err.should.have.property('error_code', 1);
						done();
					});
			});

			it('should return error if sender name already exist', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.sender()
					.add(name, 'New sender 2')
					.exec(function (err, senderId) {
						should.exist(err);
						err.should.have.property('error', 'save error');
						err.should.have.property('error_code', 5);
						done();
					});
			});
		});

		/**
		 * Test for del
		 */
		describe('#del', function () {
			it('should delete sender by name', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.sender()
					.del(name)
					.exec(function (err) {
						should.not.exist(err);
						done();
					});
			});

			it('should delete sender by id', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.sender()
					.add('test3', 'New sender')
					.exec(function (err, senderId) {
						should.not.exist(err);

						api(LOGIN, PASSWORD, APIOPT)
							.sender()
							.del(senderId)
							.exec(function (err) {
								should.not.exist(err);
								done();
							});
					});
			});

			it('should return error when sender not exist', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.sender()
					.del('not exist')
					.exec(function (err) {
						should.exist(err);
						err.should.have.property('error', 'record not found');
						err.should.have.property('error_code', 3);
						done();
					});
			});
		});
	});
});