import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hook';
import movieAsyncAction from '../../store/asyncActions/movieAsyncActions';
import styles from './styles.module.scss';

function Create() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.elements[0].value);
    formData.append('year', e.target.elements[1].value);
    formData.append('image', e.target.elements[2].files[0]);
    dispatch(movieAsyncAction.createMovies(formData));
    navigate('/main');
  };

  return (
    <div className={styles.create}>
      <div className={styles.form}>
        <form className={styles.create_modal} onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            className={styles.form_field}
            type="text"
            placeholder="Title"
            name="title"
            id="title"
          />

          <label htmlFor="year">Year</label>
          <input
            className={styles.form_field}
            type="text"
            id="year"
            placeholder="2022"
            name="year"
          />

          <input className={styles.form_field} type="file" name="image" />

          <button className={styles.form_field} type="submit">
            Create
          </button>
          <Link to="/main">Go Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
