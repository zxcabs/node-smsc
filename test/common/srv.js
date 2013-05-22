/**
 * User: jo
 * Date: 06.05.13
 * Time: 15:37
 *
 * Init proxy server
 */

var CACHE_DIR = __dirname + '/rescache',
	LOCAL_PORT = '8765',
	HOST = 'smsc.ru',
	REALPHONE;

try {
	var private = require('./private');
	REALPHONE = private.REALPHONE;
} catch (e) {}

var ProxyServer = require('node-http-proxy-cache');

var proxy = module.exports = new ProxyServer({
	dest: { host: HOST },
	localport: LOCAL_PORT,
	cachedir: CACHE_DIR
});

function replaceRealphone(obj, next) {
	if (!REALPHONE) return next();

	var query = obj.uri.query,
		reg = new RegExp(REALPHONE, 'g');

	for (var key in query) {
		query[key] = query[key].replace(reg, '');
	}

	next();
}

proxy.plugin('onRequestComplete', ProxyServer.plugins.replaceParamsInHash({ login: '*', psw: '*' }));
proxy.plugin('onRequestComplete', ProxyServer.plugins.modifyHash([replaceRealphone]));