import { RiDeleteBin2Line } from "react-icons/ri";

interface CardMovieType {
  Poster: string | undefined;
  Id: number;
  setIsShowModalConfirmation: (isShow: boolean) => void
  children: React.ReactNode
}

export function CardMovie({ Poster, setIsShowModalConfirmation, Id, children }: CardMovieType) {
  console.log("ID do CardMovie", Id)

  return (
    <>
    {children}

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
