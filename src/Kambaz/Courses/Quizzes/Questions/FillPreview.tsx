import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

export default function FillPreview({
  onAnswerChanged,
  showAnswer,
  correct,
  previousAnswer,
}: {
  onAnswerChanged: (val: string) => void;
  showAnswer: boolean;
  correct: boolean;
  previousAnswer: string;
}) {
  const [value, setValue] = useState(showAnswer ? previousAnswer : "");

  useEffect(() => {
    setValue(showAnswer ? previousAnswer : "");
  }, [previousAnswer, showAnswer]);

  const handleOnChange = (val: string) => {
    setValue(val);
    onAnswerChanged(val);
  };

  return (
    <FormControl
      value={value}
      type="textarea"
      onChange={(e) => !showAnswer && handleOnChange(e.target.value)}
      style={{
        backgroundColor:
          showAnswer && !!previousAnswer ? (correct ? "green" : "red") : "",
      }}
    />
  );
}
