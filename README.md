Implements smsc.ru api
=====================================================
[![Build Status](https://travis-ci.org/zxcabs/node-smsc.png?branch=master)](https://travis-ci.org/zxcabs/node-smsc)

Get balance
-----------
http://smsc.ru/api/http/#bal

	api(LOGIN, PASSWORD)
		.balance()
		.exec(function (err, balance) {
			//
		});

