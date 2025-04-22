import { Button, FormControl } from "react-bootstrap";
import LabeledFormInput from "../../Assignments/LabeledFormInput";
import { FaTrash } from "react-icons/fa";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function FillQuestion({
  question,
  setQuestion,
}: {
  question: any;
  setQuestion: (question: any) => void;
}) {
  return (
    <div>
      {question.potentialAnswers?.map((answer: string, i: number) => (
        <LabeledFormInput
          label={"Potential Answer"}
          id={`potential-answer-${question._id}-${i}`}
          inputComponent={
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <FormControl
                id={`potential-answer-${question._id}-${i}`}
                value={answer}
                type="textarea"
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    potentialAnswers: question.potentialAnswers.map(
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
                    potentialAnswers: question.potentialAnswers.filter(
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
            potentialAnswers: [...(question.potentialAnswers ?? []), ""],
          })
        }
      >
        Add Option
      </Button>
    </div>
  );
}
