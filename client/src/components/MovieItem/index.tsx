import styles from './styles.module.scss';

interface MovieItemProps {
  image: string;
  year: string;
  title: string;
}

function MovieItem({ image, year, title }: MovieItemProps) {
  return (
    <div className={styles.MovieItem}>
      <div className={styles.image}>
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}${image}`}
          alt="movie"
          width="250"
          height="250"
        />
      </div>
      <div className={styles.desc}>
        <div className={styles.title}>{title}</div>
        <div className={styles.year}>Release date: {year}</div>
      </div>
    </div>
  );
}

export default MovieItem;
