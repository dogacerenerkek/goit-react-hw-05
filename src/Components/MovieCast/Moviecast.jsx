import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast, IMG_URL } from "../../Services/api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (cast.length === 0 && !loading) {
    return <p>Cast information not found.</p>;
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {cast.map(actor => (
          <li key={actor.id} className={css.item}>
            <img
              src={
                actor.profile_path
                  ? `${IMG_URL}${actor.profile_path}`
                  : "https://placehold.co/100x150?text=No+Image"
              }
              alt={actor.name}
              className={css.img}
            />
            <p className={css.name}>{actor.name}</p>
            <p className={css.character}>Role: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;