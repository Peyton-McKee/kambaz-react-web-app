import { Button, Container } from "react-bootstrap";
import QuestionPreview from "./Questions/QuestionPreview";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as questionClient from "./Questions/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function QuizPreview({ quiz }: { quiz: any }) {
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >([]);
  const [showPrevious, setShowPrevious] = useState(false);
  const navigate = useNavigate();

  const handleSubmittingAnswers = async () => {
    try {
      await Promise.all(
        answers.map(
          async (answer) =>
            await questionClient.createAnswer(answer.question, answer.answer)
        )
      );
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2>{quiz.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
      <hr />
      {quiz.questions?.map((questionId: string, i: number) => (
        <QuestionPreview
          questionId={questionId}
          index={i}
          showAnswers={showPrevious}
          onAnswerMade={(answer) =>
            setAnswers((prev) => [
              ...prev.filter(
                (prevAnswer) => prevAnswer.question !== questionId
              ),
              { answer, question: questionId },
            ])
          }
        />
      ))}
      <div style={{ display: "flex", gap: 20 }}>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button onClick={handleSubmittingAnswers}>Answer</Button>
        <Button onClick={() => setShowPrevious(!showPrevious)}>
          Show Previous
        </Button>
      </div>
    </Container>
  );
}
