const express = require('express'),
      app = express(),
      nano = require('nano')('http://localhost:5984'),
      API_PORT = 3001;

//Nano setup.
var MarvelAPI = require('./marvelAPI.jsx');
MarvelAPI = new MarvelAPI();
var comics = nano.use('comics');
var lastTimeRequestWasMade;
var savedData;

app.set('port', (API_PORT || 3001));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**
 * Delete a comic based on an ID.
 */
app.delete('/api/comics/:id', (req, res) => {
  
  var id = req.params.id;
  console.log(`Deleting a comic: ${id}`);

  comics.get(id, (error, data) => {
    if(error != null) { res.send(error); }    

    comics.destroy(id, data._rev, (err, body) => {
      if(err != null) { res.send(error); }

      res.json(body);
    });
  });
});

/**
 * Fetch the full data from the database on a specific comic.
 */
app.get('/api/comics/:id', (request, response) => {
  var id = request.params.id;
  console.log(`Fetching a comic's information by id: ${id}`);

  comics.get(id, (error, data) => {
    response.json(data);
  });
});

app.get('/api/comics', (req, res) => {
  // var rightNowDate = getCurrentDateFormatted();
  
  // if( lastTimeRequestWasMade === null || rightNowDate !== lastTimeRequestWasMade) {
  //   lastTimeRequestWasMade = rightNowDate;

  //   MarvelAPI.getComics(rightNowDate, (data) => {
  //     //For each element in the array check if it exists in the database, 
  //     //if it doesn't, create it, if it does, update it with the revision id.
  //     var uploadData = { 
  //       "docs" : data 
  //     };

  //     comics.bulk(uploadData, (dbResponse) =>{
  //       console.log(dbResponse);
  //       console.log("Finished bulk uploading.");
  //       res.json(uploadData);        
  //     });
  //     });
  //   }
  console.log("Fetching all comics from the database.");

  comics.view("current", "current", (err, body) => {
    res.json(body.rows);
  });
});

/***
 * App startup validates the connection to the server,
 * and if the date that the server was last updated is not the same
 * calendar day updates the comics as needed.
 */
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console

  // function loadMarvelDatabase(() => {
  //   console.log("Finished loading/updating Marvel Comic Database...");
  // });
});

function getCurrentDateFormatted() {
  var date = new Date();
  var year = date.getFullYear();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  return `${month}/${day}/${year}`;
}