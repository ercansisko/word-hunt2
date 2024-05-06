import { useWordContext } from "../WordContext";
import Button from "./Button";

function Finished() {
  const { dispatch } = useWordContext();
  return (
    <div className="finished">
      <span>test bitti</span>
      <Button onClick={() => dispatch({ type: "test/startagain" })}>
        Tekrar Başla
      </Button>
    </div>
  );
}

export default Finished;
