import { useEffect, useMemo, useState } from "react";
import fetcher from "./utils/fetcher";
import useSWR from "swr";

function App() {
  const [search, setSearch] = useState("");
  const [searchKeyUp, setSearchKeyUp] = useState("");

  const url = useMemo(() => {
    const searchParam = new URLSearchParams();
    searchParam.set("query", searchKeyUp);
    return searchKeyUp
      ? `${import.meta.env.VITE_MOVIE_SEARCH}${searchParam.toString()}`
      : import.meta.env.VITE_MOVIE_LIST_ALL;
  }, [searchKeyUp]);

  const { data } = useSWR(url, fetcher);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchKeyUp(search);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, setSearchKeyUp]);

  return (
    <div className="bg-[#0A2647] min-h-screen w-full w-full flex justify-center py-[50px]">
      <div className="max-w-5xl w-full h-full">
        <div className="w-full h-full space-y-[30px]">
          <div className="space-y-[10px]">
            <h1 className="text-white text-7xl font-bold">Elbi Movies</h1>
            <p className="text-white text-2xl">
              Search any movie for{" "}
              <span className="font-bold underline">free</span>
            </p>
          </div>

          <div className="bg-[#2C74B3] w-full h-[2px]"></div>

          <div className="space-y-[10px]">
            <input
              id="search"
              type="text"
              className="bg-[#144272] w-full text-white shadow p-[16px] rounded hover:opacity-[0.8]"
              placeholder="Search Any Movies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <p className="text-white">
              Search by titles like:{" "}
              <span className="font-bold">
                Fast And Furious, Dragon Ball, One Piece
              </span>
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-3 grid-rows-7 gap-[48px] !mt-[50px]">
            {Array.isArray(data?.results) &&
              data?.results.map((candidate) => (
                <div
                  key={candidate.id}
                  className="group shadow-xl bg-[#144272] rounded overflow-hidden hover:border-[#2C74B3] border-[3px] border-[#0A2647]"
                >
                  <div className="w-full h-[500px] bg-[#0A2647] overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${
                        candidate.poster_path
                      }`}
                      alt={candidate.title}
                      className="w-full h-full object-cover transition group-hover:scale-[1.2]"
                    />
                  </div>
                  <div className="p-[16px]">
                    <p className="text-white text-2xl">{candidate.title}</p>
                    <p className="text-white text-md">
                      {candidate.release_date}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="w-full h-full grid grid-cols-2 gap-[20px] justify-end">
            {["Previous", "Next"].map((candidate) => (
              <button
                className="bg-[#205295] p-[16px] text-white shadow hover:opacity-[0.8] active:scale-[0.8] active:opacity-[0.5]"
                key={candidate}
              >
                {candidate}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
