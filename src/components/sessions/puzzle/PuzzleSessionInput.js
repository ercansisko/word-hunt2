import { useEffect, useMemo, useRef } from "react";
import { useWordContext } from "../../../WordContext";
import Button from "../../Button";
import { HiMiniPaperAirplane } from "react-icons/hi2";

function PuzzleSessionInput() {
  const {
    word: { english } = {},
    splitted,
    puzzleInput,
    setPuzzleInput,
    dispatch,
  } = useWordContext();
  const wordArr = useMemo(
    () =>
      english
        .split("")
        .concat(
          String.fromCharCode(97 + Math.floor(Math.random() * 26)),
          String.fromCharCode(97 + Math.floor(Math.random() * 26))
        )
        .sort((a, b) => 0.5 - Math.random()),
    [english]
  ); //kaç harflik kelime olduğu belli değil. sonra ilgilen

  const length = wordArr.length;
  const angle = (2 * Math.PI) / length;
  const handleClick = (e) => {
    if (puzzleInput.length >= splitted.length) return;

    setPuzzleInput((prev) => prev.concat(e.target.innerText));
    if (puzzleInput.length === splitted.length)
      dispatch({ type: "question/answer", payload: puzzleInput });
  };
  return (
    <>
      <div className="puzzle-input">
        {wordArr.map((letter, i) => (
          <span
            onClick={handleClick}
            className="letter"
            style={{
              top: `${43 - 45 * Math.sin(angle * i)}%`,
              right: `${43 - 45 * Math.cos(angle * i)}%`,
            }}
            key={i}
          >
            {letter}
          </span>
        ))}
        <Button
          onClick={() => {
            dispatch({ type: "question/answer", payload: puzzleInput });
            setPuzzleInput("");
          }}
          type="puzzle-btn"
        >
          <HiMiniPaperAirplane />
        </Button>
      </div>
    </>
  );
}

export default PuzzleSessionInput;
