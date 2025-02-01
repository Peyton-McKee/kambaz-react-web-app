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
      <label className="fw-bold mb-3" htmlFor={id}>
        {title}
      </label>
      <br />
      {options.map((option) => (
        <div className="mb-3">
          <input type="checkbox" className="me-3" name={option} id={option} />
          <label htmlFor={option}>{displayEnum(option)}</label>
        </div>
      ))}
    </div>
  );
}
