const express = require('express'),
  dbAddress = 'http://localhost:5984',
  app = express(),
  nano = require('nano')(dbAddress),
  API_PORT = 3001;



//Nano setup.
var MarvelAPI = require('./marvelAPI.jsx');
MarvelAPI = new MarvelAPI();
var comics = nano.use('comics');
var lastTimeRequestWasMade;
var savedData;

app.set('port', (API_PORT || 3001));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**
 * UUID generator.
 */
var uuidGenerator = (function () {
  var couch = require('nano')(dbAddress);
  return function (next) {
    couch.request({ db: '_uuids' }, function (err, body) {
      if (err) {
        next(err);
      }
      else {
        next(null, body.uuids[0]);
      }
    });
  };
})();


/**
 * Delete a comic based on an ID.
 */
app.delete('/api/comics/:id', (req, res) => {

  var id = req.params.id;
  console.log(`Deleting a comic: ${id}`);

  comics.get(id, (error, data) => {
    if (error != null) { res.send(error); }

    comics.destroy(id, data._rev, (err, body) => {
      if (err != null) { res.send(error); }
      console.log(err);
      console.log(body);
      res.json(body);
    });
  });
});

/**
 * Create a comic with the passed name. 
 * Not a safe operation, it does not check if the name already exists. 
 */
app.put('/api/comics/:name', (req, res) => {
  console.log(`Trying to create a database entry with the series name of: ${req.params.name}`);

  uuidGenerator(function (err, uuid) {
    if (err)
      console.log('Error: ', err);
    else {
      comics.insert(
        {
          title: req.params.name
        },
        req.params.name,
        function (err, body, header) {
          console.log(body);
          res.json(body);
        }
      );
    }
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
  console.log("Fetching all comics from the database.");

  comics.view("view", "current", (err, body) => {
    res.json(body.rows);
  });
});

/**
 * Super bad example to load data into couchdb.
 */
app.get('/api/comics2', (req, res) => {
  var rightNowDate = getCurrentDateFormatted();

  if (lastTimeRequestWasMade === null || rightNowDate !== lastTimeRequestWasMade) {
    lastTimeRequestWasMade = rightNowDate;

    MarvelAPI.getComics(rightNowDate, (data) => {
      //For each element in the array check if it exists in the database, 
      //if it doesn't, create it, if it does, update it with the revision id.
      var uploadData = {
        "docs": data
      };
      //http://127.0.0.1:5984/comics/_design/current/_view/titleId?limit=100&reduce=false
      comics.bulk(uploadData, (dbResponse) => {
        console.log(dbResponse);
        console.log("Finished bulk uploading.");
        res.json(uploadData);
      });
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