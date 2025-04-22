/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, FormControl } from "react-bootstrap";
import LabeledFormInput from "../../Assignments/LabeledFormInput";
import { FaTrash } from "react-icons/fa";

export default function MultipleQuestion({
  question,
  setQuestion,
}: {
  question: any;
  setQuestion: (question: any) => void;
}) {
  return (
    <div>
      {question.options?.map((option: any, i: number) => (
        <LabeledFormInput
          label={
            option === question.correctAnswer
              ? "Correct Answer"
              : "Possible Answer"
          }
          id={`possible-answer-${question._id}-${i}`}
          onLabelClicked={() =>
            setQuestion({ ...question, correctAnswer: option })
          }
          inputComponent={
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <FormControl
                id={`possible-answer-${question._id}-${i}`}
                value={option}
                type="textarea"
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    options: question.options.map(
                      (origOption: string, index: number) =>
                        i === index ? e.target.value : origOption
                    ),
                  })
                }
              />
              <FaTrash
                onClick={() =>
                  setQuestion({
                    ...question,
                    options: question.options.filter(
                      (_: string, index: number) => i !== index
                    ),
                  })
                }
              />
            </div>
          }
        />
      ))}
      <Button
        onClick={() =>
          setQuestion({
            ...question,
            options: [...(question.options ?? []), ""],
          })
        }
      >
        Add Option
      </Button>
    </div>
  );
}
