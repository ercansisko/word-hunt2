import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { WORDS_LENGTH, getRandomUniqueNumbers, sessions } from "./helpers";
import { supabase } from "./supabase";
const initialState = {
	status: "pending",
	words: [],
	splitted: [],
	statistics: [],
	// knownStatistics: [],
	// unknownStatistics: [],
	finish: false,
	session: 0,
	wrongAnswers: 0,
	trueAnswers: 0,
	currentQuestion: null,
	hintcount: 0,
	wordIndex: 0,
};
function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, status: "loading" };
		case "words/load":
			return {
				...state,
				status: "loaded",
				words: action.payload,
				splitted: action.payload[state.wordIndex].english
					.split("")
					.map((letter, i) => ({ id: i, letter, show: false })),
			};
		case "word/next": {
			const isSameStat = state.statistics
				.map((s) => s.id)
				.includes(state.words[state.wordIndex].id);
			const sameStat = state.statistics.find(
				(stat) => stat.id === state.words[state.wordIndex].id
			);
			const newStatus =
				sameStat === undefined
					? null
					: !state.currentQuestion
					? "static"
					: state.hintcount === 0
					? "learnt"
					: sameStat.answer &&
					  state.answer &&
					  sameStat.hintcount <= state.hintcount
					? "static"
					: "improved";
			if (state.wordIndex < state.words.length - 1)
				return {
					...state,
					status: "loaded",
					wordIndex: state.wordIndex + 1,
					splitted: state.words[state.wordIndex + 1].english
						.split("")
						.map((letter, i) => ({ id: i, letter, show: false })),
					wrongAnswers: state.currentQuestion
						? state.wrongAnswers
						: state.wrongAnswers + 1,
					statistics: isSameStat
						? state.statistics.map((stat) =>
								stat.id === state.words[state.wordIndex].id
									? {
											...stat,
											hintcount: state.hintcount,
											answer: state.currentQuestion,
											status: newStatus,
									  }
									: stat
						  )
						: state.statistics.concat({
								//sonradan implement edeceğin bilemediklerim testinde burayı incele
								id: state.words[state.wordIndex].id,
								hintcount: state.hintcount,
								answer: state.currentQuestion,
								status: null,
						  }),
					currentQuestion: null,
					hintcount: 0,
				};
			else
				return {
					...state,
					wrongAnswers: state.currentQuestion
						? state.wrongAnswers
						: state.wrongAnswers + 1,
					statistics: isSameStat
						? state.statistics.map((stat) =>
								stat.id === state.words[state.wordIndex].id
									? {
											...stat,
											hintcount: state.hintcount,
											answer: state.currentQuestion,
											status: newStatus,
									  }
									: stat
						  )
						: state.statistics.concat({
								//sonradan implement edeceğin bilemediklerim testinde burayı incele
								id: state.words[state.wordIndex].id,
								hintcount: state.hintcount,
								answer: state.currentQuestion,
								status: null,
						  }),
				};
		}

		case "word/hint": {
			const closeds = state.splitted.reduce(
				(acc, cur) => (!cur.show ? acc + 1 : acc),
				0
			);
			if (closeds <= 2) return state;
			const rand = Math.floor(Math.random() * closeds);
			const id = state.splitted.filter((s) => s.show === false).at(rand).id;
			const newSplitted = state.splitted.map((p) =>
				p.id === id ? { ...p, show: true } : p
			);
			return {
				...state,
				splitted: newSplitted,
				hintcount: state.hintcount + 1,
			};
		}
		case "question/answer": {
			if (state.splitted.every((s) => s.show === true)) return state;
			else if (action.payload === state.words[state.wordIndex].english)
				return {
					...state,
					trueAnswers: state.trueAnswers + 1,
					splitted: state.splitted.map((s) => ({ ...s, show: true })),
					currentQuestion: true,
				};
			else return { ...state, currentQuestion: false };
		}
		case "question/showAnswer":
			if (state.currentQuestion === true) return state;
			return {
				...state,
				currentQuestion: false,
				splitted: state.splitted.map((s) => ({ ...s, show: true })),
			};
		case "test/finish":
			return { ...state, finish: true };
		case "test/startagain":
			return { ...initialState, finish: false };
		case "test/session": {
			if (state.session >= sessions.length - 1) return state;
			const newWords = state.words.filter((word) =>
				state.statistics
					.filter((stat) => !stat.answer || stat.hintcount > 0)
					.reduce((acc, cur) => acc.concat(cur.id), [])
					.includes(word.id)
			); //yeni kelimeler, eski kelimelerin bilinmeyenleri ya da ipucu alınanları!!!! filter ve reduce u sonra birleştir
			return {
				...state,
				session: state.session + 1,
				words: newWords,
				splitted: newWords[0].english
					.split("")
					.map((letter, i) => ({ id: i, letter, show: false })),
				// knownStatistics: state.knownStatistics.concat(newKnownStatistics),
				// unknownStatistics: state.unknownStatistics.concat(newUnknownStatistics),
				wrongAnswers: 0,
				trueAnswers: 0,
				currentQuestion: null,
				hintcount: 0,
				wordIndex: 0,
			};
		}
		default:
			throw new Error("invalid action type");
	}
}
const WordContext = createContext();
function WordProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		words,
		hintcount,
		currentQuestion,
		// knownStatistics,
		// unknownStatistics,
		trueAnswers,
		wrongAnswers,
		wordIndex,
		status,
		splitted,
		finish,
		statistics,
		session,
	} = state;
	const [puzzleInput, setPuzzleInput] = useState("");
	useEffect(() => {
		async function getWords() {
			if (finish) return;
			dispatch({ type: "loading" });
			const { data } = await supabase.from("statistics").select("id");
			const ids = data?.map((d) => d.id);
			const indexes = getRandomUniqueNumbers(WORDS_LENGTH, 1, 5000, ids);
			const { data: words } = await supabase
				.from("words")
				.select("*")
				.in("id", indexes);
			dispatch({ type: "words/load", payload: words });
		}
		getWords();
	}, [finish]);
	useEffect(() => {
		if (!finish) return;
		async function upsertData() {
			// const stats =
			//   session === 0 ? statistics : knownStatistics.concat(unknownStatistics); //geliştir. ilk oturumdan sonraki herhangi bir anda çıkış anında stats+knowns+unknowns-kesişim şeklinde
			const { error } = await supabase.from("statistics").upsert(statistics);
			if (error) console.log(error.message);
		}
		upsertData();
	}, [finish, statistics]);

	if (status !== "loaded") return null;
	return (
		<WordContext.Provider
			value={{
				wordsLength: words.length,
				wordIndex,
				word: words[wordIndex],
				splitted,
				currentQuestion,
				status,
				trueAnswers,
				wrongAnswers,
				hintcount,
				dispatch,
				finish,
				session,
				puzzleInput,
				setPuzzleInput,
			}}
		>
			{children}
		</WordContext.Provider>
	);
}
function useWordContext() {
	const context = useContext(WordContext);
	if (context === undefined) throw new Error("used outside of the scope");
	return context;
}
export default WordProvider;
export { useWordContext };
