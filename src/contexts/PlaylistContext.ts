import { createContext } from "react";
import type {
  DataMovieType,
  playlistDataType,
} from "../contexts/PlayListContextProvider";
import type {
  Control,
  FieldValues,
  FieldPath,
  ControllerProps,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";

interface PlaylistContextType {
  control: Control<
    {
      year?: string | undefined;
      name: string;
    },
    unknown,
    {
      year?: string | undefined;
      name: string;
    }
  >;
  Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues,
  >(
    props: ControllerProps<TFieldValues, TName, TTransformedValues>,
  ) => import("react").ReactElement<
    unknown,
    string | import("react").JSXElementConstructor<any>
  >;
  handleSubmit: UseFormHandleSubmit<
    {
      year?: string | undefined;
      name: string;
    },
    {
      year?: string | undefined;
      name: string;
    }
  >;
  errors: FieldErrors<{
    year?: string | undefined;
    name: string;
  }>;
  isShowModalSuggestion: boolean;
  isShowModalError: boolean;
  isShowModalConfirmation: boolean;
  isShowModal: boolean;
  setIsShowModalConfirmation: (boolean: boolean) => void;
  typeMovieError: "notFound" | "added" | undefined;
  dataMovie: DataMovieType | undefined;
  movieList: DataMovieType[];
  onSubmit: (data: playlistDataType) => void;
  addMovieToList: () => void;
  handleRemove: (
    remove: boolean,
    id: number,
    handleShowModalConfirmation: (remove: boolean) => void,
  ) => void;
}

export const PlaylistContext = createContext<PlaylistContextType | null>(null);
