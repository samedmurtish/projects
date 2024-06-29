import React from "react";
import { useLocation } from "react-router-dom";

export default function Tetris() {
  const gameContainer = document.querySelector(".game-container");

  const data = useLocation();

  console.log(data);

  let grid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];

  let colorGrid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];

  let maxPosition = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  let shapes = ["I", "L", "O"];

  let currentShapeFirstBlockPos = [];

  let currentShapePos = [];

  let pauseGame = false;

  let direction = "";

  let allowReposition = true,
    allowX = true,
    allowMaxCheck = false,
    allowDownBoost = true;

  let bottomBump = false;

  let currentShape = "";

  let positionWidthContainer = [],
    positionHeightContainer = [];

  let colorList = [
      "#CC99C9",
      "#9EC1CF",
      "#9EE09E",
      "#FDFD97",
      "#FEB144",
      "#FF6663",
    ],
    currentColor;

  let deadBlocksList = [];
  window.addEventListener("click", () => {
    pauseGame = !pauseGame;
  });

  let allowLeft = true,
    tempAllowLeft = true,
    allowRight = true,
    tempAllowRight = true;

  window.addEventListener("keypress", () => {
    if (event.key == "s" || event.key == "ArrowDown") {
      if (allowDownBoost) {
        let tempY = maxPosition.bottom;
        currentShapeFirstBlockPos.forEach((value) => {
          while (tempY + 1 < 22 && grid[tempY + 2][value.x] != "o") {
            if (tempY + 1 > 22 || grid[tempY + 1][value.x] == "o") {
              tempY = maxPosition.bottom;
              break;
            }
            tempY++;
          }
          removeShape();
          value.y = tempY - 3;
          updateScreen();
        });
        allowDownBoost = false;
      }
    }
  });
  window.addEventListener("keydown", () => {
    renderShape();

    currentShapePos.forEach((value) => {
      if (grid[value.y][value.x - 1] == "o") tempAllowLeft = false;
      if (grid[value.y][value.x + 1] == "o") tempAllowRight = false;

      if (!tempAllowLeft) allowLeft = false;
      if (!tempAllowRight) allowRight = false;
    });

    if (allowReposition && !pauseGame) {
      if (
        event.key == "a" ||
        event.key == "d" ||
        event.key == "ArrowRight" ||
        event.key == "ArrowLeft"
      ) {
        removeShape();
      }
      if (event.key == "ArrowLeft" || event.key == "a") {
        direction = "left";

        if (maxPosition.left > 0 && allowLeft) {
          currentShapeFirstBlockPos[0].x--;
        }

        direction = "";

        allowLeft = true;
        tempAllowLeft = true;
      } else if (event.key == "ArrowRight" || event.key == "d") {
        direction = "right";

        if (maxPosition.right < 9 && allowRight) {
          currentShapeFirstBlockPos[0].x++;
        }

        direction = "";
        allowRight = true;
        tempAllowRight = true;
      }
      currentShapeFirstBlockPos.forEach((value) => {
        drawShapeGrid(currentShape, false, value.x, value.y);
      });
      updateScreen();
    }
  });

  //drawShapeGrid(shapes[Math.floor(Math.random() * shapes.length)], true, 0, 0);
  drawShapeGrid("I", true, 0, 0);

  setInterval(() => {
    if (!pauseGame) {
      renderShape();

      if (maxPosition.bottom < 23)
        for (
          let index = maxPosition.left;
          index < maxPosition.right + 1;
          index++
        )
          if (grid[maxPosition.bottom + 1][index] == "o") bottomBump = true;

      currentShapeFirstBlockPos.forEach((value) => {
        if (maxPosition.bottom < 23 && !bottomBump) {
          removeShape();
          value.y++;
          drawShapeGrid(currentShape, false, value.x, value.y);
          maxPosition.top++;
        } else {
          for (let y = 0; y < 24; y++) {
            for (let x = 0; x < 10; x++) {
              if (grid[y][x] == "x") {
                grid[y][x] = "o";
                colorGrid[y][x] = currentColor;
              }
            }
          }
          for (
            let checkBlockHeight = 0;
            checkBlockHeight < 10;
            checkBlockHeight++
          ) {
            if (grid[3][checkBlockHeight] == "o") {
              pauseGame = true;
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

          deadBlocksList.push({ currentShapePos, currentColor });

          drawShapeGrid(
            shapes[Math.floor(Math.random() * shapes.length)],
            true,
            0,
            0
          );
          //drawShapeGrid('I', true, 0, 0);
          bottomBump = false;
          renderShape();
          maxPosition.top = 0;

          allowDownBoost = true;
        }
      });
      updateScreen();
    }
  }, 300);

  function blowLine() {
    let line = -1;

    let checker = false;
    let lineList = [],
      tempLineList = [];

    for (let y = 23; y > 0; y--) {
      for (let x = 0; x < 10; x++) {
        if (checker) continue;
        if (grid[y][x] == "") checker = true;
        else if (grid[y][x] == "o") {
          checker = false;
          line = y;
          tempLineList.push(line);
        }
      }
      if (!checker) {
        for (let index = 0; index < tempLineList.length - 1; index++) {
          if (tempLineList[index] == tempLineList[index + 1])
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
  }

  function renderShape() {
    currentShapePos.splice(0, currentShapePos.length);
    positionWidthContainer.splice(0, positionWidthContainer.length);
    positionHeightContainer.splice(0, positionHeightContainer.length);
    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 10; x++) {
        if (grid[y][x] == "x") {
          positionHeightContainer.push(y);
          positionWidthContainer.push(x);
          currentShapePos.push({
            x: x,
            y: y,
          });
        }
      }
    }
    getMaxPos(positionWidthContainer, positionHeightContainer);
  }

  function getMaxPos(positionsX, positionsY) {
    for (let x = 0; x < positionsX.length; x++) {
      for (let y = 0; y < positionsX.length; y++) {
        if (positionsX[x] != positionsX[y] || currentShape == "I") {
          if (positionsX[x] > positionsX[y]) maxPosition.right = positionsX[x];
          else if (positionsX[x] < positionsX[y])
            maxPosition.left = positionsX[x];
          else if (positionsX[x] == positionsX[y]) {
            maxPosition.right = positionsX[x];
            maxPosition.left = positionsX[x];
          }
        }
      }
    }

    for (let x = 0; x < positionsY.length; x++) {
      for (let y = 0; y < positionsY.length; y++) {
        if (positionsY[x] > positionsY[y]) maxPosition.bottom = positionsY[x];
      }
    }
  }

  function updateScreen() {
    allowReposition = true;
    gameContainer.innerHTML = "";
    for (let y = 4; y < 24; y++) {
      for (let x = 0; x < 10; x++) {
        if (grid[y][x] == "") {
          gameContainer.innerHTML += '<div class="game-block"></div>';
        } else if (grid[y][x] == "x") {
          gameContainer.innerHTML += `<div class="game-block" style="background-color: ${currentColor};"></div>`;
        } else if (grid[y][x] != "x" && grid[y][x] != "") {
          gameContainer.innerHTML += `<div class="game-block" style="background-color: ${colorGrid[y][x]}"></div>`;
        }
      }
    }
  }

  function rotateShape() {}

  function removeShape() {
    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 10; x++) {
        if (grid[y][x] == "x") grid[y][x] = "";
      }
    }
  }

  function drawShapeGrid(shape, defaultPos, x, y) {
    currentShape = shape;
    if (defaultPos) {
      x = 4;
      y = 0;

      currentColor = colorList[Math.floor(Math.random() * colorList.length)];
    }

    switch (shape) {
      case "I":
        currentShapeFirstBlockPos.splice(0, 4);
        for (let yPos = y; yPos < y + 1; yPos++) {
          for (let blockQuantity = y; blockQuantity < y + 4; blockQuantity++) {
            grid[blockQuantity][x] = "x";
          }
          currentShapeFirstBlockPos.push({
            x: x,
            y: y,
          });
        }
        break;
      case "O":
        currentShapeFirstBlockPos.splice(0, 4);
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
              grid[blockQuantityY][blockQuantityX] = "x";
            }
          }
          currentShapeFirstBlockPos.push({
            x: x,
            y: y,
          });
        }
        break;
      case "L":
        currentShapeFirstBlockPos.splice(0, 4);
        for (let yPos = y; yPos < y + 1; yPos++) {
          for (
            let blockQuantityY = y;
            blockQuantityY < y + 3;
            blockQuantityY++
          ) {
            grid[blockQuantityY][x] = "x";
          }
          for (
            let blockQuantityX = x;
            blockQuantityX < x + 2;
            blockQuantityX++
          ) {
            grid[y + 2][blockQuantityX] = "x";
          }
          currentShapeFirstBlockPos.push({
            x: x,
            y: y,
          });
        }
        break;
      case "T":
        break;
      case "J":
        break;
      case "Z":
        break;
      case "ZZ":
        break;
    }
  }

  return (
    <>
      <div class="main-container">
        <div class="game-container"></div>
      </div>
      <div class="next-block">
        <div class="next-title-bg">
          <p class="next-title">QUEUE</p>
        </div>
        <div class="next-block-queue"></div>
      </div>
    </>
  );
}
