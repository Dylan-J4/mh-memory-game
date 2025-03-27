import React, { createContext, useState, useEffect, useContext } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("In Progress");
  const [images, setImages] = useState([]);
  const [clickedImages, setClickedImages] = useState(new Set());

  // Increment score safely
  const updateScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  // Reset score on loss
  const resetScore = () => {
    setScore(0);
    setClickedImages(new Set()); // Clear clicked images
    setGameStatus("In Progress");
  };

  // Track high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  return (
    <GameContext.Provider
      value={{
        score,
        highScore,
        gameStatus,
        images,
        clickedImages,
        updateScore,
        resetScore,
        setImages,
        setClickedImages,
        setGameStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
