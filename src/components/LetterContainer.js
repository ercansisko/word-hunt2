function LetterContainer({ content, show }) {
  return (
    <span className="letter-container">
      <span style={{ visibility: show ? "visible" : "hidden" }}>{content}</span>
    </span>
  );
}

export default LetterContainer;
