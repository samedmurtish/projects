import React, { useState, useEffect, useCallback } from "react";
import "../global/default.css";
import "./styles/main.css";

export default function TetrisGame() {
  const gridTemplate = Array(24).fill(Array(10).fill(""));
  const colorGridTemplate = Array(24).fill(Array(10).fill(""));
  const shapes = ["I", "L", "O"];
  const colorList = [
    "#CC99C9",
    "#9EC1CF",
    "#9EE09E",
    "#FDFD97",
    "#FEB144",
    "#FF6663",
  ];

  const [grid, setGrid] = useState(gridTemplate);
  const [colorGrid, setColorGrid] = useState(colorGridTemplate);
  const [maxPosition, setMaxPosition] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const [currentShapeFirstBlockPos, setCurrentShapeFirstBlockPos] = useState(
    []
  );
  const [currentShapePos, setCurrentShapePos] = useState([]);
  const [pauseGame, setPauseGame] = useState(false);
  const [direction, setDirection] = useState("");
  const [allowReposition, setAllowReposition] = useState(true);
  const [allowX, setAllowX] = useState(true);
  const [allowMaxCheck, setAllowMaxCheck] = useState(false);
  const [allowDownBoost, setAllowDownBoost] = useState(true);
  const [bottomBump, setBottomBump] = useState(false);
  const [currentShape, setCurrentShape] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [deadBlocksList, setDeadBlocksList] = useState([]);
  const [allowLeft, setAllowLeft] = useState(true);
  const [tempAllowLeft, setTempAllowLeft] = useState(true);
  const [allowRight, setAllowRight] = useState(true);
  const [tempAllowRight, setTempAllowRight] = useState(true);
  const [shapeQueue, setShapeQueue] = useState([]);

  const updateScreen = () => {
    setAllowReposition(true);
  };

  const removeShape = useCallback(() => {
    setGrid((prevGrid) =>
      prevGrid.map((row) => row.map((cell) => (cell === "x" ? "" : cell)))
    );
  }, []);

  const renderShape = useCallback(() => {
    let newShapePos = [];
    let positionWidthContainer = [];
    let positionHeightContainer = [];
    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 10; x++) {
        if (grid[y][x] === "x") {
          positionHeightContainer.push(y);
          positionWidthContainer.push(x);
          newShapePos.push({ x, y });
        }
      }
    }
    getMaxPos(positionWidthContainer, positionHeightContainer);
    setCurrentShapePos(newShapePos);
  }, [grid]);

  const getMaxPos = (positionsX, positionsY) => {
    let newMaxPos = { left: 0, right: 0, top: 0, bottom: 0 };
    for (let x = 0; x < positionsX.length; x++) {
      for (let y = 0; y < positionsX.length; y++) {
        if (positionsX[x] !== positionsX[y] || currentShape === "I") {
          if (positionsX[x] > positionsX[y]) newMaxPos.right = positionsX[x];
          else if (positionsX[x] < positionsX[y])
            newMaxPos.left = positionsX[x];
          else if (positionsX[x] === positionsX[y]) {
            newMaxPos.right = positionsX[x];
            newMaxPos.left = positionsX[x];
          }
        }
      }
    }

    for (let x = 0; x < positionsY.length; x++) {
      for (let y = 0; y < positionsY.length; y++) {
        if (positionsY[x] > positionsY[y]) newMaxPos.bottom = positionsY[x];
      }
    }
    setMaxPosition(newMaxPos);
  };

  const blowLine = () => {
    let line = -1;
    let checker = false;
    let lineList = [];
    let tempLineList = [];

    for (let y = 23; y > 0; y--) {
      for (let x = 0; x < 10; x++) {
        if (checker) continue;
        if (grid[y][x] === "") checker = true;
        else if (grid[y][x] === "o") {
          checker = false;
          line = y;
          tempLineList.push(line);
        }
      }
      if (!checker) {
        for (let index = 0; index < tempLineList.length - 1; index++) {
          if (tempLineList[index] === tempLineList[index + 1])
            tempLineList.splice(0, index);
        }
        lineList.push(line);

        for (let lineIndex = 0; lineIndex < lineList.length; lineIndex++) {
          for (let y = line; y > 0; y--) {
            for (let x = 0; x < 10; x++) {
              grid[y][x] = grid[y - 1][x];
              colorGrid[y][x] = colorGrid[y - 1][x];
            }
          }
        }
        lineList.splice(0, lineList.length);
      }
      checker = false;
    }
  };

  const drawShapeGrid = (shape, defaultPos, x, y) => {
    setCurrentShape(shape);
    if (defaultPos) {
      x = 4;
      y = 0;
      setCurrentColor(colorList[Math.floor(Math.random() * colorList.length)]);
    }

    let newGrid = [...grid];
    let newCurrentShapeFirstBlockPos = [];

    switch (shape) {
      case "I":
        for (let yPos = y; yPos < y + 1; yPos++) {
          for (let blockQuantity = y; blockQuantity < y + 4; blockQuantity++) {
            newGrid[blockQuantity][x] = "x";
          }
          newCurrentShapeFirstBlockPos.push({ x, y });
        }
        break;
      case "O":
        for (let yPos = y; yPos < y + 1; yPos++) {
          for (
            let blockQuantityY = y;
            blockQuantityY < y + 2;
            blockQuantityY++
          ) {
            for (
              let blockQuantityX = x;
              blockQuantityX < x + 2;
              blockQuantityX++
            ) {
              newGrid[blockQuantityY][blockQuantityX] = "x";
            }
          }
          newCurrentShapeFirstBlockPos.push({ x, y });
        }
        break;
      case "L":
        for (let yPos = y; yPos < y + 1; yPos++) {
          for (
            let blockQuantityY = y;
            blockQuantityY < y + 3;
            blockQuantityY++
          ) {
            newGrid[blockQuantityY][x] = "x";
          }
          for (
            let blockQuantityX = x;
            blockQuantityX < x + 2;
            blockQuantityX++
          ) {
            newGrid[y + 2][blockQuantityX] = "x";
          }
          newCurrentShapeFirstBlockPos.push({ x, y });
        }
        break;
      case "T":
        // Implement shape 'T'
        break;
      case "J":
        // Implement shape 'J'
        break;
      case "Z":
        // Implement shape 'Z'
        break;
      case "ZZ":
        // Implement shape 'ZZ'
        break;
      default:
        break;
    }
    setGrid(newGrid);
    setCurrentShapeFirstBlockPos(newCurrentShapeFirstBlockPos);
  };

  const generateNewShape = () => {
    const newShape = shapes[Math.floor(Math.random() * shapes.length)];
    setShapeQueue((prevQueue) => [...prevQueue, newShape]);
  };

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      generateNewShape();
    }
    drawShapeGrid(shapeQueue[0], true, 0, 0);
  }, []);

  const nextShape = () => {
    setShapeQueue((prevQueue) => {
      const [next, ...rest] = prevQueue;
      drawShapeGrid(next, true, 0, 0);
      generateNewShape();
      return rest;
    });
  };

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
        if (grid[value.y][value.x - 1] === "o") setTempAllowLeft(false);
        if (grid[value.y][value.x + 1] === "o") setTempAllowRight(false);

        if (!tempAllowLeft) setAllowLeft(false);
        if (!tempAllowRight) setAllowRight(false);
      });

      if (allowReposition && !pauseGame) {
        if (
          event.key === "a" ||
          event.key === "d" ||
          event.key === "ArrowRight" ||
          event.key === "ArrowLeft"
        ) {
          removeShape();
        }
        if (event.key === "ArrowLeft" || event.key === "a") {
          setDirection("left");

          if (maxPosition.left > 0 && allowLeft) {
            currentShapeFirstBlockPos[0].x--;
          }

          setDirection("");
          setAllowLeft(true);
          setTempAllowLeft(true);
        } else if (event.key === "ArrowRight" || event.key === "d") {
          setDirection("right");

          if (maxPosition.right < 9 && allowRight) {
            currentShapeFirstBlockPos[0].x++;
          }

          setDirection("");
          setAllowRight(true);
          setTempAllowRight(true);
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
    allowDownBoost,
    allowReposition,
    currentShapeFirstBlockPos,
    currentShapePos,
    direction,
    grid,
    maxPosition,
    pauseGame,
    removeShape,
    renderShape,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(gridTemplate);
      if (!pauseGame) {
        renderShape();

        if (maxPosition.bottom < 23)
          for (
            let index = maxPosition.left;
            index < maxPosition.right + 1;
            index++
          )
            if (grid[maxPosition.bottom + 1][index] === "o")
              setBottomBump(true);

        currentShapeFirstBlockPos.forEach((value) => {
          if (maxPosition.bottom < 23 && !bottomBump) {
            removeShape();
            value.y++;
            drawShapeGrid(currentShape, false, value.x, value.y);
            setMaxPosition((prev) => ({ ...prev, top: prev.top + 1 }));
          } else {
            let newGrid = [...grid];
            let newColorGrid = [...colorGrid];
            for (let y = 0; y < 24; y++) {
              for (let x = 0; x < 10; x++) {
                if (newGrid[y][x] === "x") {
                  newGrid[y][x] = "o";
                  newColorGrid[y][x] = currentColor;
                }
              }
            }
            setGrid(newGrid);
            setColorGrid(newColorGrid);

            for (
              let checkBlockHeight = 0;
              checkBlockHeight < 10;
              checkBlockHeight++
            ) {
              if (newGrid[3][checkBlockHeight] === "o") {
                setPauseGame(true);
                console.log("lose");
              }
            }

            for (
              let maxHeight = 0;
              maxHeight < maxPosition.bottom - maxPosition.top + 1;
              maxHeight++
            ) {
              blowLine();
            }

            setDeadBlocksList([
              ...deadBlocksList,
              { currentShapePos, currentColor },
            ]);
            nextShape();
            setBottomBump(false);
            renderShape();
            setMaxPosition((prev) => ({ ...prev, top: 0 }));
            setAllowDownBoost(true);
          }
        });
        updateScreen();
      }
    }, 300);

    return () => clearInterval(interval);
  }, [
    bottomBump,
    currentShape,
    currentShapeFirstBlockPos,
    currentColor,
    deadBlocksList,
    grid,
    maxPosition,
    pauseGame,
    renderShape,
    updateScreen,
  ]);

  return (
    <div className="tetris-container">
      <div className="game-container">
        {grid.slice(4).map((row, rowIndex) => (
          <div key={rowIndex} className="game-row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="game-block"
                style={{ backgroundColor: cell === "x" ? currentColor : "" }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="queue-container">
        <h2 style={{ color: "#fff" }}>Next Shapes</h2>
        {shapeQueue.slice(1, 4).map((shape, index) => (
          <div key={index} className="queue-item">
            <p style={{ color: "#fff" }}>{shape}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
