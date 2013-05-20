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

### Get sender name list
````javascript
api(LOGIN, PASSWORD)
	.sender()
	.get()
	.exec(function (err, list) {
		// list => ['<name>', '<name>', ...]
	});
````

## Group
[doc](http://smsc.ru/api/http/#group)

### Add new group
````javascript
var name = 'new group',
	number = 1234;

api(LOGIN, PASSWORD)
	.group()
	.add(name, number)
	.exec(function (err, groupId) {
		//
	});
````
or
````javascript
var name = 'new group';

api(LOGIN, PASSWORD)
	.group()
	.add(name)
	.exec(function (err, groupId) {
		//
	});
````

### Rename group
````javascript
api(LOGIN, PASSWORD)
	.group()
	.rename(groupId, 'my group new name')
	.exec(function (err) {
		//
	});
````

### Delete group
````javascript
api(LOGIN, PASSWORD)
	.group()
	.del(groupId)
	.exec(function (err) {
		//
	});
````

### Get group list
````javascript
api(LOGIN, PASSWORD)
	.group()
	.get()
	.exec(function (err, list) {
		// list => [{ 'id': <id>, 'name': '<name>' }, ...]
		done();
	});
````

## Contact
[doc](http://smsc.ru/api/http/#contact)

### Add
````javascript
api(LOGIN, PASSWORD)
	.contact()
	.add('Mr.Anderson')
	.phone('+79112223341')
	.phone('+79112223342')
	.group(5924)
	.group(5922)
	.first('Thomas')
	.middle('A.')
	.last('Anderson')
	.birthday(new Date(1962, 2, 11))
	.myid(1234)
	.comment('Neo')
	.tags('neo')
	.tags('matrix')
	//Other phone numbers. According to the distribution
	//of the numbers of SMS-messages is performed.
	.other('+79112223351')
	.other('+79112223352')
	//You can specify a limit posts to contact and it will decrease after each send a message to that contact.
    //Upon reaching zero contact stops to get out of the phone book. Leave field blank if you do not need limits.
	.limit(10)
	.exec(function (err, id) {
		//
	});
````