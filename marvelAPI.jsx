"use strict";
var crypto = require('crypto');
var request = require('request');

var PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;
var PUBLIC_KEY  = process.env.MARVEL_PUBLIC_KEY;

var limit = 100;
var ts = 1234512;

var hashBuilder = `${ts}${PRIVATE_KEY}${PUBLIC_KEY}`;
var hashValue = crypto.createHash('md5').update(hashBuilder).digest("hex");

var queryString = `http://gateway.marvel.com:80/v1/public/series?contains=comic&seriesType=ongoing&limit=${limit}&apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hashValue}`;

var limit = 100;
var ts = 1234512;

module.exports = class MarvelAPI {
    constructor() {
        console.log("Creating MarvelAPI Object.");
    }

    getComics(date, callback) {
        console.log(`Requesting data from Marvel.com on ${date}`);

        request.get({
            url: queryString,
            json: true
            }, (err, resp, data) => {
                if(err) {console.log(`Error: ${err}`)}
            console.log("Storing data for subsequent retrieval.");

            callback(data.data.results);
        });
    }
}
