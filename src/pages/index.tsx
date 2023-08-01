import Loading from "@/components/Loading";
import MasterLayout from "@/components/MasterLayout";
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
      <div className="flex flex-col space-y-4">
        {loading && <Loading />}
        {!loading &&
          movies.map((movie, i) => (
            <div className="flex space-x-8" key={i}>
              <iframe width="420" height="200" src={movie.url}></iframe>

              <div>
                <div>{movie.title}</div>
                <div>Shared by: {movie.createdBy}</div>
                <div>Description: {movie.description}</div>
              </div>
            </div>
          ))}
      </div>
    </MasterLayout>
  );
}
