import { displayEnum } from "./utils";

interface SelectManyFormInput {
  options: string[];
  title: string;
  id: string;
}

export default function SelectManyFormInput({
  options,
  id,
  title,
}: SelectManyFormInput) {
  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <br />
      {options.map((option) => (
        <div>
          <input type="checkbox" name={option} id={option} />
          <label htmlFor={option}>{displayEnum(option)}</label>
        </div>
      ))}
    </div>
  );
}
