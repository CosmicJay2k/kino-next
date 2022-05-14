import styles from "../styles/Sidebar.module.css";
import Link from "next/link";

export default function RightSidebar({ screenings, movies, movie }) {
  const screeningsList = screenings.map((screening) => {
    let title = "";
    let seatsAvail = 0;

    // Check available seats
    screening.rows.forEach((row) => {
      for (const [key, value] of Object.entries(row)) {
        if (value === "") {
          seatsAvail++;
        }
      }
    });

    // If single movie
    if (movie) {
      title = movie.title;
    }

    // If all movies
    if (movies) {
      movies.forEach((movie) => {
        if (movie.id === screening.movieid) {
          title = movie.title;
        }
      });
    }
    // Create the list of screenings
    return (
      <div className={styles["screening-container"]} key={screening.id}>
        <li>
          <p className={styles["title"]}>{title}</p>
          <p>
            {screening.date} kl. {screening.time}
          </p>
          <div className={styles["screening-container-bottom"]}>
            <p>{seatsAvail} lediga stolar</p>
            <Link href="/" passHref>
              <button className={styles["book-button"]}>Boka nu</button>
            </Link>
          </div>
        </li>
      </div>
    );
  });
  return (
    <>
      {" "}
      <div className={styles["right-container-content-article-small"]}>
        <p>BILJETTER</p>
      </div>
      <div className={styles["right-container-content-calendar"]}>
        <ul>{screeningsList}</ul>
      </div>
    </>
  );
}
