const express = require('express');
const app = express();
var fs = require('fs');

var API_PORT = 3001;
var comicJSONLocation = "./data/comic.json";

var COMICS = [
  {"comicName": "Amazing Spider-man 2014", "inPrint": false}
];

app.set('port', (API_PORT || 3001));

app.get('/api/comics', (req, res) => {
    fs.readFile(comicJSONLocation, function(err,data) {
        if(err) throw err

        res.json(JSON.parse(data));
    });

    return;
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});