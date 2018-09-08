require("dotenv").config();

// var spotifyApi = require("node-spotify-api");

// var spotifyKey = require("./keys.js");

var request = require("request");

var fs = require("fs");

var inportantStuff = process.argv.slice(2)

start(inportantStuff);

function start(cmdArr) {
  switch (cmdArr[0]) {
    case "movie-this":
      movieThis(cmdArr.slice(1).join(" "));
      break;
    case "concert-this":
      concertThis();
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

function concertThis() {
  var nodeArgs = process.argv;

  var artist = "";

  for (i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      artist = artist + "+" + nodeArgs[i];
    } else {
      artist += nodeArgs[i];
    }
  };

  var url = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");

  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var response = (response);
    var data = JSON.parse(body)[0].venue;
    console.log(data);
    };
  });
};

function doWhatItSays() {

}