import { ReactNode } from "react";

export interface LabeledFormInputProps {
  label: string;
  id: string;
  inputComponent: ReactNode;
  onLabelClicked?: () => void;
}

export default function LabeledFormInput({
  label,
  inputComponent,
  id,
  onLabelClicked,
}: LabeledFormInputProps) {
  return (
    <tr>
      <td align="right" valign="top" className="p-3">
        <label onClick={onLabelClicked} htmlFor={id}>
          {label}
        </label>
      </td>
      <td>{inputComponent}</td>
    </tr>
  );
}
