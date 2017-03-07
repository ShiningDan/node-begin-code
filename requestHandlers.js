let querystring = require("querystring");
let fs = require("fs");
let formidable = require("formidable");

function start(response) {
	console.log('Reques handler "start" was called');
	
	let body = `<html>
	<head>
		<meta http-qnuiv="Content-Type" content="text/html" charset=UTF-8/>
	</head>
	<body>
		<form action="/upload" method="post" enctype="multipart/form-data">
			<input type="file" name="upload" multiple="multiple"/>
			<input type="submit" value="Upload file" />
		</form>
	</body>
	</html>`
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request) {
	console.log('Request handler "upload" was called');

	let form = new formidable.IncomingForm();
	console.log('About to parse');
	form.parse(request, function(error, fields, files) {
	    console.log("parsing done");
	    fs.renameSync(files.upload.path, "./tmp/test.png");
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("received image:<br/>");
	    response.write("<img src='/show' />");
	    response.end();
	});
}

function show(response) {
	console.log('Request handler "show" was called.');
	fs.readFile("./tmp/test.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;