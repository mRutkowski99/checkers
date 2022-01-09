import { StyledInput } from "./Input.styled";

interface IProps {
  label: string;
  placeholder: string;
  id: string;
  onChange: (value: string) => void;
}

const Input = ({ label, placeholder, id, onChange }: IProps) => {
  const changeHandler = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    onChange(target.value);
  };

  return (
    <StyledInput onChange={changeHandler}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" placeholder={placeholder} />
    </StyledInput>
  );
};

export default Input;
