import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import MovieItem from '../../components/MovieItem';
import Search from '../../components/Search';
import Select from '../../components/Select';
import { useAppDispatch, useAppSelector } from '../../hook';
import movieAsyncAction from '../../store/asyncActions/movieAsyncActions';
import styles from './styles.module.scss';
import { clearMovie } from '../../store/movieSlice';

function Main() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const movies = useAppSelector((state) => state.movie.moviesData);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);

  const onExit = () => {
    localStorage.removeItem('token');
    dispatch(clearMovie());
    navigate('/login');
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSort = (e: { target: { value: string } }) => {
    setSort(e.target.value);
  };

  const renderMovies = () => {
    if (!movies.results?.length)
      return <div className={styles.message}>Create your first movie</div>;
    return movies.results?.map((movie, i) => (
      <MovieItem
        key={i}
        image={movie.image}
        year={movie.year}
        title={movie.title}
      />
    ));
  };

  const handlePageClick = (e: { selected: number }) => {
    setOffset(e.selected * 5);
  };

  useEffect(() => {
    const params = {
      search,
      sort,
      limit,
      offset,
    };
    dispatch(movieAsyncAction.getMovies(params));
  }, [dispatch, limit, offset, search, sort]);

  return (
    <div className={styles.Main}>
      <div className={styles.header}>
        <div className={styles.exit}>
          <span onClick={onExit}>Exit</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <Search onChange={onSearch} />
          <Select onChange={onSort} />
          <Link to="/create">Create Movie</Link>
        </div>
        <div className={styles.list}>{renderMovies()}</div>
        <div className={styles.pagination_container}>
          {movies.total > 5 ? (
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={limit}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              pageCount={Math.ceil(movies.total / limit)}
              previousLabel="<"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Main;
