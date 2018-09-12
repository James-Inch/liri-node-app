require("dotenv").config();

var Spotify = require('node-spotify-api');

var spotifyKey = require("./keys.js");

// var geocoder = require("geocoder"); 

// Try to make it so the location can give the full address of the venue

var request = require("request");

var moment = require("moment");

var fs = require("fs");

var inportantStuff = process.argv.slice(2)

start(inportantStuff);

function start(cmdArr) {
  switch (cmdArr[0]) {
    case "movie-this":
      movieThis(cmdArr.slice(1).join(" "));
      break;
    case "concert-this":
      concertThis(cmdArr.slice(1).join(" "));
      break;
    case "spotify-this-song":
      spotifyThis(cmdArr.slice(1).join(" "));
    break;
  }
}
// var spotify = new Spotify(keys.spotify);
function movieThis(movieName) {

  var url = ("http://www.omdbapi.com/?t=" + movieName + "&apikey=4c9d8e40");

  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {

      var data = JSON.parse(body);

      var imdbRating = (data.Ratings[0]["Value"]);

      var rtRating = (data.Ratings[1]["Value"]);

      var formattedMovieInfo = (`
      Title: ${data.Title}
      Year: ${data.Year}  
      IMDB Rating: ${imdbRating}
      Rotten Tomatoes Rating: ${rtRating}
      Produced in: ${data.Country}
      You can watch it in: ${data.Language}
      Actors: ${data.Actors}

      Plot: ${data.Plot}
      `
      );
      console.log(formattedMovieInfo);
    }

  });
};

function concertThis(artist) {

  var url = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");

  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var response = (response);
      // console.log(JSON.parse(body)[0]);
      var data = JSON.parse(body)[0].venue;
      // console.log(data);
      var formatttedEventData = (`
      ----------------------------------------------
      Venue Name:    ${data.name}
      Location:      ${data.city}, ${data.region}
      Doors open on: ${moment(data.datetime).format("LL")} at ${moment(data.datetime).format("LTS")}
      ----------------------------------------------
      `);
      
      console.log(formatttedEventData);
    };
  });
};

function spotifyThis(song){

  var spotify = new Spotify(
    spotifyKey.spotify
  );
  
  spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data);

    console.log(data.artists[0].name);

    var formattedSongData = (`
    
    `)
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
};

function doWhatItSays() {

}