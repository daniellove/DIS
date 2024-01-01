console.log(2)

class Request {
	constructor(method, endpoint, callback) {
		this.type = method;
		this.url = `https://api.sheetson.com/v2/sheets/${endpoint}`;
		this.withCredentials = true;
		this.headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer YD7XPP6efuRAuajXCZMkk3bBtWyqcHNCvvuAlCGGmWYxQI5gFqw-7FtbdPU',
			'X-Sheetson-Spreadsheet-Id': '13cAT4h0YwbZ4s6nQBrU9FUUt-nQjaU9iEAln7GVb5zM'
		};
		this.success = function(data) {
			callback(data);
		};
		this.error = function(a, b, c) {
			console.log('ERROR');
			console.log(a);
			console.log(b);
			console.log(c);
		};
	};
};

function getTheThing() {
	var rq = new Request('GET', 'Characters/2', doTheThing);
	console.log(rq);
	$.ajax(rq);
}

function postTheThing() {

}

function doTheThing(data) {
	console.log(data)
}

