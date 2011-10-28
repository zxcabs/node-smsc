//request

var http = require('http'),
	querystring = require('querystring');

module.exports = function (param, fn) {
	var data    = querystring.stringify(param.data || {}),
		options = {
			host  : param.host,
			ports : param.port || 80,
			path  : param.path,
			method: param.method || 'GET',
			headers: param.headers || {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': data.length
				}
		},
		timeout = param.timeout || 120, //time out 120 second
		request,
		timeoutId = setTimeout(function () {
					request.abort();
					if (fn) fn('Time out', null);
				}, 1000 * timeout);
	
	function end(err, data) {
		clearTimeout(timeoutId);
		if (fn) fn(err, data);
	}	
	
	function handler(res) {
		var buff;
		
		if (res.statusCode !== 200) {
			end('Status code: ' + res.statusCode);
		} else {
			buff = new Buffer(0);
		
			res.on('data', function (chunk) {
				//chunk есть буффер
				var newBuff = new Buffer(buff.length + chunk.length);
				buff.copy(newBuff, 0, 0, buff.length);
				chunk.copy(newBuff, buff.length, 0, chunk.length);
			
				buff = newBuff;
			});
		
			res.on('end', function () {
				if (buff.length > 0) {
					end(null, buff.toString('utf8'));
				} else {
					end();
				}
			});
		}
	}
	
	request = http.request(options, handler);
	request.write(data);
	request.end();
};