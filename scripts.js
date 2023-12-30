console.log('ready1')

/**
* Sample JavaScript code for sheets.spreadsheets.values.get
* See instructions for running APIs Explorer code samples locally:
* https://developers.google.com/explorer-help/code-samples#javascript
*/

const SHEET_ID = '13cAT4h0YwbZ4s6nQBrU9FUUt-nQjaU9iEAln7GVb5zM';
const API_KEY = 'AIzaSyB6A4LdYKP_r0Y7xMnhpAJ1H4aouVb5g5U';
const CLIENT_ID = '926782039243-1c74ts1tg8boub4i4k2ql0a35ueste4l.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
// const SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly';

var RANGE = "Characters!A:BA"

function authenticate() {
	return gapi.auth2.getAuthInstance()
	.signIn({scope: SCOPE})
	.then(function() { console.log("Sign-in successful"); },
		function(err) { console.error("Error signing in", err); });
}

function loadClient() {
	gapi.client.setApiKey(API_KEY);
	return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
	.then(function() { 
		console.log("GAPI client loaded for API"); 
		$('#auth').hide()
		$('#execute').show()
	},
	function(err) { console.error("Error loading GAPI client for API", err); });
}

 // Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
	return gapi.client.sheets.spreadsheets.values.get({
		"spreadsheetId": SHEET_ID,
		"range": RANGE
	})
	.then(function(response) {
        // Handle the results here (response.result has the parsed body).
		console.log("Response", response);
	},
	function(err) { console.error("Execute error", err); });
}

gapi.load("client:auth2", function() {
	gapi.auth2.init({client_id: CLIENT_ID});
});

$(function() {	
	$('#auth').on('click', function() {
		authenticate().then(loadClient);
		return
	});
	$('#execute').on('click', execute);
})