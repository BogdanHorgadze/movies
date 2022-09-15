import styles from './styles.module.scss';

type Values = {
  password: string;
  email: string;
};

interface FormProps {
  buttonText: string;
  submitted: boolean;
  valid: boolean;
  values: Values;
  redirectText: string;
  redirectHandler: () => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Form(props: FormProps) {
  const {
    buttonText,
    submitted,
    valid,
    values,
    redirectText,
    redirectHandler,
    handleInputChange,
    handleSubmit,
  } = props;
  return (
    <div className={styles.form_modal}>
      <form className={styles.register_modal} onSubmit={handleSubmit}>
        {!valid && (
          <input
            className={styles.form_field}
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email && (
          <span id="email-error">Please enter an email address</span>
        )}

        {!valid && (
          <input
            className={styles.form_field}
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.password && (
          <span id="first-password-error">Please enter a password</span>
        )}

        {!valid && (
          <button className={styles.form_field} type="submit">
            {buttonText}
          </button>
        )}
      </form>
      <div className={styles.link}>
        <p onClick={redirectHandler}>{redirectText}</p>
      </div>
    </div>
  );
}

export default Form;
