# Implements smsc.ru api
[![Build Status](https://travis-ci.org/zxcabs/node-smsc.png?branch=master)](https://travis-ci.org/zxcabs/node-smsc)

## For developers

You need create `test/common/auth.js` file and put:
```javascript
exports.LOGIN = '<login>';
exports.PASSWORD = '<password>';
```
## Example
```javascript
var api = require('node-smsc');
```

## balance
Get balance [doc](http://smsc.ru/api/http/#bal)
```javascript
api(LOGIN, PASSWORD)
	.balance()
	.exec(function (err, balance) {
		//
	});
```

## Sender
[doc](http://smsc.ru/api/http/#senders)

### Add new sender
````javascript
api(LOGIN, PASSWORD)
	.sender()
	.add('<new sender name>', '<sender comment>')
	.exec(function (err, senderId) {
		//
	});
````

### Delete sender

````javascript
api(LOGIN, PASSWORD)
	.sender()
	.del(name)
	.exec(function (err) {
		//
	});
````
or
````javascript
api(LOGIN, PASSWORD)
	.sender()
	.del(senderId)
	.exec(function (err) {
		//
	});
````
