let http = require("http");
let url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		console.log('request received.');
		let pathname = url.parse(request.url).pathname;
		console.log('request for ' + pathname + ' received.');
		route(handle, pathname, response, request);
	}
	http.createServer(onRequest).listen(8888);
	console.log('server start listen.');
}

exports.start = start;