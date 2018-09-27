var movies = [
  {
    title: "Mulan",
    hasWatched: true,
    rating: 5
  },
  {
    title: "The professional",
    hasWatched: true,
    rating: 5
  },
  {
    title: "Frozen",
    hasWatched: false,
    rating: 4.5
  }
];

movies.forEach(function(movie){
  console.log(buildString(movie));
});

function buildString(movie) {
  var result = "You have ";
  if (movie.hasWatched) {
    result += "watched ";
  } else {
    result += "not seen ";
  }
  result += "\"" + movie.title + "\" - ";
  result += movie.rating + " stars.";
  return result;
}
