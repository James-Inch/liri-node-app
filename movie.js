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