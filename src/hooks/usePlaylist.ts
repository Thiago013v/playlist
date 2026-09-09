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

export function usePlaylist() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowModalError, setIsShowModalError] = useState<boolean>(false);
  const [typeMovieError, setTypeMovieError] = useState<
    "notFound" | "added" | undefined
  >();
  const [dataMovie, setDataMovie] = useState<DataMovieType>();
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

  const handleModal = () => {
    setIsShow(!isShow);
  };

  const onSubmit = async (data: playlistDataType) => {
    const response = await apiMovie(data);

    let condition: boolean = false;

    movieList.forEach((currentMovie: DataMovieType) => {
      if (currentMovie.Title === response?.Title) {
        console.log("Deu");
        condition = false;
      }
    });

    /* O que falta? Eu preciso adicionar uma mensagem de ERRO avisando que o filme já foi adicionado à playlist. Falta apenas corrigir a ordem da estrutura de decisão. Colocando primeiramente os erros e somente no final, caso dê certo, a continuação do funcionamento do código. */

    if (response) {
      const dataMovie: DataMovieType = response;
      setDataMovie(dataMovie);
      handleModal();
    } else if (!response) {
      setTypeMovieError("notFound");
      setIsShowModalError(!isShowModalError);
      setTimeout(() => {
        setIsShowModalError(false);
      }, 2000);
    } else {
      setTypeMovieError("added");
      setIsShowModalError(!isShowModalError);
      setTimeout(() => {
        setIsShowModalError(false);
      }, 2000);
    }
  };

  const addMovieToList = () => {
    const movieObject: DataMovieType | undefined = dataMovie;

    if (movieObject) {
      setMovieList((prev) => [...prev, movieObject]);
      handleModal();
    }
  };

  const removeMovieList = (id: number) => {
    setMovieList(
      movieList.filter((currentMovie: DataMovieType) => currentMovie.Id !== id),
    );
  };

  return {
    Controller,
    control,
    handleSubmit,
    onSubmit,
    errors,
    isShow,
    addMovieToList,
    removeMovieList,
    isShowModalError,
    movieList,
    dataMovie,
    typeMovieError,
  };
}
