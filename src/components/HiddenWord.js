import { useWordContext } from "../WordContext";
import LetterContainer from "./LetterContainer";

function HiddenWord() {
  const { status, splitted } = useWordContext();

  return (
    <span className="hidden-word">
      {status === "loaded" &&
        splitted.map((letter) => (
          <LetterContainer
            show={letter.show}
            key={letter.id}
            content={letter.letter}
          />
        ))}
    </span>
  );
}

export default HiddenWord;
