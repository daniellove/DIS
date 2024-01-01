console.log(9)

// class Request {
// 	constructor(method, endpoint, callback) {
// 		this.type = method;
// 		this.url = `https://api.sheetson.com/v2/sheets/${endpoint}`;
// 		this.withCredentials = true;
// 		this.headers = {
// 			'Content-Type': 'application/json',
// 			'Authorization': 'Bearer YD7XPP6efuRAuajXCZMkk3bBtWyqcHNCvvuAlCGGmWYxQI5gFqw-7FtbdPU',
// 			'X-Sheetson-Spreadsheet-Id': '13cAT4h0YwbZ4s6nQBrU9FUUt-nQjaU9iEAln7GVb5zM'
// 		};
// 		this.success = function(data) {
// 			callback(data);
// 		};
// 		this.error = function(a, b, c) {
// 			console.log('ERROR');
// 			console.log(a);
// 			console.log(b);
// 			console.log(c);
// 		};
// 	};
// };

const API_KEY = 'YD7XPP6efuRAuajXCZMkk3bBtWyqcHNCvvuAlCGGmWYxQI5gFqw-7FtbdPU';
const SHEET_ID = '13cAT4h0YwbZ4s6nQBrU9FUUt-nQjaU9iEAln7GVb5zM';
const HOST_URL = 'https://api.sheetson.com/v2/sheets/Characters';
const HEADERS = {
	'Authorization': `Bearer ${API_KEY}`,
    'X-Spreadsheet-Id': SHEET_ID,
    'Content-Type': 'application/json'
}
var SHEET_HEADERS = [];
var SHEET_ROWS = [];

const TEST_DATA = ["333", "test name", "dwarf", "dwarf", "10", "medium", "medium", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];

function getRows() {

	var url = new URL(HOST_URL);
	var params = {
		apiKey: API_KEY,
		spreadsheetId: SHEET_ID,
		limit: '100'
	};

	Object.keys(params).forEach(
		key => url.searchParams.append(
			key, encodeURIComponent(params[key])
		)
	);

	fetch(url)
		.then(r => r.json())
		.then(results => processRows(results));

	return

	function processRows(results) {
		for (var column in results[0]) {
			if (column != 'rowIndex') SHEET_HEADERS.push(column);
		};
		SHEET_ROWS = results;
		console.log(SHEET_HEADERS);
		console.log(SHEET_ROWS);

		return
	};
};


function postRow(data) {
	var row = {};
	for (var i in SHEET_HEADERS) {
		var header = SHEET_HEADERS[i];
		var content = data[i];
		row[header] = content;
	};

	fetch(HOST_URL, {
		method: 'POST',
		headers: HEADERS,
		body: JSON.stringify(row)
	})
		.then(r => r.json())
		.then(result => console.log(result));

	return
}



 



// function getTheThing() {
	// var rq = new Request('GET', 'Characters/2', doTheThing);
	// console.log(rq);
	// $.ajax(rq);
// }

function postTheThing() {

}

function doTheThing(data) {
	console.log(data)
}

