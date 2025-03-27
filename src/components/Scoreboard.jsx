import React from "react";
import { useGameContext } from "./GameProvider";

const Scoreboard = () => {
  const { score, highScore } = useGameContext();

  return (
    <div className="scoreboard">
      <p>
        <strong>Score: {score}</strong>
      </p>
      <p>
        <strong>High Score: {highScore}</strong>
      </p>
    </div>
  );
};

export default Scoreboard;
