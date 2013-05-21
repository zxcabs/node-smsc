/**
 * User: jo
 * Date: 21.05.13
 * Time: 15:27
 *
 */

var Msg = require('../lib/api/Msg');

/**
 * Test for Msg
 */
describe('Msg', function () {

	/**
	 * Test for #valid
	 * Срок "жизни" SMS-сообщения. Определяет время, в течение которого оператор будет
	 * пытаться доставить сообщение абоненту.
	 * Диапазон от 1 до 24 часов. Также возможно передавать время в формате чч:мм в диапазоне от 00:01 до 24:00.
	 */
	describe('#valid', function () {
		var msg = new Msg();

		beforeEach(function () {
			delete msg.__query.valid;
		});

		it('should not set if put "00"', function () {
			msg.valid('00');
			msg.__query.should.have.not.property('valid');
		});

		it('should not set if put "25"', function () {
			msg.valid('25');
			msg.__query.should.have.not.property('valid');
		});

		it('should not set if put "00:00"', function () {
			msg.valid('00:00');
			msg.__query.should.have.not.property('valid');
		});

		it('should not set if put "25:00"', function () {
			msg.valid('25:00');
			msg.__query.should.have.not.property('valid');
		});

		it('should not set if put "00:60"', function () {
			msg.valid('00:60');
			msg.__query.should.have.not.property('valid');
		});

		it('should not set if put ":00"', function () {
			msg.valid(':00');
			msg.__query.should.have.not.property('valid');
		});

		it('should not set if put ":60"', function () {
			msg.valid(':60');
			msg.__query.should.have.not.property('valid');
		});

		it('should not set if put any invalid string ', function () {
			msg.valid('-00:00');
			msg.__query.should.have.not.property('valid');
			msg.valid('asdasdf');
			msg.__query.should.have.not.property('valid');
			msg.valid('0:0');
			msg.__query.should.have.not.property('valid');
			msg.valid('00:0');
			msg.__query.should.have.not.property('valid');
			msg.valid('00:');
			msg.__query.should.have.not.property('valid');
			msg.valid('0:');
			msg.__query.should.have.not.property('valid');
			msg.valid(':0');
			msg.__query.should.have.not.property('valid');
		});

		it('should set 1 if put 1', function () {
		   	msg.valid(1);
            msg.__query.should.have.property('valid', '1');
		});

		it('should set 24 if put 24', function () {
		   	msg.valid(24);
            msg.__query.should.have.property('valid', '24');
		});

		it('should set "00:01" if put "00:01"', function () {
			msg.valid("00:01");
			msg.__query.should.have.property('valid', "00:01");
		});

		it('should set "01:00" if put "01:00"', function () {
			msg.valid("01:00");
			msg.__query.should.have.property('valid', "01:00");
		});

		it('should set "24:59" if put "24:59"', function () {
			msg.valid("24:59");
			msg.__query.should.have.property('valid', "24:59");
		});

		it('should set "00:01" if put ":01"', function () {
			msg.valid(":01");
			msg.__query.should.have.property('valid', "00:01");
		});

		it('should set "00:59" if put ":59"', function () {
			msg.valid(":59");
			msg.__query.should.have.property('valid', "00:59");
		});
	});

});