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

		/**
		 * Test for list
		 */
		describe('#list', function () {
			it('should return senders list', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.sender()
					.get()
					.exec(function (err, list) {
						should.not.exist(err);
						should.exist(list);
						list[0].sender.should.eql('zxcabs');
						done();
					});
			});
		});
	});

	/**
	 * Test for group
	 */
	describe('#group', function () {

		/**
		 * Test for add
		 */
		describe('#add', function () {
			it('should create new group with groupNumber', function (done) {
				var groupNum = 1234;

				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.add('new group', groupNum)
					.exec(function (err, groupId) {
						should.not.exist(err);
						should.exist(groupId);
						done();
					});
			});

			it('should create new group without groupNumber', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.add('new group')
					.exec(function (err, groupId) {
						should.not.exist(err);
						should.exist(groupId);
						done();
					});
			});

			it('should return error if group number already exist', function (done) {
				var groupNum = 1234;

				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.add('new group 2', groupNum)
					.exec(function (err, groupId) {
						err.should.have.property('error', 'save error');
						err.should.have.property('error_code', 5);
						done();
					});
			});
		});

		/**
		 * Test for rename
		 */
		describe('#rename', function () {
			it('should rename group', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.add('my group')
					.exec(function (err, groupId) {
						should.not.exist(err);

						api(LOGIN, PASSWORD, APIOPT)
							.group()
							.rename(groupId, 'my group new name')
							.exec(function (err) {
								should.not.exist(err);
								done();
							});
					});
			});

			it('should return error if group not exist', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.rename(12345, 'my group new name')
					.exec(function (err) {
						err.should.have.property('error', 'record not found');
						err.should.have.property('error_code', 3);
						done();
					});
			});

			it('should return error if new name not set', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.rename(5924)
					.exec(function (err) {
						err.should.have.property('error', 'parameters error');
						err.should.have.property('error_code', 1);
						done();
					});
			});

			it('should return error if new name is empty string', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.rename(5924, '')
					.exec(function (err) {
						err.should.have.property('error', 'parameters error');
						err.should.have.property('error_code', 1);
						done();
					});
			});

			it('should return error if new name is space string', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.rename(5924, ' ')
					.exec(function (err) {
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
			it('should delete group', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.add('new group 3')
					.exec(function (err, groupId) {
						should.not.exist(err);

						api(LOGIN, PASSWORD, APIOPT)
							.group()
							.del(groupId)
							.exec(function (err) {
								should.not.exist(err);
								done();
							});
					});
			});

			it('should return error "record not found" if group not exist', function (done) {
					api(LOGIN, PASSWORD, APIOPT)
						.group()
						.del(4321)
						.exec(function (err) {
							err.should.have.property('error', 'record not found');
							err.should.have.property('error_code', 3);
							done();
						});
			});

			it('should return error "parameters error" if groupId not set', function (done) {
					api(LOGIN, PASSWORD, APIOPT)
						.group()
						.del()
						.exec(function (err) {
							err.should.have.property('error', 'parameters error');
							err.should.have.property('error_code', 1);
							done();
						});
			});

			it('should return error "parameters error" if wrong groupId', function (done) {
					api(LOGIN, PASSWORD, APIOPT)
						.group()
						.del('WRONG123')
						.exec(function (err) {
							err.should.have.property('error', 'parameters error');
							err.should.have.property('error_code', 1);
							done();
						});
			});
		});

		/**
		 * Test for get
		 * get group list
		 */
		describe('#get', function () {
			it('should return group list', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.group()
					.get()
					.exec(function (err, list) {
						should.not.exist(err);
						should.exist(list);
						list[0].should.have.property('id', 5924);
						list[0].should.have.property('name', 'My group new name');
						done();
					});
			});
		});
	});

	/**
	 * Test for contact
	 */
	describe('#contact', function () {
		/**
		 * Test for add
		 */
		describe('#add', function () {
			it('should create new contact', function (done) {
				api(LOGIN, PASSWORD, APIOPT)
					.contact()
					.add('Mr.Anderson')
					.phone('+79112223344')
					.group(5924)
					.first('Thomas')
					.middle('A.')
					.last('Anderson')
					.birthday(new Date(1962, 2, 11))
					.myid(1234)
					.comment('Neo')
					.tags('neo')
					.other('+79112223355')
					.exec(function (err, id) {
						should.not.exist(err);
						should.exist(id);
						done();
					});
			});
		});
	});
});