import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Form from '../../components/Form';
import authAsyncActions from '../../store/asyncActions/authAsyncActions';
import { useAppDispatch } from '../../hook';
import styles from './styles.module.scss';

function Registration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { name, value } = e.target;
      setValues((values) => ({
        ...values,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (values.password && values.email) {
        setValid(true);
        dispatch(authAsyncActions.registerationUser(values))
          .unwrap()
          .then(() => {
            toast('registrated', {
              type: 'success',
              style: { fontSize: '14px' },
            });
            navigate('/login');
          })
          .catch((e) =>
            toast(e.response.data.message, {
              type: 'error',
              style: { fontSize: '14px' },
            })
          );
      }
      setSubmitted(true);
    },
    [dispatch, navigate, values]
  );

  const redirectHandler = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div className={styles.form_container}>
      <Form
        buttonText="Register"
        submitted={submitted}
        redirectText="Go to Login"
        redirectHandler={redirectHandler}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        values={values}
        valid={valid}
      />
    </div>
  );
}

export default Registration;
