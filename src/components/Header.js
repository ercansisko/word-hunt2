import { useWordContext } from "../WordContext";

function Header() {
  const { trueAnswers, wrongAnswers } = useWordContext();
  return (
    <div className="header">
      <span>Doğru:{trueAnswers}</span>
      <span>Yanlış:{wrongAnswers}</span>
    </div>
  );
}

export default Header;
