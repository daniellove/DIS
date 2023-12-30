
const SHEET_ID = '13cAT4h0YwbZ4s6nQBrU9FUUt-nQjaU9iEAln7GVb5zM';
// const CLIENT_ID = '926782039243-1c74ts1tg8boub4i4k2ql0a35ueste4l.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB6A4LdYKP_r0Y7xMnhpAJ1H4aouVb5g5U';
// const SCOPE = 'https://www.googleapis.com/auth/streadsheets';

// var params = {
// 	spreadsheetId: SHEET_ID,
// 	range: 'Characters',
// 	valueInputOption: 'RAW',
// 	// insertDataOption: 'OVERWRITE',
// 	insertDataOption: 'INSERT_ROWS',
// }

var data = {
	"dataFilters": [{
		"a1Range": "Characters!A:A"
	}]
}

var method = 'POST'

var url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/developerMetadata:search`

function runTest() {
	$.ajax({
		type: method,
		url: url,
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'content-type': 'application/json'
		},
		data: data,
		success: function(response) {
			console.log(response)
			return
		},
		error: function(xhr, options, err) {
			console.log(err)
			return
		},

	});

	return
}







// https://developers.google.com/sheets/api/reference/rest/#rest-resource:-v4.spreadsheets.values

// $.ajax({
// 	type: 'GET',
// 	url: 'https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}',
// 	success: function(data) {
		
// 	}
// });