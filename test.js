const auth = 'Bearer AIzaSyCPEg0TjHYWFV-Lia7NKLSV-zJD2A8sLA4' // Please set your access token.
const spreadsheetId = '13cAT4h0YwbZ4s6nQBrU9FUUt-nQjaU9iEAln7GVb5zM' // Please set your spreadsheet ID.
$.ajax({
  type: 'POST',
  headers: { Authorization: auth, 'content-type': 'application/json' },
  data: JSON.stringify({
    "data": [
      {
        "range": "Characters!A5",
        "values": [["abc"]]
      },
    ],
    "valueInputOption": "RAW"
  }),
  url: 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values:batchUpdate',
  success: function (r) {
    console.log(r)
  }, error: function (r) {
    console.log(r)
  }
})