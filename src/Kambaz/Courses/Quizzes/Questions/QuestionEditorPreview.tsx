import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import TrueFalseQuestion from "./TrueFalseQuestion";
import MultipleQuestion from "./MultipleChoiceQuestion";
import FillQuestion from "./FillQuestion";
import DefaultEditor from "react-simple-wysiwyg";
import { FaTrash } from "react-icons/fa";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function QuestionEditorPreview({
  question,
  setQuestion,
  handleDelete,
}: {
  question: any;
  setQuestion: (question: any) => void;
  handleDelete: () => void;
}) {
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <FormSelect
          value={question.type}
          onChange={(e) => setQuestion({ ...question, type: e.target.value })}
        >
          <option value={"T_F"}>T/F</option>
          <option value={"MULTIPLE"}>Multiple Choice</option>
          <option value={"FILL_IN_BLANK"}>Fill In The Blank</option>
        </FormSelect>
        <FormGroup style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <FormLabel>Pts:</FormLabel>
          <FormControl
            type="number"
            value={question.points}
            onChange={(e) =>
              setQuestion({ ...question, points: e.target.value })
            }
          />
        </FormGroup>
        <FaTrash onClick={handleDelete} />
      </div>
      <hr />
      <h3>Question:</h3>
      <DefaultEditor
        value={question.question}
        onChange={(e) => setQuestion({ ...question, question: e.target.value })}
      />
      <h3>Answers:</h3>
      {question.type === "T_F" ? (
        <TrueFalseQuestion question={question} setQuestion={setQuestion} />
      ) : question.type === "MULTIPLE" ? (
        <MultipleQuestion question={question} setQuestion={setQuestion} />
      ) : (
        <FillQuestion question={question} setQuestion={setQuestion} />
      )}
    </Container>
  );
}
