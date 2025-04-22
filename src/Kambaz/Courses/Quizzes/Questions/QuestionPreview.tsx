/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as questionClient from "./client";
import FillPreview from "./FillPreview";
import TrueFalsePreview from "./TrueFalsePreview";
import MultipleChoicePreview from "./MultipleChoicePreview";

export default function QuestionPreview({
  questionId,
  index,
  onAnswerMade,
  showAnswers,
}: {
  questionId: string;
  index: number;
  onAnswerMade: (answer: string) => void;
  showAnswers: boolean;
}) {
  const [question, setQuestion] = useState<any | undefined>(undefined);
  const [answer, setAnswer] = useState<any | undefined>(undefined);

  useEffect(() => {
    const fetchQuestion = async () => {
      const question = await questionClient.getQuestion(questionId);
      setQuestion(question);
    };
    const fetchAnswer = async () => {
      const answer = await questionClient.getAnswer(questionId);
      setAnswer(answer);
    };

    if (showAnswers) {
      fetchAnswer();
    }
    fetchQuestion();
  }, [questionId, showAnswers]);

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Question {index}</h3>
        <h3>{question.points} pts</h3>
      </div>
      {question.question}
      <hr />
      {question.type === "T_F" ? (
        <TrueFalsePreview
          onAnswerMade={onAnswerMade}
          previousAnswer={answer?.answer}
          correct={answer?.correct}
          showAnswer={showAnswers}
          question={question}
        />
      ) : question.type === "MULTIPLE" ? (
        <MultipleChoicePreview
          onAnswerChanged={onAnswerMade}
          question={question}
          previousAnswer={answer?.answer}
          correct={answer?.correct}
          showAnswer={showAnswers}
        />
      ) : (
        <FillPreview
          onAnswerChanged={onAnswerMade}
          previousAnswer={answer?.answer}
          correct={answer?.correct}
          showAnswer={showAnswers}
        />
      )}
    </div>
  );
}
