import { useContext } from "react";
import { PlaylistContext } from "../contexts/PlaylistContext";

export function usePlaylistContext() {
  const response = useContext(PlaylistContext);

  if (!response) {
    throw new Error(
      "[ERRO] Não se pode utilizar o retorno do Provider fora do Provider",
    );
  }

  const {
    Controller,
    addMovieToList,
    control,
    dataMovie,
    errors,
    handleRemove,
    handleSubmit,
    isShowModal,
    isShowModalConfirmation,
    isShowModalError,
    isShowModalSuggestion,
    movieList,
    onSubmit,
    setIsShowModalConfirmation,
    typeMovieError,
  } = response;

  return {
    control,
    Controller,
    addMovieToList,
    dataMovie,
    errors,
    handleRemove,
    handleSubmit,
    isShowModal,
    isShowModalConfirmation,
    isShowModalError,
    isShowModalSuggestion,
    movieList,
    onSubmit,
    setIsShowModalConfirmation,
    typeMovieError,
  };
}
