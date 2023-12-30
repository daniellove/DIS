const auth = "Bearer ###"; // Please set your access token.
const spreadsheetId = "###"; // Please set your spreadsheet ID.
$.ajax({
  type: 'POST',
  headers: { Authorization: auth, 'content-type': 'application/json' },
  data: JSON.stringify({
    "data": [
      {
        "range": "users!A5",
        "values": [["abc"]]
      },
      {
        "range": "users!C5",
        "values": [["abc2"]]
      }, {
        "range": "users!F5",
        "values": [["ab"]]
      }
    ],
    "valueInputOption": "USER_ENTERED"
  }),
  url: 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values:batchUpdate',
  success: function (r) {
    console.log(r)
  }, error: function (r) {
    console.log(r)
  }
})