import { motion, AnimatePresence } from "motion/react";

interface ModalErrorType {
  isShowModalError: boolean;
  typeError: "notFound" | "added" | undefined;
}

export function ModalError({ isShowModalError, typeError }: ModalErrorType) {
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
            {typeError === "notFound"
              ? "Filme não encontrado"
              : "Filme já adicionado"}
          </h2>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
