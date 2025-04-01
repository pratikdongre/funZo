import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original";
const apiKey = "dVLELXoePHbhBoFLcri4GksBvAX9J7yQHGgYgVOe"; // Your WatchMode API key

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [toShow, setToShow] = useState([]); // Store movie details including images
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        console.log("Fetching from URL:", fetchUrl);

        const request = await axios.get(fetchUrl, {
          signal: controller.signal,
        });
        console.log("API Response:", request.data);

        if (!request.data.titles || request.data.titles.length === 0) {
          console.warn("No movies found!");
          return;
        }

        // Limit to first 10 movies to avoid rate limit
        const limitedMovies = request.data.titles.slice(0, 10);
        setMovies(limitedMovies);

        const movieDetails = await Promise.all(
          limitedMovies.map(async (movie) => {
            console.log("Fetching details for movie:", movie);
            if (!movie.id) {
              console.warn("Movie has no ID, skipping:", movie);
              return null;
            }

            try {
              const details = await axios.get(
                `https://api.watchmode.com/v1/title/${movie.id}/details/?apiKey=${apiKey}`
              );
              return details.data;
            } catch (err) {
              console.error(`Error fetching details for ${movie.id}`, err);
              return null;
            }
          })
        );

        setToShow(movieDetails.filter((movie) => movie !== null));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cleanup: cancel the request on unmount
    };
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close the trailer if it's already playing
    } else {
      // Check if trailer exists in the movie data
      if (movie.trailer) {
        // Extract the YouTube video ID from the trailer URL
        const urlParams = new URLSearchParams(new URL(movie.trailer).search);
        setTrailerUrl(urlParams.get("v")); // Extract the video ID and set it
      } else {
        alert("Trailer not available for this movie.");
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {toShow.map((movie) => (
          <div key={movie.id} className="row_movie">
            <img
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
              src={movie.posterLarge || movie.poster} // Use large image if available
              alt={movie?.title || movie?.name || movie?.original_name}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
