import { PlaylistContext } from "./PlaylistContext";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import axios from "axios";
import type { MovieType } from "../types/apiType";

const playlistSchema = yup.object({
  name: yup.string().required("*Este Campo é obrigatório"),
  year: yup.string().optional(),
});

export type playlistDataType = yup.InferType<typeof playlistSchema>;

export interface DataMovieType {
  Id: number;
  Title: string;
  Plot: string;
  Genre: string;
  Actors: string;
  Poster: string;
}

interface PlaylistContextProviderType {
  children: React.ReactNode;
}

export function PlaylistContextProvider({
  children,
}: PlaylistContextProviderType) {
  const [isShowModalSuggestion, setIsShowModalSuggestion] =
    useState<boolean>(false);
  const [isShowModalError, setIsShowModalError] = useState<boolean>(false);
  const [isShowModalConfirmation, setIsShowModalConfirmation] =
    useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [typeMovieError, setTypeMovieError] = useState<
    "notFound" | "added" | "offline" | undefined
  >();
  const [dataMovie, setDataMovie] = useState<DataMovieType | undefined>();
  const [dataMovieModalConfirm, setDataMoveiModalConfirm] = useState<
    DataMovieType | undefined
  >();
  const [movieList, setMovieList] = useState<DataMovieType[]>(() => {
    try {
      const movieList = localStorage.getItem("movieList");

      if (movieList) {
        return JSON.parse(movieList);
      } else {
        return [];
      }
    } catch {
      return [];
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", year: "" },
    resolver: yupResolver(playlistSchema),
  });

  useEffect(() => {
    localStorage.setItem("movieList", JSON.stringify(movieList));
  }, [movieList]);

  const apiMovie = async (data: playlistDataType) => {
    try {
      const axiosResponse = !data.year
        ? await axios.get(
            `https://www.omdbapi.com/?t=${data.name}&apikey=efd76c49`,
          )
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
    } catch {
      setTypeMovieError("offline");
      setIsShowModalError(!isShowModal);
      setIsShowModal(!isShowModal);
    }
  };

  const onSubmit = async (data: playlistDataType) => {
    const response = await apiMovie(data);

    let condition: boolean = false;

    movieList.forEach((currentMovie: DataMovieType) => {
      if (currentMovie.Title === response?.Title) {
        console.log("Deu");
        condition = true;
      }
    });

    if (response === null) {
      setTypeMovieError("notFound");
      setIsShowModalError(!isShowModalError);
      setTimeout(() => {
        setIsShowModalError(false);
      }, 2000);
    } else if (response && condition) {
      setTypeMovieError("added");
      setIsShowModalError(!isShowModalError);
      setTimeout(() => {
        setIsShowModalError(false);
      }, 2000);
    } else if (response && !condition) {
      const dataMovie: DataMovieType = response;
      setDataMovie(dataMovie);
      setIsShowModalSuggestion(!isShowModalSuggestion);
      setIsShowModal(!isShowModal);
    }
  };

  const addMovieToList = () => {
    const movieObject: DataMovieType | undefined = dataMovie;

    if (movieObject) {
      const newMovieList: DataMovieType[] = movieList.filter(
        (currentMovie: DataMovieType) => currentMovie.Id !== movieObject.Id,
      );

      newMovieList.push(movieObject);

      setMovieList(newMovieList);
      setIsShowModalSuggestion(!isShowModalSuggestion);
      setIsShowModal(!isShowModal);
    }
  };

  const activeRemove = (id: number) => {
    setIsShowModalConfirmation(!isShowModalConfirmation);

    setDataMoveiModalConfirm(
      movieList.find((currentMovie: DataMovieType) => currentMovie.Id === id),
    );
  };

  const handleRemove = (remove: boolean, id: number | undefined) => {
    if (remove) {
      setMovieList((prev) => [
        ...prev.filter((currentMovie: DataMovieType) => currentMovie.Id !== id),
      ]);

      setIsShowModalConfirmation(!isShowModalConfirmation);
      setIsShowModal(!isShowModal);
    } else {
      setIsShowModalConfirmation(!isShowModalConfirmation);
      setIsShowModal(!isShowModal);
      return;
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        addMovieToList,
        setTypeMovieError,
        dataMovie,
        handleRemove,
        isShowModal,
        isShowModalConfirmation,
        isShowModalError,
        isShowModalSuggestion,
        movieList,
        onSubmit,
        typeMovieError,
        control,
        Controller,
        errors,
        handleSubmit,
        setIsShowModalConfirmation,
        setIsShowModal,
        activeRemove,
        dataMovieModalConfirm,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
