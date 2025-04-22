/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function MultipleChoicePreview({
  onAnswerChanged,
  question,
  showAnswer,
  correct,
  previousAnswer,
}: {
  onAnswerChanged: (val: string) => void;
  question: any;
  showAnswer: boolean;
  correct: boolean;
  previousAnswer: string;
}) {
  const [selected, setSelected] = useState(showAnswer ? previousAnswer : "");

  const handleOnChange = (val: string) => {
    onAnswerChanged(val);
    setSelected(val);
  };

  useEffect(() => {
    setSelected(showAnswer ? previousAnswer : "");
  }, [previousAnswer, showAnswer]);

  return (
    <Form>
      <div>
        {question.options.map((option: string, index: number) => (
          <Form.Check
            key={index}
            type="radio"
            name="optionList"
            label={option}
            value={option}
            checked={selected === option}
            onChange={(e) => !showAnswer && handleOnChange(e.target.value)}
            style={{
              backgroundColor:
                showAnswer && !!previousAnswer
                  ? correct && question.correctAnswer === option
                    ? "green"
                    : "red"
                  : "",
            }}
          />
        ))}
      </div>
    </Form>
  );
}
