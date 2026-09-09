import { RiDeleteBin2Line } from "react-icons/ri";

interface CardMovieType {
  Poster: string | undefined;
  Id: number;
  deleteMovie: (id: number) => void;
}

export function CardMovie({ Poster, deleteMovie, Id }: CardMovieType) {
  return (
    <div className="flex flex-col w-62.5 justify-center">
      <img src={Poster} alt="Poster do Filme" className="rounded-lg" />
      <button
        className="flex flex-row justify-center items-center gap-2 border-amber-400 border-2 bg-amber-100 mt-1 rounded-lg text-amber-600 font-extrabold cursor-pointer hover:bg-amber-200"
        onClick={() => deleteMovie(Id)}
      >
        Remover
        <RiDeleteBin2Line />
      </button>
    </div>
  );
}
