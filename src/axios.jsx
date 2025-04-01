import axios from "axios";

const instance = axios.create({
  // baseURL: "https://api.themoviedb.org/3",
  // baseURL: "https://www.omdbapi.com/",
  baseURL: "https://api.watchmode.com/v1",
});

export default instance;
