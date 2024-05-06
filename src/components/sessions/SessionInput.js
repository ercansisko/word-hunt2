import { useWordContext } from "../../WordContext";
import FirstSessionInput from "./first/FirstSessionInput";
import PuzzleSessionInput from "./puzzle/PuzzleSessionInput";
import Row from "../Row";

function SessionInput({ answer, setAnswer }) {
  const { session } = useWordContext();
  if (session === 0 || session === 1)
    return (
      <Row>
        <FirstSessionInput answer={answer} setAnswer={setAnswer} />
      </Row>
    );
  else if (session === 2)
    return (
      <Row type="puzzle">
        <PuzzleSessionInput />
      </Row>
    );

  return null;
}

export default SessionInput;
