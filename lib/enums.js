/**
 * User: jo
 * Date: 16.05.13
 * Time: 14:41
 *
 */


exports.METHODS = ['get', 'post'];

exports.PROTOCOLS = ['http'];

exports.FORMATS = {
		'text': 0,
		'text2': 1,
		'xml': 2,
		'json': 3,

		'0': 'text',
		'1': 'text2',
		'2': 'xml',
		'3': 'json'
	};

exports.CHARSETS = ['utf-8', 'koi8-r', 'windows-1251'];