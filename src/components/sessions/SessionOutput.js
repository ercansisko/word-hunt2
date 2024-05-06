import { useWordContext } from "../../WordContext";
import FirstSessionOutput from "./first/FirstSessionOutput";
import PuzzleSessionOutput from "./puzzle/PuzzleSessionOutput";

function SessionOutput() {
  const { session } = useWordContext();
  if (session === 0 || session === 1) return <FirstSessionOutput />;
  else if (session === 2) return <PuzzleSessionOutput />;
  else return null;
}

export default SessionOutput;
