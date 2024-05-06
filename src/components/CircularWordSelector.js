import React, { useState, useEffect } from "react";

const CircularWordSelector = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const circularDivRef = React.createRef();

  const handleMouseDown = () => {
    setIsSelecting(true);
    setSelectedLetters([]);
  };

  const handleMouseMove = (e) => {
    if (isSelecting) {
      const circularDiv = circularDivRef.current;

      // Check if circularDivRef is available
      if (!circularDiv) {
        return;
      }

      const circularDivRect = circularDiv.getBoundingClientRect();
      const centerX = circularDivRect.left + circularDivRect.width / 2;
      const centerY = circularDivRect.top + circularDivRect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const sector = (angle + Math.PI) / (Math.PI / 3); // Assuming 6 sectors

      const selectedLetterIndex = Math.floor(sector) % 6;
      const letters = circularDiv.children;

      // Highlight the selected letter with inline styles
      for (let i = 0; i < letters.length; i++) {
        letters[i].style.backgroundColor =
          i === selectedLetterIndex ? "lightblue" : "transparent";
      }

      // Store the selected letter in the state
      setSelectedLetters((prevLetters) => [
        ...prevLetters,
        letters[selectedLetterIndex].textContent,
      ]);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    // Do something with the gathered word (e.g., display it)
    console.log("Selected Word:", selectedLetters.join(""));
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSelecting]);

  return (
    <div
      ref={circularDivRef}
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        position: "relative",
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseDown={handleMouseDown}
    >
      <span>A</span>
      <span>B</span>
      <span>C</span>
      <span>D</span>
      <span>E</span>
      <span>F</span>
    </div>
  );
};

export default CircularWordSelector;
