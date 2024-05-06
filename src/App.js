import "./App.css";
import WordProvider from "./WordContext";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <WordProvider>
      <AppLayout />
    </WordProvider>
  );
}

export default App;
