import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import MovieItem from '../../components/MovieItem';
import Search from '../../components/Search';
import Select from '../../components/Select';
import { useAppDispatch, useAppSelector } from '../../hook';
import movieAsyncAction from '../../store/asyncActions/movieAsyncActions';
import styles from './styles.module.scss';

function Main() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const movies = useAppSelector((state) => state.movie.moviesData);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const onExit = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSort = (e: { target: { value: string } }) => {
    setSort(e.target.value);
  };

  const renderMovies = () => {
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
    setPage(e.selected);
  };

  useEffect(() => {
    const params = {
      search,
      sort,
      limit,
      page,
    };
    dispatch(movieAsyncAction.getMovies(params));
  }, [dispatch, limit, page, search, sort]);

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
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={limit}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            pageCount={Math.ceil(movies.total / limit)}
            previousLabel="<"
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
