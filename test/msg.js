/**
 * User: jo
 * Date: 21.05.13
 * Time: 15:27
 *
 */

var should = require('should'),
	Msg = require('../lib/api/Msg');

/**
 * Test for Msg
 */
describe('Msg', function () {
	var msg = new Msg();

	beforeEach(function () {
		msg.__query = {};
	});

	/**
	 * Test for mes
	 */
	describe('#mes', function () {
		it('should set "mes"', function () {
			var str = 'Hello';
			msg.mes(str);
			msg.__query.mes.should.eql(str);
		});
	});

	/**
	 * Test for phones
	 */
	describe('#phones', function () {
		it('should set phones', function () {
			var phone = '79112223344';
			msg.phones(phone);
			should.exist(msg.__query.phones);
		});

		it('should be array', function () {
			var phone = '79112223344';
			msg.phones(phone);
			msg.__query.phones.should.be.an.instanceof(Array);
		});
	});

	/**
	 * Test for id
	 * Идентификатор сообщения. Назначается Клиентом. Служит для дальнейшей идентификации сообщения.
	 */
	describe('#id', function () {
		it('should set "id"', function () {
			msg.id(123);
			should.exist(msg.__query.id);
		});
	});

	/**
	 * Test for sender
	 */
	describe('#sender', function () {
		it('should set "sender"', function () {
			msg.sender(1234);
			should.exist(msg.__query.sender);
		});
	});

	/**
	 * Test for translit
	 */
	describe('#translit', function () {
		it('should set translit', function () {
			msg.translit();
			should.exist(msg.__query.translit);
		});
	});

	/**
	 * Test for time
	 */
	describe('#time', function () {

		it('should set "time"' , function () {
			msg.time('0-23');
			should.exist(msg.__query.time);
		});

		it('should set formated "time" if put Date', function () {
			var date = new Date('2013', '5', '23'),
				format = '23.06.13 00:00';

			msg.time(date);
			msg.__query.should.have.property('time', format);
		});
	});

	/**
	 * Test for tz
	 */
	describe('#tz', function () {
		it('should "tz"', function () {
			msg.tz(10);
			should.exist(msg.__query.tz);
		});
	});

	/**
	 * Test for period
	 */
	describe('#period', function () {
		it('should set "period"', function () {
			msg.period(10);
			should.exist(msg.__query.period);
		});
	});

	/**
	 * Test for freq
	 */
	describe('#freq', function () {
		it('should set "freq"', function () {
			msg.freq(23);
			should.exist(msg.__query.freq);
		});
	});

	/**
	 * Test for flash
	 */
	describe('#flash', function () {
		it('should set "flash === 1" if call without arguments', function () {
			msg.flash();
			msg.__query.should.have.property('flash', 1);
		});

		it('should set "flash === 1" if call with true value', function () {
		  	msg.flash(1);
			msg.__query.should.have.property('flash', 1);
			msg.flash(true);
			msg.__query.should.have.property('flash', 1);
			msg.flash('123121');
			msg.__query.should.have.property('flash', 1);
		});

		it('should set "flash === 0" if call with false value', function () {
			msg.flash(null);
			msg.__query.should.have.property('flash', 0);
			msg.flash('');
			msg.__query.should.have.property('flash', 0);
			msg.flash(false);
			msg.__query.should.have.property('flash', 0);
		});
	});

	/**
	 * Test for bin
	 */
	describe('#bin', function () {
		it('should set "bin === 1"', function () {
			msg.bin(1);
			msg.__query.should.have.property('bin', 1);
		});

		it('should set "bin === 0" if call without arguments', function () {
			msg.bin();
			msg.__query.should.have.property('bin', 0);
		});
	});

	/**
	 * Test for push
	 */
	describe('#push', function () {
		//TODO
	});


	/**
	 * Test for #valid
	 * Срок "жизни" SMS-сообщения. Определяет время, в течение которого оператор будет
	 * пытаться доставить сообщение абоненту.
	 * Диапазон от 1 до 24 часов. Также возможно передавать время в формате чч:мм в диапазоне от 00:01 до 24:00.
	 */
	describe('#valid', function () {

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