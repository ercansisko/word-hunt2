import { HiOutlineLightBulb } from "react-icons/hi2";
import { useWordContext } from "../../../WordContext";
import Button from "../../Button";
import Row from "../../Row";
import HiddenWord from "../../HiddenWord";

function FirstSessionOutput() {
  const { dispatch } = useWordContext();
  return (
    <Row>
      <HiddenWord />
      <Button onClick={() => dispatch({ type: "word/hint" })} type="hint-btn">
        <HiOutlineLightBulb />
      </Button>
    </Row>
  );
}

export default FirstSessionOutput;
