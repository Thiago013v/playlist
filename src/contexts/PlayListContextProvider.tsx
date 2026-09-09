import { PlaylistContext } from "./PlaylistContext";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { apiMovie } from "../api/apiMovie";

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
    "notFound" | "added" | undefined
  >();
  const [dataMovie, setDataMovie] = useState<DataMovieType | undefined>();
  const [movieList, setMovieList] = useState<DataMovieType[]>(() => {
    const movieList = localStorage.getItem("movieList");

    if (movieList) {
      return JSON.parse(movieList);
    } else {
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

  const onSubmit = async (data: playlistDataType) => {
    const response = await apiMovie(data);

    let condition: boolean = false;

    movieList.forEach((currentMovie: DataMovieType) => {
      if (currentMovie.Title === response?.Title) {
        console.log("Deu");
        condition = true;
      }
    });

    if (!response) {
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
    } else {
      const dataMovie: DataMovieType = response;
      setDataMovie(dataMovie);
      setIsShowModalSuggestion(!isShowModalSuggestion);
      setIsShowModal(!isShowModal);
    }
  };

  const addMovieToList = () => {
    const movieObject: DataMovieType | undefined = dataMovie;

    if (movieObject) {
      setMovieList((prev) => [...prev, movieObject]);
      setIsShowModalSuggestion(!isShowModalSuggestion);
      setIsShowModal(!isShowModal);
    }
  };

  const handleRemove = (
    remove: boolean,
    id: number,
    handleShowModalConfirmation: (remove: boolean) => void,
  ) => {
    if (remove) {
      setMovieList((prev) => [
        ...prev.filter((currentMovie: DataMovieType) => currentMovie.Id !== id),
      ]);

      handleShowModalConfirmation(false);
    } else {
      handleShowModalConfirmation(false);
      return;
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        addMovieToList,
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
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
