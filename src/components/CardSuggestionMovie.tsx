import { motion, AnimatePresence } from "motion/react";
import { usePlaylistContext } from "../hooks/usePlaylistContext";

export function CardSuggestionMovie() {
  const { dataMovie, isShowModalSuggestion, addMovieToList } =
    usePlaylistContext();

  return (
    <AnimatePresence initial={false}>
      {isShowModalSuggestion ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          exit={{ opacity: 0 }}
          className="bg-amber-100 w-[80%] inline-block sm:w-[50%] lg:w-[45%] lg:h-[90%] max-h-162.5 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4"
        >
          <div className="flex flex-col justify-center items-center h-full lg:grid lg:grid-cols-[1fr_1fr] lg:grid-rows-[50px_1fr_1fr] lg:h-full">
            <h1 className="text-2xl mb-2 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2">
              {dataMovie?.Title}
            </h1>

            <img
              src={dataMovie?.Poster}
              alt={`Poster do ${dataMovie?.Title}`}
              className="w-[80%] h-[60%] md:w-[70%] md:h-[70%] max-w-62.5 rounded-lg mb-2 md:mb-4 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 lg:w-full lg:h-full lg:max-w-none"
            />

            <div className="flex flex-col gap-2 lg:justify-around lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:w-full lg:h-full lg:ml-2">
              <p className="text-[0.8rem] lg:text-[1.1rem]">
                {dataMovie?.Plot}
              </p>
              <p className="text-[0.8rem] lg:text-[1.1rem]">
                <span className="font-extrabold">Elenco</span>:{" "}
                {dataMovie?.Actors}
              </p>
              <p className="text-[0.8rem] lg:text-[1.1rem]">
                <span className="font-extrabold">Gênero</span>:{" "}
                {dataMovie?.Genre}
              </p>
            </div>

            <button
              className="border border-black w-full rounded-md cursor-pointer hover:bg-green-950 hover:text-white mt-4 lg:col-start-1 lg:col-end-3 log:row-start-3 lg:row-end-4 "
              onClick={addMovieToList}
            >
              Add to List
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
