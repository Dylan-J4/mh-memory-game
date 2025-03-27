import React, { useEffect, useState } from "react";
import { useGameContext } from "./GameProvider";

const GetImages = ({ onImagesLoaded, images }) => {
  const { score, updateScore, resetScore } = useGameContext();
  const [clickedImages, setClickedImages] = useState(new Set());

  // Load Images
  const loadImages = () => {
    const pngFiles = import.meta.glob("/src/assets/MHR-Icons/*.png");
    const pngPaths = Object.keys(pngFiles);

    // Shuffle and pick 10 random file paths
    const shuffledPaths = pngPaths.sort(() => 0.5 - Math.random()).slice(0, 10);

    // Resolve and extract image URLs
    Promise.all(shuffledPaths.map((path) => pngFiles[path]())).then(
      (resolvedModules) => {
        const imageUrls = resolvedModules.map((module) => module.default);
        onImagesLoaded(imageUrls); // Send images to parent
      }
    );
  };

  // Load images on mount or every 10th score
  useEffect(() => {
    if (images.length === 0) {
      loadImages();
    }
  }, []);

  useEffect(() => {
    if (score > 0 && score % 10 === 0) {
      console.log("Loading new images...");
      loadImages();
      setClickedImages(new Set()); // Reset clicked images
    }
  }, [score]);

  // Handle Image Click
  const handleImageClick = (image) => {
    if (clickedImages.has(image)) {
      console.log("You Lose!");
      resetScore();
      setClickedImages(new Set());
    } else {
      const newClickedImages = new Set(clickedImages);
      newClickedImages.add(image);
      setClickedImages(newClickedImages);
      updateScore();
    }

    // Shuffle images
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    onImagesLoaded(shuffled);
  };

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <img
          className="mhr-img"
          key={index}
          src={image}
          alt={`Random ${index}`}
          onClick={() => handleImageClick(image)}
        />
      ))}
    </div>
  );
};

export default GetImages;
