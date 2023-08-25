import { useState } from "react";
import { useForm } from "react-hook-form";
// import useSWR from "swr";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [filter, setFilter] = useState(false);
  // const {data} = useSWR("https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=Harry+Potter", fetcher);
  // const { data } = useSWR(
  //   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  //   fetcher
  // );
  // console.log(data);
  return (
    <div className="bg-[#0A2647] min-h-screen w-full w-full flex justify-center py-[50px]">
      <div className="max-w-5xl w-full h-full">
        <form
          className="w-full h-full space-y-[30px]"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="space-y-[10px]">
            <h1 className="text-white text-7xl font-bold">Elbi Movies</h1>
            <p className="text-white text-2xl">
              Search any movie for{" "}
              <span className="font-bold underline">free</span>
            </p>
          </div>

          <div className="bg-[#2C74B3] w-full h-[2px]"></div>

          <div className="flex flex-col space-y-[10px]">
            <label htmlFor="search" className="text-white text-2xl font-bold">
              Title :
            </label>
            <input
              id="search"
              type="text"
              className="bg-[#144272] text-white shadow p-[10px]"
              {...register("title", {
                maxLength: {
                  value: 50,
                  message:
                    "The amount of search text is too long. Max Length is 50",
                },
              })}
            />
            {errors?.title?.message && (
              <p className="text-lg text-red-600">
                {errors?.title?.message as string}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setFilter((state) => !state)}
            className="bg-[#205295] p-[16px] text-white shadow hover:opacity-[0.8] active:scale-[0.8] active:opacity-[0.5]"
          >
            {filter ? "Close" : "Open"} Filter Menu
          </button>

          {filter && (
            <div className="space-y-[16px]">
              <div className="flex flex-col space-y-[10px]">
                <label
                  htmlFor="search"
                  className="text-white text-2xl font-bold"
                >
                  Language :
                </label>
                <input
                  id="search"
                  type="text"
                  className="bg-[#144272] text-white shadow p-[10px]"
                  {...register("language", {
                    maxLength: {
                      value: 50,
                      message:
                        "The amount of search text is too long. Max Length is 50",
                    },
                    shouldUnregister: true,
                  })}
                />
                {errors?.language?.message && (
                  <p className="text-lg text-red-600">
                    {errors?.language?.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-[10px]">
                <label
                  htmlFor="search"
                  className="text-white text-2xl font-bold"
                >
                  Year :
                </label>
                <input
                  id="search"
                  type="number"
                  className="bg-[#144272] text-white shadow p-[10px]"
                  {...register("year", {
                    min: {
                      value: 1900,
                      message: "Length must be 4",
                    },
                    max: {
                      value: new Date().getFullYear(),
                      message: "Length must be 4",
                    },
                    valueAsNumber: true,
                    shouldUnregister: true,
                  })}
                />
                {errors?.year?.message && (
                  <p className="text-lg text-red-600">
                    {errors?.year?.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-[10px]">
                <label
                  htmlFor="search"
                  className="text-white text-2xl font-bold"
                >
                  Region :
                </label>
                <input
                  id="search"
                  type="text"
                  className="bg-[#144272] text-white shadow p-[10px]"
                  {...register("region", {
                    maxLength: {
                      value: 50,
                      message:
                        "The amount of search text is too long. Max Length is 50",
                    },
                    shouldUnregister: true,
                  })}
                />
              </div>
              {errors?.region?.message && (
                <p className="text-lg text-red-600">
                  {errors?.region?.message as string}
                </p>
              )}
            </div>
          )}

          <div className="w-full h-full">
            <button
              type="submit"
              className="bg-[#205295] p-[16px] text-white shadow hover:opacity-[0.8] active:scale-[0.8] active:opacity-[0.5] w-full"
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
