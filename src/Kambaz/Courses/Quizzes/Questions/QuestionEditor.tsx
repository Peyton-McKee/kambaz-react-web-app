/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as questionClient from "./client";
import * as coursesClient from "../../client";

import { Button, Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import QuestionPreview from "./QuestionEditorPreview";
import { v4 as uuidv4 } from "uuid";

export default function QuestionEditor({ quiz }: { quiz: any }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [addedQuestions, setAddedQuestions] = useState<any[]>([]);
  const [deletedQuestions, setDeletedQuestions] = useState<string[]>([]);

  const fetchQuestions = async (questions: string[]) => {
    setQuestions([]);
    setAddedQuestions([]);
    for (const questionId of questions) {
      const question = await questionClient.getQuestion(questionId);
      setQuestions((prev) => [
        ...prev.filter((old) => old._id !== question._id),
        question,
      ]);
    }
  };

  const saveQuestions = async () => {
    let createdQuiz = quiz;
    if (!quiz._id) {
      createdQuiz = await coursesClient.createQuizForCourse(quiz.course, quiz);
    }
    for (const question of questions) {
      if (question.type === "MULTIPLE") {
        await questionClient.updateMultipleQuestion(question);
      } else if (question.type === "FILL_IN_BLANK") {
        await questionClient.updateFillQuestion(question);
      } else {
        await questionClient.updateTrueFalseQuestion(question);
      }
    }

    for (const question of deletedQuestions) {
      await questionClient.deleteQuestion(question);
    }

    for (let question of addedQuestions) {
      question = { ...question, quiz: createdQuiz._id };

      if (question.type === "MULTIPLE") {
        await questionClient.createMultipleQuestion(question);
      } else if (question.type === "FILL_IN_BLANK") {
        await questionClient.createFillQuestion(question);
      } else {
        await questionClient.createTrueFalseQuestion(question);
      }
    }
  };

  const setOriginalQuestion = (question: any) => {
    setQuestions((prev) =>
      prev.map((origQuestion) =>
        question._id === origQuestion._id ? question : origQuestion
      )
    );
  };

  const setAddedQuestion = (question: any) => {
    setAddedQuestions((prev) =>
      prev.map((origQuestion) =>
        question._id === origQuestion._id ? question : origQuestion
      )
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    setDeletedQuestions((prev) => [...prev, questionId]);
    setQuestions((prev) =>
      prev.filter((question) => question._id !== questionId)
    );
  };

  useEffect(() => {
    fetchQuestions(quiz.questions);
  }, [quiz.questions]);

  return (
    <Container
      style={{
        textAlign: "center",
      }}
    >
      {questions.map((question) => (
        <div style={{ marginBottom: 10 }}>
          <QuestionPreview
            question={question}
            setQuestion={setOriginalQuestion}
            handleDelete={() => handleDeleteQuestion(question._id)}
          />
        </div>
      ))}
      {addedQuestions.map((question) => (
        <div style={{ marginBottom: 10 }}>
          <QuestionPreview
            question={question}
            setQuestion={setAddedQuestion}
            handleDelete={() =>
              setAddedQuestions((prev) =>
                prev.filter((prevQuestion) => prevQuestion._id !== question._id)
              )
            }
          />
        </div>
      ))}
      <Button
        onClick={() =>
          setAddedQuestions([
            ...addedQuestions,
            {
              _id: uuidv4(),
              type: "MULTIPLE",
            },
          ])
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          backgroundColor: "#efefef",
          color: "black",
          width: 200,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <FaPlus color="black" />
        New Question
      </Button>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Button onClick={() => fetchQuestions(quiz.questions)}>Cancel</Button>
        <Button style={{ backgroundColor: "red" }} onClick={saveQuestions}>
          Save
        </Button>
      </div>
    </Container>
  );
}
