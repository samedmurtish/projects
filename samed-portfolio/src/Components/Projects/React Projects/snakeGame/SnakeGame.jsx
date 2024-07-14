import React, { useRef, useEffect } from "react";
import "../global/default.css";
import "./styles/main.css";
import apple from "./sources/apple.png";

const SnakeGame = () => {
  const gameContainerRef = useRef(null);
  const gameInfoRef = useRef(null);
  const gamePausePanelRef = useRef(null);
  const gamePausePanelTextRef = useRef(null);

  let isGameFinished = false;
  let snakeSpeed = 180;
  let snakeDirection = "";
  let snakePosition = { x: 4, y: 4 };
  let snakeBody = [];
  let foodPosition = { x: 0, y: 0 };
  let snakeLength = 0;
  let snakeLengthCounter = 0;
  let checkIllegalTurn = false;

  let gameGrid = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  ];

  for (let index = 0; index < snakeLength; index++) {
    snakeBody.push({ x: snakePosition.x, y: snakePosition.y });
  }
  foodGenerator();
  updateScreen();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!checkIllegalTurn && !isGameFinished) {
        switch (event.key) {
          case "w":
          case "ArrowUp":
            if (snakeDirection !== "down") {
              snakeDirection = "up";
              checkIllegalTurn = true;
            }
            break;
          case "a":
          case "ArrowLeft":
            if (snakeDirection !== "right") {
              snakeDirection = "left";
              checkIllegalTurn = true;
            }
            break;
          case "s":
          case "ArrowDown":
            if (snakeDirection !== "up") {
              snakeDirection = "down";
              checkIllegalTurn = true;
            }
            break;
          case "d":
          case "ArrowRight":
            if (snakeDirection !== "left") {
              snakeDirection = "right";
              checkIllegalTurn = true;
            }
            break;
          default:
            snakeDirection = "";
            break;
        }
      }
      if (isGameFinished) {
        snakePosition.x = 4;
        snakePosition.y = 4;
        snakeDirection = "";
        snakeLength = 0;
        snakeLengthCounter = 0;
        checkIllegalTurn = false;
        isGameFinished = false;
        snakeSpeed = 180;
        updateGrid();
        updateScreen();
        gamePausePanelRef.current.classList.add("hide");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameFinished, snakeDirection]);

  useEffect(() => {
    updateScreen();
    console.log("updated");
  }, []);

  function updateGrid() {
    gameGrid = [
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ];
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (snakePosition.x === x && snakePosition.y === y) {
          gameGrid[y][x] = "p";
        } else if (foodPosition.x === x && foodPosition.y === y) {
          gameGrid[y][x] = "f";
        } else if (snakeLength > 0) {
          for (let snakeIndex = 0; snakeIndex < snakeLength; snakeIndex++) {
            if (
              snakeBody[snakeIndex].x === x &&
              snakeBody[snakeIndex].y === y
            ) {
              gameGrid[y][x] = "b";
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (snakeDirection !== "") {
        checkIllegalTurn = false;
        for (let snakeIndex = snakeLength - 1; snakeIndex > 0; snakeIndex--) {
          snakeBody[snakeIndex].x = snakeBody[snakeIndex - 1].x;
          snakeBody[snakeIndex].y = snakeBody[snakeIndex - 1].y;
        }
        if (snakeLength > 0) {
          snakeBody[0].x = snakePosition.x;
          snakeBody[0].y = snakePosition.y;
        }

        switch (snakeDirection) {
          case "up":
            snakePosition.y = (snakePosition.y - 1 + 9) % 9;
            break;
          case "down":
            snakePosition.y = (snakePosition.y + 1) % 9;
            break;
          case "left":
            snakePosition.x = (snakePosition.x - 1 + 9) % 9;
            break;
          case "right":
            snakePosition.x = (snakePosition.x + 1) % 9;
            break;
          default:
            break;
        }

        updateGrid();
        updateScreen();
      }
    }, snakeSpeed);

    return () => clearInterval(interval);
  }, [snakeDirection, snakeSpeed]);

  function foodGenerator() {
    foodPosition = {
      x: Math.floor(Math.random() * 9),
      y: Math.floor(Math.random() * 9),
    };
    for (let snakeIndex = 0; snakeIndex < snakeLength; snakeIndex++) {
      if (
        (snakeBody[snakeIndex].x === foodPosition.x &&
          snakeBody[snakeIndex].y === foodPosition.y) ||
        (snakePosition.x === foodPosition.x &&
          snakePosition.y === foodPosition.y)
      ) {
        foodGenerator();
      }
    }
  }

  function finishGame(text) {
    isGameFinished = true;
    snakeDirection = "";
    gamePausePanelRef.current.classList.remove("hide");
    gamePausePanelTextRef.current.innerHTML = text;
  }

  function updateScreen() {
    if (gameContainerRef.current && gameInfoRef.current) {
      gameContainerRef.current.innerHTML = "";
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (snakePosition.x === x && snakePosition.y === y) {
            for (let snakeIndex = 0; snakeIndex < snakeLength; snakeIndex++) {
              if (
                snakeBody[snakeIndex].x === snakePosition.x &&
                snakeBody[snakeIndex].y === snakePosition.y &&
                snakeDirection !== ""
              ) {
                finishGame("You Lost !<br>Press any key to start over.");
              }
            }
            if (foodPosition.x === x && foodPosition.y === y) {
              snakeLength++;
              if (snakeLength === 81) {
                finishGame("You Won !<br>Press any key to start over.");
                break;
              }
              snakeLengthCounter++;
              if (snakeLengthCounter === 5) {
                if (snakeSpeed !== 0) {
                  snakeLengthCounter = 0;
                  snakeSpeed -= 10;
                }
              }
              gameGrid[y][x] = " ";
              snakeBody.push({ x: snakePosition.x, y: snakePosition.y });
              foodGenerator();
            }
            gameContainerRef.current.innerHTML += `<div class="game-square square-text snake js-snake"></div>`;

            if (snakeDirection != "") {
              let snake = document.querySelector(".js-snake");

              if (snakeDirection == "up") snake.style.rotate += 180 + "deg";
              else if (snakeDirection == "down")
                snake.style.rotate += 0 + "deg";
              else if (snakeDirection == "left")
                snake.style.rotate += 90 + "deg";
              else if (snakeDirection == "right")
                snake.style.rotate += 270 + "deg";
            }
          } else if (gameGrid[y][x] === " ") {
            gameContainerRef.current.innerHTML += `<div class="game-square square-text">${gameGrid[y][x]}</div>`;
          } else if (gameGrid[y][x] === "f") {
            gameContainerRef.current.innerHTML += `<div class="game-square square-text"><img width="65%" src="${apple}"></div></div>`;
          } else if (gameGrid[y][x] === "b") {
            gameContainerRef.current.innerHTML += `<div class="game-square square-text snakeBody"></div>`;
          }
        }
      }
      gameInfoRef.current.innerHTML =
        "length: " + `<span style="color: #7af07a">` + snakeLength + `</span>`;
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="main-container w-full h-full">
        <div ref={gamePausePanelRef} className="game-paused hide">
          <div ref={gamePausePanelTextRef} className="game-paused-text"></div>
        </div>
        <div ref={gameInfoRef} className="game-info"></div>
        <div className="game-bg w-full h-full">
          <div
            ref={gameContainerRef}
            className="h-full grid grid-rows-9 grid-cols-9"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
