import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./general.css";

export default function Tetris() {
  const location = useLocation();

  const [grid, setGrid] = useState(
    Array(24)
      .fill()
      .map(() => Array(10).fill(""))
  );
  const [colorGrid, setColorGrid] = useState(
    Array(24)
      .fill()
      .map(() => Array(10).fill(""))
  );
  const [maxPosition, setMaxPosition] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const [currentShape, setCurrentShape] = useState("");
  const [currentShapeFirstBlockPos, setCurrentShapeFirstBlockPos] = useState([
    { x: 0, y: 0 },
  ]);
  const [currentShapePos, setCurrentShapePos] = useState([]);
  const [pauseGame, setPauseGame] = useState(false);
  const [direction, setDirection] = useState("");
  const [allowReposition, setAllowReposition] = useState(true);
  const [allowDownBoost, setAllowDownBoost] = useState(true);
  const [bottomBump, setBottomBump] = useState(false);
  const [deadBlocksList, setDeadBlocksList] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [allowLeft, setAllowLeft] = useState(true);
  const [allowRight, setAllowRight] = useState(true);

  const shapes = ["I", "L", "O"];
  const colorList = [
    "#CC99C9",
    "#9EC1CF",
    "#9EE09E",
    "#FDFD97",
    "#FEB144",
    "#FF6663",
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "s" || event.key === "ArrowDown") {
        if (allowDownBoost) {
          let tempY = maxPosition.bottom;
          currentShapeFirstBlockPos.forEach((value) => {
            while (tempY + 1 < 22 && grid[tempY + 2][value.x] !== "o") {
              if (tempY + 1 > 22 || grid[tempY + 1][value.x] === "o") {
                tempY = maxPosition.bottom;
                break;
              }
              tempY++;
            }
            removeShape();
            value.y = tempY - 3;
            updateScreen();
          });
          setAllowDownBoost(false);
        }
      }
    };

    const handleKeyDown = (event) => {
      renderShape();

      currentShapePos.forEach((value) => {
        if (grid[value.y][value.x - 1] === "o") setAllowLeft(false);
        if (grid[value.y][value.x + 1] === "o") setAllowRight(false);
      });

      if (allowReposition && !pauseGame) {
        if (["a", "d", "ArrowRight", "ArrowLeft"].includes(event.key)) {
          removeShape();
        }
        if (event.key === "ArrowLeft" || event.key === "a") {
          if (maxPosition.left > 0 && allowLeft) {
            setCurrentShapeFirstBlockPos((prev) => {
              const newPos = [...prev];
              newPos[0].x--;
              return newPos;
            });
          }
          setAllowLeft(true);
        } else if (event.key === "ArrowRight" || event.key === "d") {
          if (maxPosition.right < 9 && allowRight) {
            setCurrentShapeFirstBlockPos((prev) => {
              const newPos = [...prev];
              newPos[0].x++;
              return newPos;
            });
          }
          setAllowRight(true);
        }
        currentShapeFirstBlockPos.forEach((value) => {
          drawShapeGrid(currentShape, false, value.x, value.y);
        });
        updateScreen();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentShapeFirstBlockPos,
    maxPosition,
    allowReposition,
    pauseGame,
    allowLeft,
    allowRight,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pauseGame) {
        renderShape();
        if (maxPosition.bottom < 23) {
          for (
            let index = maxPosition.left;
            index <= maxPosition.right;
            index++
          ) {
            if (grid[maxPosition.bottom + 1][index] === "o")
              setBottomBump(true);
          }
          currentShapeFirstBlockPos.forEach((value) => {
            if (maxPosition.bottom < 23 && !bottomBump) {
              removeShape();
              value.y++;
              drawShapeGrid(currentShape, false, value.x, value.y);
            } else {
              updateGrid();
              checkLoseCondition();
              blowLine();
              setDeadBlocksList([
                ...deadBlocksList,
                { currentShapePos, currentColor },
              ]);
              drawShapeGrid(
                shapes[Math.floor(Math.random() * shapes.length)],
                true,
                0,
                0
              );
              setBottomBump(false);
              renderShape();
            }
          });
          updateScreen();
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, [pauseGame, maxPosition, currentShapeFirstBlockPos, bottomBump]);

  const updateGrid = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => (cell === "x" ? "o" : cell))
    );
    const newColorGrid = grid.map((row, y) =>
      row.map((cell, x) => (cell === "x" ? currentColor : colorGrid[y][x]))
    );
    setGrid(newGrid);
    setColorGrid(newColorGrid);
  };

  const checkLoseCondition = () => {
    for (let checkBlockHeight = 0; checkBlockHeight < 10; checkBlockHeight++) {
      if (grid[3][checkBlockHeight] === "o") {
        setPauseGame(true);
        console.log("lose");
      }
    }
  };

  const blowLine = () => {
    const newGrid = [...grid];
    const newColorGrid = [...colorGrid];
    for (let y = 23; y > 0; y--) {
      let isFullLine = true;
      for (let x = 0; x < 10; x++) {
        if (newGrid[y][x] === "") {
          isFullLine = false;
          break;
        }
      }
      if (isFullLine) {
        for (let lineIndex = y; lineIndex > 0; lineIndex--) {
          newGrid[lineIndex] = [...newGrid[lineIndex - 1]];
          newColorGrid[lineIndex] = [...newColorGrid[lineIndex - 1]];
        }
        newGrid[0] = Array(10).fill("");
        newColorGrid[0] = Array(10).fill("");
      }
    }
    setGrid(newGrid);
    setColorGrid(newColorGrid);
  };

  const renderShape = () => {
    const positionsX = [];
    const positionsY = [];
    const newShapePos = [];
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === "x") {
          positionsX.push(x);
          positionsY.push(y);
          newShapePos.push({ x, y });
        }
      });
    });
    setCurrentShapePos(newShapePos);
    getMaxPos(positionsX, positionsY);
  };

  const getMaxPos = (positionsX, positionsY) => {
    const maxX = Math.max(...positionsX);
    const minX = Math.min(...positionsX);
    const maxY = Math.max(...positionsY);
    setMaxPosition({
      left: minX,
      right: maxX,
      top: positionsY[0],
      bottom: maxY,
    });
  };

  const updateScreen = () => {
    setAllowReposition(true);
  };

  const removeShape = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => (cell === "x" ? "" : cell))
    );
    setGrid(newGrid);
  };

  const drawShapeGrid = (shape, defaultPos, x, y) => {
    setCurrentShape(shape);
    let newGrid = [...grid];
    if (defaultPos) {
      x = 4;
      y = 0;
      setCurrentColor(colorList[Math.floor(Math.random() * colorList.length)]);
    }
    switch (shape) {
      case "I":
        setCurrentShapeFirstBlockPos([{ x, y }]);
        for (let i = y; i < y + 4; i++) {
          newGrid[i][x] = "x";
        }
        break;
      case "O":
        setCurrentShapeFirstBlockPos([{ x, y }]);
        for (let i = y; i < y + 2; i++) {
          for (let j = x; j < x + 2; j++) {
            newGrid[i][j] = "x";
          }
        }
        break;
      case "L":
        setCurrentShapeFirstBlockPos([{ x, y }]);
        for (let i = y; i < y + 3; i++) {
          newGrid[i][x] = "x";
        }
        for (let j = x; j < x + 2; j++) {
          newGrid[y + 2][j] = "x";
        }
        break;
      // Add cases for other shapes
    }
    setGrid(newGrid);
  };

  return (
    <div className="flex">
      <div className="main-container flex flex-col">
        <div className="game-container">
          {grid.slice(4).map((row, y) => (
            <div key={y} className="game-row">
              {row.map((cell, x) => (
                <div
                  key={x}
                  className="game-block"
                  style={{
                    backgroundColor: cell === "" ? "" : colorGrid[y][x],
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="next-block">
        <div className="next-title-bg">
          <p className="next-title">QUEUE</p>
        </div>
        <div className="next-block-queue"></div>
      </div>
    </div>
  );
}
