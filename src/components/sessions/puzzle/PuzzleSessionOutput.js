import { useWordContext } from "../../../WordContext";
import Row from "../../Row";

function PuzzleSessionOutput() {
  const {
    puzzleInput,
    currentQuestion,
    word: { english } = {},
  } = useWordContext();
  return <Row>{puzzleInput}</Row>;
}

export default PuzzleSessionOutput;
