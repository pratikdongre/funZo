import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../request";
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requests.fetchActionMovies);
        const results = response.data.results;
        if (results.length > 0) {
          setMovie(results[Math.floor(Math.random() * results.length)]);
        }
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    };

    fetchData();
  }, []);

  const truncate = (str = "", n) =>
    str.length > n ? str.substring(0, n - 1) + "..." : str;

  const handleClick = async (movie) => {
    if (!movie || !movie.id) return;

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        const url = await movieTrailer(null, { tmdbId: movie.id });
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        } else {
          alert("Trailer not available for this movie.");
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
        alert("Trailer not available.");
      }
    }
  };

  const videoOptions = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <>
      {movie && (
        <header
          className="banner"
          style={{
            width: "100%",
            objectFit: "contain",
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: "center top",
            position: "relative",
          }}
        >
          <div className="banner_contents">
            <h1 className="banner__title">
              {movie.title || movie.name || movie.original_name}
            </h1>
            <div className="banner_buttons">
              <button
                className="banner__button"
                onClick={() => handleClick(movie)}
              >
                Play
              </button>
              <button className="banner__button">My List</button>
            </div>
            <h1 className="banner_description">
              {truncate(movie?.overview, 150)}
            </h1>
          </div>
          <div className="banner__fadeBottom"></div>
        </header>
      )}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={videoOptions} />}
    </>
  );
}
