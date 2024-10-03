import React, { useEffect, useState } from "react";

export default function Sudoku() {
  const [blockData, setBlockData] = useState([]);

  const initializeBlockData = () => {
    const newBlockData = [];
    for (let index = 0; index < 9; index++) {
      newBlockData.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    setBlockData(newBlockData);
    generateSudoku();
  };

  const checkX = (block, blockItem, data) => {
    let match = false;

    for (let index = 1; index < 9 + 1; index++) {
      if (match) match = false;
      for (let blockItemCheck = 0; blockItemCheck < 3; blockItemCheck++) {
        if (match) break;
        for (
          let blockItemValueCheck = 0;
          blockItemValueCheck < 3;
          blockItemValueCheck++
        ) {
          if (block.items[blockItemCheck][blockItemValueCheck] != index) {
            block.items[blockItemCheck][blockItemValueCheck] = index;
            match = true;
            break;
          }
        }
      }
    }
  };

  const generateSudoku = () => {
    console.log("generating sudoku...");
    setBlockData((prevBlockData) => {
      const newBlockData = [...prevBlockData];

      let x = 0,
        y = 0;

      // console.log("continue sudoku...");
      for (let index = 0; index < newBlockData.length; index++) {
        let legalNumber = 0;
        let foundNumber = false;

        if (index < 3) y = 0;
        else if (index < 6) y = 1;
        else y = 2;

        if (index % 3 === 0) x = 0;
        else if (index % 3 === 1) x = 1;
        else x = 2;
        console.log("x: " + x + ", y: " + y);

        for (let chosenNumber = 1; chosenNumber < 9 + 1; chosenNumber++) {
          for (
            let checkChosenNumberIndex = 0;
            checkChosenNumberIndex < newBlockData[index].length;
            checkChosenNumberIndex++
          ) {
            if (newBlockData[index][checkChosenNumberIndex] === chosenNumber) {
              foundNumber = true;
              break;
            }
          }

          for (let checkX = y; checkX < y + 2; checkX++) {
            for (let block = 0; block < 3; block++) {
              if (newBlockData[checkX][block] === chosenNumber) {
                foundNumber = true;
                break;
              }
            }
          }

          if (!foundNumber) {
            legalNumber = chosenNumber;
          }

          for (
            let checkChosenNumberIndex = 0;
            checkChosenNumberIndex < newBlockData[index].length;
            checkChosenNumberIndex++
          ) {
            if (newBlockData[index][checkChosenNumberIndex] === 0) {
              newBlockData[index][checkChosenNumberIndex] = legalNumber;
              break;
            }
          }
        }
      }

      return newBlockData;
    });

    // newBlockData.forEach((block) => {
    //   block.items.forEach((blockItem) => {
    //     blockItem.forEach((value) => {
    //       if (value === 0) {
    //         checkX(block, blockItem, newBlockData);
    //       }
    //     });
    //   });
    // });
  };

  useEffect(() => {
    if (blockData.length === 0) {
      initializeBlockData();
    }
  }, []);

  const renderBlocks = () => {
    return blockData.map((value, valueIndex) => (
      <div className="flex w-full h-full" key={valueIndex}>
        <div
          className="grid grid-cols-3 grid-rows-3 h-full w-full"
          key={valueIndex}
          style={{
            backgroundColor: valueIndex % 2 === 0 ? "white" : "#DDEEEE",
          }}
        >
          {value.map((itemValue, itemIndex) => (
            <div className="flex  h-full w-full" key={itemIndex}>
              <span
                key={itemIndex}
                className="flex justify-center items-center w-full h-full border-2 border-zinc-100 text-3xl font-thin"
              >
                {itemValue}
              </span>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-black w-5/6 h-5/6 flex justify-center items-center rounded-xl">
      <div className="bg-white w-[99%] h-[99%] justify-center items-center rounded-lg grid grid-cols-3">
        {renderBlocks()}
      </div>
    </div>
  );
}
