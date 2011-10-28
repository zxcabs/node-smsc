Module implements smsc.ru api for sending sms message.
=====================================================

first:
------
    var Sms = require('node-smsc').Smsc,
        sms = new Sms('login', 'password');

example 1:
---------

    sms.list({phone: '7911111111', text: 'text msg'}, function (err, result) {
        console.log('Error: %s, result: %s', err, result);
    });
    

example 2:
----------

    sms.list({phone: ['7911111111', '79222222222'], text: 'text msg'}, function (err, result) {
        console.log('Error: %s, result: %s', err, result);
    });

example 3:
----------

    sms.list({phone: '7911111111,79222222222', text: 'text msg'}, function (err, result) {
        console.log('Error: %s, result: %s', err, result);
    });

example 4:
----------

    sms.list([{phone: '7911111111', text: 'text msg 1'}, {phone: '79222222222', text: 'text msg 2'}] function (err, result) {
        console.log('Error: %s, result: %s', err, result);
    });

