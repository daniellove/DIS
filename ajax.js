const API_KEY = 'YD7XPP6efuRAuajXCZMkk3bBtWyqcHNCvvuAlCGGmWYxQI5gFqw-7FtbdPU';
const SHEET_ID = '13cAT4h0YwbZ4s6nQBrU9FUUt-nQjaU9iEAln7GVb5zM';
const HOST_URL = 'https://api.sheetson.com/v2/sheets/Characters';
const HEADERS = {
	'Authorization': `Bearer ${API_KEY}`,
    'X-Spreadsheet-Id': SHEET_ID,
    'Content-Type': 'application/json'
}
const ROW_COUNT = 24;

var CURRENT_CHARACTER = 4;
var SHEET_HEADERS = [];
var SHEET_ROWS = [];
var ROW_SKIPS = 0 

const TEST_DATA = ["333", "test name", "dwarf", "dwarf", "10", "medium", "medium", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
const TEST_UPDATE = {'character_name': 'New Name'}

$.ajaxSetup({headers: HEADERS})
getRows()
function getRows() {
	$.ajax({
		type: 'GET',
		url: HOST_URL,
		data: {
			'apiKey': API_KEY,
			'spreadsheetId': SHEET_ID,
			'limit': ROW_COUNT.toString(),
			'skip': ROW_SKIPS.toString(),
			'no-cache': true
		},
		success: (data => processRows(data))
	});

	return
}

function processRows(data) {
	console.log(data)

	SHEET_ROWS = SHEET_ROWS.concat(data['results']);
	if (SHEET_HEADERS.length == 0) {
		for (var column in SHEET_ROWS[0]) {
			if (column != 'rowIndex') SHEET_HEADERS.push(column);
		};
	};

	if (data['hasNextPage']) {
		if (!ROW_SKIPS) ROW_SKIPS = 1
		ROW_SKIPS = ROW_SKIPS + ROW_COUNT
		getRows()
	} else {
		console.log('Data loaded:');
		console.log(SHEET_ROWS);
	}

	return
};


function postRow(data) {
	var row = {};
	for (var i in SHEET_HEADERS) {
		var header = SHEET_HEADERS[i];
		var content = data[i];
		row[header] = content;
	};

	$.ajax({
		type: 'POST',
		url: HOST_URL,
		data: JSON.stringify(row),
		success: function(response) {
			console.log(response)
		}
	});

	return
}

function updateCell(data) {

	$.ajax({
		type: 'PUT',
		url: HOST_URL + '/' + CURRENT_CHARACTER,
		data: JSON.stringify(data),
		success: function(response) {
			console.log('Successfully updated cell:')
			console.log(response)
		}
	});

	return
}
