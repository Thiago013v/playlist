import { motion, AnimatePresence } from "motion/react";

interface ModalConfirmationType {
  isShowModalConfirmation?: boolean;
  id: number;
  handleRemove: (
    remove: boolean,
    id: number,
    handleShowModalConfirmation: (remove: boolean) => void,
  ) => void;
  title: string;
  setIsShowModalConfirmation: (remove: boolean) => void;
}

export function ModalConfirmation({
  isShowModalConfirmation,
  id,
  handleRemove,
  title,
  setIsShowModalConfirmation,
}: ModalConfirmationType) {
  return (
    <AnimatePresence initial={false}>
      {isShowModalConfirmation ? (
        <motion.div
          className={`fixed top-0 left-0 bg-blue-400 w-full z-1000`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-3xl text-white text-center mt-2">
            Quer remover {title} da sua lista
          </h2>

          <div className="flex flex-row w-full h-full mt-4">
            <button
              onClick={() => handleRemove(true, id, setIsShowModalConfirmation)}
              className="bg-green-500 w-full text-white p-2 text-2xl cursor-pointer hover:bg-green-700"
            >
              Sim
            </button>
            <button
              onClick={() =>
                handleRemove(false, id, setIsShowModalConfirmation)
              }
              className="bg-red-500 w-full text-white p-2 text-2xl cursor-pointer hover:bg-red-700"
            >
              Não
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
