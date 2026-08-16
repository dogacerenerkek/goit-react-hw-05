import { Link, useLocation } from "react-router-dom";
import { IMG_URL } from "../../Services/api";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
          >
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className={css.img}
            />
            <p className={css.title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;