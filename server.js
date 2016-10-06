const express = require('express'),
      app = express(),
      nano = require('nano')('http://localhost:5984');

var MarvelAPI = require('./marvelAPI.jsx');
MarvelAPI = new MarvelAPI();

var API_PORT = 3001;


app.set('port', (API_PORT || 3001));

var lastTimeRequestWasMade;
var savedData;

app.get('/api/uuid', (req,res) => {
    nano.request({db: "_uuids"}, function(_,uuids){ 
      console.log(uuids);
      res.send(uuids); 
    });
})

app.get('/api/comics', (req, res) => {
  var rightNowDate = getCurrentDateFormatted();
  
  if( lastTimeRequestWasMade === null || rightNowDate !== lastTimeRequestWasMade) {
    lastTimeRequestWasMade = rightNowDate;

    MarvelAPI.getComics(rightNowDate, (data) => {
      res.json(data);
    });

  }
});

/***
 * App startup validates the connection to the server,
 * and if the date that the server was last updated is not the same
 * calendar day updates the comics as needed.
 */
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

function getCurrentDateFormatted() {
  var date = new Date();
  var year = date.getFullYear();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  return `${month}/${day}/${year}`;
}