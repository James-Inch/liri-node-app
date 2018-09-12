var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "1ce105fc8573425cbf8036c7d5137ad9",
  secret: "86d2e3b1dcbe4d5b9eca49c6bf713637"
});
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {

    var songData = (response.tracks.items[0].artists[0]);

    console.log(songData);
    // var data = (response.tracks.items[0]);
    // console.log(data.artists.name);
  })
  .catch(function(err) {
    console.log(err);
  });