// const apiKey = "9c9814b893fb85f586624e434c9d0c44";
// const apiKey = "qE3JGAUE5eeyA21GGhogy8IqRY1iFQ2fJAlKnj06";
const apiKey = "dVLELXoePHbhBoFLcri4GksBvAX9J7yQHGgYgVOe";

// const requests = {
//   fetchTrending: `/trending/all/week?api_key=${apiKey}&language=en-US`,
//   fetchNetflixOriginals: `/discover/tv?api_key=${apiKey}&witg_network=213`,
//   fetchTopRated: `/movie/top_rated?api_key=${apiKey}&language=en-US`,
//   fetchActionMovies: `/discover/movie?api_key=${apiKey}&with_genres=28`,
//   fetchComedyMovies: `/discover/movie?api_key=${apiKey}&with_genres=35`,
//   fetchHorrorMovies: `/discover/movie?api_key=${apiKey}&with_genres=27`,
//   fetchRomanceMovies: `/discover/movie?api_key=${apiKey}&with_genres=10749`,
//   fetchDocumentaries: `/discover/movie?api_key=${apiKey}&with_genres=99`,
// };

// export default requests;
// const baseURL = "https://www.omdbapi.com/";
import instance from "./axios";
// const baseURL = "https://api.themoviedb.org/3";
const baseURL = "https://api.watchmode.com/v1/";
const requests = {
  fetchTrending: `${baseURL}list-titles/?apiKey=${apiKey}&source_ids=203&sort_by=popularity_desc`,
  fetchNetflixOriginals: `${baseURL}list-titles/?apiKey=${apiKey}&source_ids=203&types=tv_series`,
  fetchTopRated: `${baseURL}list-titles/?apiKey=${apiKey}&source_ids=203&sort_by=user_rating_desc`,
  fetchActionMovies: `${baseURL}list-titles/?apiKey=${apiKey}&genres=7`,
  fetchComedyMovies: `${baseURL}list-titles/?apiKey=${apiKey}&genres=9`,
  fetchHorrorMovies: `${baseURL}list-titles/?apiKey=${apiKey}&genres=4`,
  fetchRomanceMovies: `${baseURL}list-titles/?apiKey=${apiKey}&genres=2`,
  fetchDocumentaries: `${baseURL}list-titles/?apiKey=${apiKey}&genres=5`,
};

export default requests;
