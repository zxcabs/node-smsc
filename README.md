Module implements smsc.ru api for sending sms message.
=====================================================

example 1:
---------

    var Sms = require('../').Smsc,
        sms = new Sms('login', 'password');
        
    sms.list({phone: '7911111111', text: 'test'}, function (err, result) {
        console.log('Error: %s, result: %s', err, result);
    });
    
