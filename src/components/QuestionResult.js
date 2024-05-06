import { RxCross2 } from "react-icons/rx";
import { useWordContext } from "../WordContext";
import { FaCheck } from "react-icons/fa6";
import Row from "./Row";

function QuestionResult() {
  const { currentQuestion } = useWordContext();
  return (
    <Row>
      {currentQuestion === false && (
        <span style={{ color: "red", fontSize: "2.3rem" }}>
          <RxCross2 />
        </span>
      )}
      {currentQuestion && (
        <span style={{ color: "green", fontSize: "2.3rem" }}>
          <FaCheck />
        </span>
      )}
    </Row>
  );
}

export default QuestionResult;
