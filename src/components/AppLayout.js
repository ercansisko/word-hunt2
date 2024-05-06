import { useWordContext } from "../WordContext";
import { useEffect, useState } from "react";
import Header from "./Header";
import Finished from "./Finished";
import QuestionResult from "./QuestionResult";
import QuestionText from "./QuestionText";
import ButtonOperations from "./ButtonOperations";
import FinishButton from "./FinishButton";
import SessionOutput from "./sessions/SessionOutput";
import SessionInput from "./sessions/SessionInput";
import SessionButton from "./sessions/SessionButton";
function AppLayout() {
	const { dispatch, finish, setPuzzleInput } = useWordContext();
	const [answer, setAnswer] = useState("");
	function nextQ() {
		setAnswer("");
		setPuzzleInput("");
		dispatch({ type: "word/next" });
	}
	useEffect(() => {
		const rightArrowPress = (e) => {
			if (e.code === "ArrowRight") {
				setAnswer("");
				dispatch({ type: "word/next" });
			} else if (e.code === "ArrowUp") dispatch({ type: "word/hint" });
			else if (e.code === "ArrowDown")
				dispatch({ type: "question/showAnswer" });
			else return;
		};
		window.addEventListener("keydown", rightArrowPress);
		return () => {
			window.removeEventListener("keydown", rightArrowPress);
		};
	}, [dispatch]);
	return (
		<div className="applayout">
			<Header />
			{finish ? (
				<Finished />
			) : (
				<>
					<div className="container">
						<QuestionText />
						<SessionOutput />
						<QuestionResult />
						<SessionInput answer={answer} setAnswer={setAnswer} />
					</div>
					<ButtonOperations onClick={nextQ} />
					<SessionButton />
					<FinishButton />
				</>
			)}
		</div>
	);
}

export default AppLayout;
