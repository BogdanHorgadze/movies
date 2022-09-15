import styles from './styles.module.scss';

interface SelectProps {
  onChange: (e: { target: { value: string } }) => void;
}

const Select = (props: SelectProps) => {
  const { onChange } = props;
  return (
    <select onChange={onChange}>
      <option value="old" selected>
        Old
      </option>
      <option value="new">New</option>
    </select>
  );
};

export default Select;
