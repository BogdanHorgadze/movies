import styles from './styles.module.scss';

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: SearchProps) => {
  const { onChange } = props;
  return <input className={styles.search} placeholder="search" type="text" onChange={onChange} />;
};

export default Search;
