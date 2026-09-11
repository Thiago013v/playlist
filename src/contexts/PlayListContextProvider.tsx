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
  const [dataMovieModalConfirm, setDataMoveiModalConfirm] = useState<
    DataMovieType | undefined
  >();
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

  useEffect(() => {
    setInterval(() => {
      const movieObject: DataMovieType | undefined = dataMovie;

      const movieObjectList: DataMovieType[] = movieList.filter(
        (currentMovie: DataMovieType) => currentMovie.Id === movieObject?.Id,
      );

      if (movieObjectList.length > 1 && movieObject) {
        setMovieList((prev) => [
          ...prev.filter(
            (currentMovie: DataMovieType) =>
              currentMovie.Id !== movieObject?.Id,
          ),
        ]);

        setMovieList((prev) => [...prev, movieObject]);
      }
    }, 1000);
  }, [dataMovie, movieList]);

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
