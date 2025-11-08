import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

function MovieGrid(props: MovieGridProps) {
  const { movies, onSelect } = props;

  function renderMovie(movie: Movie) {
    function handleClick() {
      onSelect(movie);
    }

    return (
      <li key={movie.id} onClick={handleClick}>
        <div className={css.card}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
          <h2 className={css.title}>{movie.title}</h2>
        </div>
      </li>
    );
  }

  return <ul className={css.grid}>{movies.map(renderMovie)}</ul>;
}

export default MovieGrid;