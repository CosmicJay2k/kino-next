import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Movie.module.css";
import Link from "next/link";
import RightSidebar from "../../components/RightSidebar";

import connectDb from "../../DB/connectDb";
import Movies from "../../DB/models/movies";
import Screenings from "../../DB/models/screenings";

// Get requested movie and screenings for that movie from DB
export async function getServerSideProps(context) {
  await connectDb();
  const movieID = JSON.parse(`{ "movieid":${context.query.id} }`);

  const movie = await Movies.findOne(context.query, { _id: 0 }).lean();
  const screenings = await Screenings.find(movieID, { _id: 0 }).lean();

  if (!movie) {
    return { notFound: true };
  }
  return { props: { movie, screenings } };
}

export default function Post({ movie, screenings }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kino Luleå</title>
        <meta
          name="description"
          content="Fictional website for cinema in Luleå"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles["main-container"]}>
          <div className={styles["main-container-content-article-small"]}>
            <p>{movie.title.toUpperCase()}</p>
          </div>
          <div className={styles["main-container-content"]}>
            <p className={styles["about"]}>{movie.details.about}</p>
            <p className={styles["involved"]}>
              Director: {movie.details.director}
            </p>
            <p className={styles["involved"]}>
              Writer(s): {movie.details.writers}
            </p>
            <p className={styles["involved"]}>
              Starring: {movie.details.stars}
            </p>
            <p className={styles["rating"]}>
              IMDB rating: {movie.details.rating}
            </p>
            <div className={styles["poster"]}>
              <Image
                className={styles["image"]}
                src={movie.img}
                layout="fill"
                alt="Movie poster"
              />
            </div>
          </div>
        </div>
        <div className={styles["right-container"]}>
          <RightSidebar screenings={screenings} movie={movie} />
        </div>
        
      </main>
      <Link href="/salonDetails">
        <button className={styles["buy-button"]}>Buy this movie</button>
      </Link>
      
    </div>
  );
}
