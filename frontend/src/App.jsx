import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [time, setTime] = useState(60);
  const [isTyping, setIsTyping] = useState(false);

  const words = [
    "time","person","year","way","day","thing","man","world",
    "life","hand","part","child","eye","woman","place","work",
    "week","case","point","government","company","number"
  ];

  const generateText = (count = 40) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      result.push(words[randomIndex]);
    }
    return result.join(" ");
  };

  // Generate paragraph on load
  useEffect(() => {
    setText(generateText());
  }, []);

  // Timer logic
  useEffect(() => {
    if (isTyping && time > 0) {
      const timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [time, isTyping]);

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (time === 0) return;

      if (!isTyping) setIsTyping(true);

      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setInput((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [time, isTyping]);

  const restartGame = () => {
    setInput("");
    setTime(60);
    setIsTyping(false);
    setText(generateText());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        padding: "40px"
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>RapidKeys</h1>

      <h2 style={{ color: "#facc15" }}>⏱ {time}s</h2>

      <p
        style={{
          fontSize: "22px",
          lineHeight: "35px",
          maxWidth: "800px",
          textAlign: "center",
          marginTop: "20px"
        }}
      >
        {text.split("").map((char, index) => {
          let color = "#555";

          if (index < input.length) {
            color = char === input[index] ? "#4caf50" : "#ff4d4d";
          }

          if (index === input.length && time !== 0) {
            return (
              <span
                key={index}
                style={{
                  borderLeft: "2px solid #facc15",
                  color
                }}
              >
                {char}
              </span>
            );
          }

          return (
            <span key={index} style={{ color }}>
              {char}
            </span>
          );
        })}
      </p>

      <button
        onClick={restartGame}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default App;