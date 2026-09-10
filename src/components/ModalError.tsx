import { motion, AnimatePresence } from "motion/react";
import { usePlaylistContext } from "../hooks/usePlaylistContext";

export function ModalError() {
  const { isShowModalError, typeMovieError } = usePlaylistContext();

  return (
    <AnimatePresence initial={false}>
      {isShowModalError ? (
        <motion.div
          className={`fixed top-0 left-0 bg-red-400 w-full p-4 z-1000`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl text-white text-center">
            {typeMovieError === "notFound"
              ? "Filme não encontrado"
              : "Filme já adicionado"}
          </h2>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
