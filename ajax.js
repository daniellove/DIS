const API_KEY = 'YD7XPP6efuRAuajXCZMkk3bBtWyqcHNCvvuAlCGGmWYxQI5gFqw-7FtbdPU';
const SHEET_ID = '13cAT4h0YwbZ4s6nQBrU9FUUt-nQjaU9iEAln7GVb5zM';
const CHAR_URL = 'https://api.sheetson.com/v2/sheets/Characters';
const LEVEL_URL = 'https://api.sheetson.com/v2/sheets/Levels';
const TALENT_URL = 'https://api.sheetson.com/v2/sheets/Talents_0.7';
const HEADERS = {
	'Authorization': `Bearer ${API_KEY}`,
    'X-Spreadsheet-Id': SHEET_ID,
    'Content-Type': 'application/json'
}
const ROW_COUNT = 24;

var CURRENT_CHARACTER = 4;
var CHAR_HEADERS = [];
var CHAR_ROWS = [];
var LEVEL_ROWS = [];
var TALENT_DATA = [];
var ROW_SKIPS = 0 

const TEST_DATA = ["333", "test name", "dwarf", "dwarf", "10", "medium", "medium", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
const TEST_UPDATE = {'character_name': 'New Name'}

$.ajaxSetup({headers: HEADERS});
getData(CHAR_URL, ROW_SKIPS, processCharacters);
getData(LEVEL_URL, ROW_SKIPS, processLevels);
getData(TALENT_URL, ROW_SKIPS, processTalents);


function getData(url, skips, callback) {
	$.ajax({
		type: 'GET',
		url: url,
		data: {
			'apiKey': API_KEY,
			'spreadsheetId': SHEET_ID,
			'limit': ROW_COUNT.toString(),
			'skip': skips.toString(),
			'no-cache': true
		},
		success: (data => callback(url, skips, data))
	});

	return
};

function processCharacters(url, skips, data) {
	console.log(data);

	CHAR_ROWS = CHAR_ROWS.concat(data['results']);
	if (CHAR_HEADERS.length == 0) {
		for (var column in CHAR_ROWS[0]) {
			if (column != 'rowIndex') CHAR_HEADERS.push(column);
		};
	};

	var nextBatch = moreData(data, skips)
	if (nextBatch) getData(url, nextBatch, processCharacters);
	else console.log(CHAR_ROWS);

	return
};

function processLevels(url, skips, data) {
	console.log(data);

	LEVEL_ROWS = LEVEL_ROWS.concat(data['results']);

	var nextBatch = moreData(data, skips)
	if (nextBatch) getData(url, nextBatch, processLevels);
	else console.log(LEVEL_ROWS);
}

function processTalents(url, skips, data) {
	console.log(data);

	TALENT_DATA = TALENT_DATA.concat(data['results']);

	var nextBatch = moreData(data, skips)
	if (nextBatch) getData(url, nextBatch, processTalents);
	else populateTalents();

	return
};

function moreData(data, skips) {
	if (data['hasNextPage']) {
		if (!skips) skips = 1;
		skips = skips + ROW_COUNT;
		return skips
	};
	return false
}


function postCharacter(data) {
	var row = {};
	for (var i in CHAR_HEADERS) {
		var header = CHAR_HEADERS[i];
		var content = data[i];
		row[header] = content;
	};

	$.ajax({
		type: 'POST',
		url: CHAR_URL,
		data: JSON.stringify(row),
		success: function(response) {
			console.log(response)
		}
	});

	return
}

function updateCharacter(data) {

	$.ajax({
		type: 'PUT',
		url: CHAR_URL + '/' + CURRENT_CHARACTER,
		data: JSON.stringify(data),
		success: function(response) {
			console.log('Successfully updated cell:')
			console.log(response)
		}
	});

	return
}
