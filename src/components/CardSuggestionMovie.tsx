import { motion, AnimatePresence } from "motion/react";

interface CardSuggestiontType {
  imageMovie: string | undefined;
  title: string | undefined;
  description: string | undefined;
  cast: string | undefined;
  genre: string | undefined;
  isShowModalSuggestion: boolean;
  addToList: () => void;
}

export function CardSuggestionMovie({
  imageMovie,
  title,
  description,
  cast,
  genre,
  addToList,
  isShowModalSuggestion,
}: CardSuggestiontType) {
  return (
    <AnimatePresence initial={false}>
      {isShowModalSuggestion ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          exit={{ opacity: 0 }}
          className="bg-amber-100 w-[45%] h-[80%] rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4"
        >
          <div className="grid grid-cols-[1fr_1fr] grid-rows-[50px_1fr_1fr] h-full">
            <h1 className="col-start-1 col-end-3 row-start-1 row-end-2 text-2xl">
              {title}
            </h1>

            <img
              src={imageMovie}
              alt={`Poster do ${title}`}
              className="col-start-1 col-end-2 row-start-2 row-end-3 rounded-lg"
            />

            <div className="flex flex-col justify-around col-start-2 col-end-3 row-start-2 row-end-3">
              <p>{description}</p>
              <p>
                <span className="font-extrabold">Elenco</span>: {cast}
              </p>
              <p>
                <span className="font-extrabold">Gênero</span>: {genre}
              </p>
            </div>

            <div className="col-start-1 col-end-3 row-start-3 row-end-4 flex flex-row justify-center items-center mt-2">
              <button
                className=" border border-black w-[90%] rounded-md cursor-pointer hover:bg-green-950 hover:text-white"
                onClick={addToList}
              >
                Add to List
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
