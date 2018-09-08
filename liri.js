require("dotenv").config();

// var spotifyApi = require("node-spotify-api");

// var spotifyKey = require("./keys.js");

var request = require("request");

switch (process.argv[2]) {
  case "movie-this":
    movieThis();
    break;
  case "concert-this":
    concertThis();
    break;
}

// var spotify = new Spotify(keys.spotify);
function movieThis() {
  var nodeArgs = process.argv;

  var movieName = "";

  for (i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  };

  var url = ("http://www.omdbapi.com/?t=" + movieName + "&apikey=4c9d8e40");

  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var title = (JSON.parse(body).Title);
      var year = (JSON.parse(body).Year);
      var imdbRating = (JSON.parse(body).Ratings[0]["Value"]);
      var rtRating = (JSON.parse(body).Ratings[1]["Value"]);
      var country = (JSON.parse(body).Country);
      var language = (JSON.parse(body).Language);
      var actors = (JSON.parse(body).Actors);
      var plot = (JSON.parse(body).Plot);

      console.log(
        `
      Title: ${title}
      Year: ${year}  
      IMDB Rating: ${imdbRating}
      Rotten Tomatoes Rating: ${rtRating}
      Produced in: ${country}
      You can watch it in: ${language}
      Actors: ${actors}
      \n
      Plot: ${plot}
      `
      );
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

    if (!error && response.statusCode === 200){
      var response = (response);
      console.log(JSON.parse(body).venue[0]);
    };
  });
};