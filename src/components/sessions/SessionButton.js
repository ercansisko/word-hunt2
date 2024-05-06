import { useWordContext } from "../../WordContext";
import { sessions } from "../../helpers";
import Button from "../Button";

function SessionButton() {
  const { wrongAnswers, dispatch, wordIndex, wordsLength, session } =
    useWordContext();
  if (wrongAnswers >= 5 || wordIndex === wordsLength - 1)
    return (
      <Button
        onClick={() => {
          dispatch({ type: "word/next" }); // hatalı kullanım olabilir. araştır. arka arkaya birbiri ile ilintili state set etmek?
          dispatch({ type: "test/session" });
        }}
        type="session-btn"
      >
        Sonraki Oturum:{sessions[session + 1]}
      </Button>
    );
  else return null;
}

export default SessionButton;
