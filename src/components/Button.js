function Button({ children, onClick, type }) {
  return (
    <button className={`btn ${type || ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
