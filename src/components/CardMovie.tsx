import { RiDeleteBin2Line } from "react-icons/ri";
import { ModalConfirmation } from "./ModalConfirmation";
import { usePlaylist } from "../hooks/usePlaylist";

interface CardMovieType {
  Poster: string | undefined;
  Id: number;
  handleRemove: (
    remove: boolean,
    id: number,
    handleShowModalConfirmation: (remove: boolean) => void,
  ) => void;
  title: string;
}

export function CardMovie({ Poster, Id, handleRemove, title }: CardMovieType) {
  const { isShowModalConfirmation, setIsShowModalConfirmation } = usePlaylist();

  return (
    <>
      <ModalConfirmation
        id={Id}
        isShowModalConfirmation={isShowModalConfirmation}
        handleRemove={handleRemove}
        title={title}
        setIsShowModalConfirmation={setIsShowModalConfirmation}
      ></ModalConfirmation>

      <div className="flex flex-col w-62.5 justify-center">
        <img src={Poster} alt="Poster do Filme" className="rounded-lg" />
        <button
          className="flex flex-row justify-center items-center gap-2 border-amber-400 border-2 bg-amber-100 mt-1 rounded-lg text-amber-600 font-extrabold cursor-pointer hover:bg-amber-200"
          onClick={() => setIsShowModalConfirmation(true)}
        >
          Remover
          <RiDeleteBin2Line />
        </button>
      </div>
    </>
  );
}
