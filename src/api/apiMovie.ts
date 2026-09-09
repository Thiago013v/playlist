import axios from "axios";
import type { playlistDataType } from "../hooks/usePlaylist";
import type { MovieType } from "../types/apiType";

export async function apiMovie(data: playlistDataType) {
  const axiosResponse = !data.year
    ? await axios.get(`https://www.omdbapi.com/?t=${data.name}&apikey=efd76c49`)
    : await axios.get(
        `https://www.omdbapi.com/?t=${data.name}&y=${data.year}&apikey=efd76c49`,
      );

  const dataMovieData: MovieType = axiosResponse.data;

  if (dataMovieData.Response === "True") {
    const { Actors, Plot, Title, Genre, Poster } = dataMovieData;

    const Id: number = Math.random();

    return { Actors, Plot, Title, Genre, Poster, Id };
  } else {
    return null;
  }
}
