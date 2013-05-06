/**
 * User: jo
 * Date: 06.05.13
 * Time: 15:37
 *
 * Init proxy server
 */

var CACHE_DIR = 'rescache',
	LOCAL_PORT = '8765',
	HOST = 'smsc.ru';

var ProxyServer = require('node-http-proxy-cache');

var proxy = module.exports = new ProxyServer({
	dest: { host: HOST },
	localport: LOCAL_PORT,
	cachedir: CACHE_DIR
});


