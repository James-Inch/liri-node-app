require("dotenv").config();

// var spotifyApi = require("node-spotify-api");

// var spotifyKey = require("./keys.js");

var request = require("request");

if (process.argv[2] === "movieThis"){
  movieThis();
}

// var spotify = new Spotify(keys.spotify);
function movieThis() {
  var nodeArgs = process.argv;

  var movieName = "";


  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  };

  var url = ("http://www.omdbapi.com/?t=" + movieName + "&apikey=4c9d8e40");

  request(url, function (error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
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