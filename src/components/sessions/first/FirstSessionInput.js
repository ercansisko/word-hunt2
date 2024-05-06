import { useEffect, useRef } from "react";
import { useWordContext } from "../../../WordContext";
import Button from "../../Button";

function FirstSessionInput({ answer, setAnswer }) {
  const { dispatch, wordIndex } = useWordContext();
  const myRef = useRef(null);
  useEffect(() => {
    myRef.current.focus();
  }, [wordIndex]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "question/answer", payload: answer });
      }}
    >
      <input
        ref={myRef}
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="answer-input"
      />
      <Button type="answer-btn">cevapla</Button>
    </form>
  );
}

export default FirstSessionInput;
