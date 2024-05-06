import { useWordContext } from "../WordContext";
import Button from "./Button";

function ButtonOperations({ onClick }) {
  const {
    dispatch,
    wordIndex,
    wordsLength,
    setPuzzleInput,
    word: { english } = {},
  } = useWordContext();
  return (
    <div className="button-group">
      <Button
        onClick={() => {
          setPuzzleInput(english);
          dispatch({ type: "question/showAnswer" });
        }}
      >
        Cevabı Göster
      </Button>
      {wordIndex < wordsLength - 1 && (
        <Button onClick={onClick}>Sonraki Soru</Button>
      )}
    </div>
  );
}

export default ButtonOperations;
