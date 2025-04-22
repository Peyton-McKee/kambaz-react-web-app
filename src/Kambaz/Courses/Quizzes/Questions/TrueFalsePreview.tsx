/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function TrueFalsePreview({
  onAnswerMade,
  question,
  correct,
  showAnswer,
  previousAnswer,
}: {
  onAnswerMade: (answer: string) => void;
  question: any;
  showAnswer: boolean;
  previousAnswer: string;
  correct: boolean;
}) {
  const [value, setValue] = useState(showAnswer ? previousAnswer : "");

  useEffect(() => {
    setValue(showAnswer ? previousAnswer : "");
  }, [previousAnswer, showAnswer]);

  const handleOnValueChanged = (newVal: string) => {
    setValue(newVal);
    onAnswerMade(newVal);
  };
  return (
    <Form>
      <Form.Label>Select an option:</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="True"
          name="trueFalse"
          value="true"
          checked={value === "true"}
          onChange={(e) => !showAnswer && handleOnValueChanged(e.target.value)}
          style={{
            backgroundColor:
              showAnswer && !!previousAnswer
                ? correct && question.correctChoice === true
                  ? "green"
                  : "red"
                : "",
          }}
        />
        <Form.Check
          type="radio"
          label="False"
          name="trueFalse"
          value="false"
          checked={value === "false"}
          onChange={(e) => !showAnswer && handleOnValueChanged(e.target.value)}
          style={{
            backgroundColor: showAnswer
              ? correct && question.correctChoice === false
                ? "green"
                : "red"
              : "",
          }}
        />
      </div>
    </Form>
  );
}
