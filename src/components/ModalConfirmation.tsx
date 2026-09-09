import { motion, AnimatePresence } from "motion/react";

interface ModalConfirmationType {
  isShowModalConfirmation?: boolean;
  id: number | undefined
  handleRemove: (remove: boolean, id: number | undefined) => void;
}

export function ModalConfirmation({ isShowModalConfirmation, id, handleRemove }: ModalConfirmationType) {
    console.log("ID Do Modal", id)

  return (
    <AnimatePresence initial={false}>
        {isShowModalConfirmation ? <motion.div
          className={`fixed top-0 left-0 bg-blue-400 w-full z-1000`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-3xl text-white text-center mt-2">
            Tem certeza que quer remover o Filme?
          </h2>

          <div className="flex flex-row w-full h-full mt-4">
            <button onClick={() => handleRemove(true, id)} className="bg-green-500 w-full text-white font-extrabold p-2 text-2xl cursor-pointer hover:bg-green-700">Sim</button>
            <button onClick={() => handleRemove(false, id)} className="bg-red-500 w-full text-white font-extrabold p-2 text-2xl cursor-pointer hover:bg-red-700">Não</button>
          </div>
        </motion.div> : null}
    </AnimatePresence>
  );
}
