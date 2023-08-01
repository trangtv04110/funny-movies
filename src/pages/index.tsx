import Loading from "@/components/Loading";
import MasterLayout from "@/components/MasterLayout";
import { truncate } from "@/helpers";
import { useEffect, useState } from "react";

interface Movie {
  _id: string;
  title: string;
  createdBy: string;
  description: string;
  url: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const getMovies = async () => {
    setLoading(true);

    const res = await fetch(`/api/movies/get`);
    const data = await res.json();
    if (data) setMovies(data);

    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <MasterLayout>
      <div className="flex flex-col space-y-8 justify-center items-center max-w-4xl">
        {loading && <Loading />}
        {!loading &&
          movies.map((movie, i) => (
            <div
              className="flex flex-col space-y-2 md:flex-row md:space-x-8 w-full"
              key={i}
            >
              <iframe
                width="310"
                height="180"
                src={movie.url}
                className="flex"
              ></iframe>

              <div className="flex flex-col space-y-2 flex-1">
                {movie.title && (
                  <h2 className="font-semibold text-slate-900 truncate pr-20">
                    {movie.title}
                  </h2>
                )}
                {movie.createdBy && <div>Shared by: {movie.createdBy}</div>}
                {movie.description && (
                  <div className="text-slate-400">
                    {truncate(movie.description, 220)}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </MasterLayout>
  );
}
