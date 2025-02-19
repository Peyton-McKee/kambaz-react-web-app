import { ReactNode } from "react";

export interface LabeledFormInputProps {
  label: string;
  id: string;
  inputComponent: ReactNode;
}

export default function LabeledFormInput({
  label,
  inputComponent,
  id,
}: LabeledFormInputProps) {
  return (
    <tr>
      <td align="right" valign="top" className="p-3">
        <label htmlFor={id}>{label}</label>
      </td>
      <td>{inputComponent}</td>
    </tr>
  );
}
