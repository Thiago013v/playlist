import { TbMovie } from "react-icons/tb";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePlaylistContext } from "./hooks/usePlaylistContext";
import type { DataMovieType } from "./contexts/PlayListContextProvider";
import { CardSuggestionMovie } from "./components/CardSuggestionMovie";
import { CardMovie } from "./components/CardMovie";
import { ModalError } from "./components/ModalError";
import { ModalConfirmation } from "./components/ModalConfirmation";

export function App() {
  const {
    Controller,
    control,
    errors,
    handleSubmit,
    onSubmit,
    movieList,
    isShowModal,
  } = usePlaylistContext();

  return (
    <>
      <CardSuggestionMovie></CardSuggestionMovie>

      <ModalError></ModalError>

      <ModalConfirmation></ModalConfirmation>

      <div
        className={`min-h-svh grid grid-rows-[100px_1fr] md:grid-rows-[60px_1fr] grid-cols-[1fr] bg-amber-200 ${isShowModal && "brightness-50"}`}
      >
        <header className="w-full col-start-1 col-end-2 row-start-1 row-end-2 bg-green-950 flex flex-row flex-wrap justify-center md:justify-between items-center p-2 z-50m">
          <h1 className="text-1xl md:text-2xl lg:text-3xl text-white flex flex-row items-center">
            <TbMovie className="text-2xl md:text-3xl lg:text-4xl" />
            <span>MyMovies</span>
          </h1>

          <form
            className="flex flex-row gap-2 mt-3 md:mr-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="name" className="text-white">
                  Nome:
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="name"
                      className="bg-white w-[70%] md:w-60 lg:w-80"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      value={field.value}
                    />
                  )}
                ></Controller>
              </div>
              {errors.name && (
                <span className="text-red-500 text-[0.8rem]">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-row items-center gap-2">
              <label htmlFor="year" className="text-white">
                Ano:
              </label>
              <Controller
                control={control}
                name="year"
                render={({ field }) => (
                  <input
                    type="number"
                    id="year"
                    className="bg-white w-[70%]"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    value={field.value}
                  />
                )}
              ></Controller>
            </div>

            <button className="rounded-md bg-green-950 max-w-6.5 max-h-6.5 border border-white p-1 cursor-pointer text-white font-extrabold hover:bg-amber-100 hover:text-black">
              <FaMagnifyingGlass className="" />
            </button>
          </form>
        </header>

        <main className="col-start-1 col-end-2 row-start-2 row-end-3 flex sm:flex-col items-center justify-center">
          <div className="mt-4 w-[80%]">
            <ul className="flex flex-col justify-center items-center md:flex-row flex-wrap gap-4">
              {movieList.map((currentMovie: DataMovieType) => (
                <CardMovie
                  key={currentMovie.Id}
                  Id={currentMovie.Id}
                  Poster={currentMovie.Poster}
                  title={currentMovie.Title}
                ></CardMovie>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
