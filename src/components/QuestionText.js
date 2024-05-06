import { useWordContext } from "../WordContext";
import Row from "./Row";

function QuestionText() {
  const { word: { turkish } = {} } = useWordContext();
  return (
    <>
      <Row>Aşağıdaki kelimenin ingilizce karşılığı nedir?</Row>
      <Row>
        <b>kelime:</b>
        <span>{turkish}</span>
      </Row>
    </>
  );
}

export default QuestionText;
