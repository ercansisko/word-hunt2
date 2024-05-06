function Row({ children, type }) {
  return <div className={`row ${type || ""}`}>{children}</div>;
}

export default Row;
