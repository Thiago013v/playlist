import { TbMovie } from "react-icons/tb";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePlaylist, type DataMovieType } from "./hooks/usePlaylist";
import { CardSuggestionMovie } from "./components/CardSuggestionMovie";
import { CardMovie } from "./components/CardMovie";
import { ModalError } from "./components/ModalError";

export function App() {
  const {
    Controller,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isShow,
    addMovieToList,
    isShowModalError,
    movieList,
    dataMovie,
    typeMovieError,
    handleRemove,
  } = usePlaylist();

  return (
    <>
      <CardSuggestionMovie
        title={dataMovie?.Title}
        cast={dataMovie?.Actors}
        description={dataMovie?.Plot}
        imageMovie={dataMovie?.Poster}
        genre={dataMovie?.Genre}
        addToList={addMovieToList}
        isShowModalSuggestion={isShow}
      ></CardSuggestionMovie>

      <ModalError
        isShowModalError={isShowModalError}
        typeError={typeMovieError}
      ></ModalError>

      <div
        className={`min-h-svh bg-amber-200 grid grid-rows-[60px_1fr] grid-cols-[1fr] ${isShow && "brightness-50"}`}
      >
        <header className="w-full bg-green-950 flex flex-row justify-between p-2 z-50">
          <h1 className="text-2xl text-white flex flex-row items-center">
            <TbMovie className="text-5xl" />
            <span>MyMovies</span>
          </h1>

          <form
            className="flex flex-row items-center mr-4 gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-row items-center gap-3">
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
                      className="bg-white w-100 rounded-md text-center"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      value={field.value}
                    />
                  )}
                ></Controller>
              </div>
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-3">
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
                      className="bg-white rounded-md text-center"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      value={field.value}
                    />
                  )}
                ></Controller>
              </div>
              <button className="rounded-md bg-green-950 border border-white p-1 cursor-pointer text-white font-extrabold hover:bg-amber-100 hover:text-black">
                <FaMagnifyingGlass className="" />
              </button>
            </div>
          </form>
        </header>

        <main className="w-full h-full flex flex-row items-center justify-center">
          <div>
            <ul className="flex flex-row gap-4 items-center justify-center">
              {movieList.map((currentMovie: DataMovieType) => (
                <CardMovie
                  key={currentMovie.Id}
                  Id={currentMovie.Id}
                  Poster={currentMovie.Poster}
                  handleRemove={handleRemove}
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
