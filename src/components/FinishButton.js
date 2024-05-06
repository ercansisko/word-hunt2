import { ImCross } from "react-icons/im";
import Button from "./Button";
import { useWordContext } from "../WordContext";

function FinishButton() {
  const { dispatch } = useWordContext();
  return (
    <Button onClick={() => dispatch({ type: "test/finish" })} type="finish-btn">
      <ImCross />
    </Button>
  );
}

export default FinishButton;
