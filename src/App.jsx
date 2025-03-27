import { GameProvider } from "./components/GameProvider";
import Scoreboard from "./components/Scoreboard";
import GetImages from "./components/GetImages";
import { useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);

  const handleImagesLoaded = (loadedImages) => {
    setImages([...loadedImages]);
  };

  const shuffleImages = () => {
    setImages((prevImages) => {
      const shuffled = [...prevImages];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  return (
    <GameProvider>
      <header>
        <h1>Monster Hunter Rise Memory Game</h1>
      </header>
      <div className="App">
        <Scoreboard></Scoreboard>
        <GetImages
          onImagesLoaded={handleImagesLoaded}
          images={images}
          shuffleImages={shuffleImages}
        ></GetImages>
      </div>
    </GameProvider>
  );
};

export default App;
