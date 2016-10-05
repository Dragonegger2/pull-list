const express = require('express');
const app = express();
var crypto = require('crypto');
var request = require('request');

var API_PORT = 3001;

var PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;
var PUBLIC_KEY  = process.env.MARVEL_PUBLIC_KEY;

var limit = 100;
var ts = 1234512;

var hashBuilder = `${ts}${PRIVATE_KEY}${PUBLIC_KEY}`;
var hashValue = crypto.createHash('md5').update(hashBuilder).digest("hex");

var queryString = `http://gateway.marvel.com:80/v1/public/series?contains=comic&seriesType=ongoing&limit=${limit}&apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hashValue}`;
//https://imagecomics.com/comics/series/P675
app.set('port', (API_PORT || 3001));

var lastTimeRequestWasMade;
var savedData;

app.get('/api/comics', (req, res) => {
  var rightNowDate = getCurrentDateFormatted();
  
  if( lastTimeRequestWasMade === null || rightNowDate !== lastTimeRequestWasMade) {
    lastTimeRequestWasMade = rightNowDate
    
    console.log(`Requesting data from Marvel.com on ${rightNowDate}`);
    //TODO: Loop the request until we get all the results, adding all of them into the JSON array.
    request.get({
      url: queryString,
      json: true
    }, (err, resp, data) => {
      console.log("Storing data for subsequent retrieval.");

      savedData = data;
      res.send(savedData);
      return;
    });
  } 
  else {
    res.send(savedData);
    return;
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  console.log(`Private key: ${PRIVATE_KEY}`);
  console.log(`Public key: ${PUBLIC_KEY}`);
  
});

function getCurrentDateFormatted() {
  var date = new Date();
  var year = date.getFullYear();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  return `${month}/${day}/${year}`;
}