/* eslint-disable @typescript-eslint/no-explicit-any */

export default function TrueFalseQuestion({
  question,
  setQuestion,
}: {
  question: any;
  setQuestion: (question: any) => void;
}) {
  return (
    <div>
      <h3
        style={{ backgroundColor: question.correctChoice ? "green" : "red" }}
        onClick={() => setQuestion({ ...question, correctChoice: true })}
      >
        True
      </h3>
      <h3
        style={{ backgroundColor: question.correctChoice ? "red" : "green" }}
        onClick={() => setQuestion({ ...question, correctChoice: false })}
      >
        False
      </h3>
    </div>
  );
}
