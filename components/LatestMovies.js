import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function LatestMovies({ movies }) {
  const moviesList = movies.map((movie) => {
    return (
      <li key={movie.id}>
        <Link href={`/movies/${movie.id}`} passHref>
          <div
            className={styles["poster"]}
            style={{ backgroundImage: `url("${movie.img}")` }}
          >
            <h1 className={styles["title"]}>{movie.title}</h1>
          </div>
        </Link>
      </li>
    );
  });
  return <ul className={styles["movies-list"]}>{moviesList}</ul>;
}
