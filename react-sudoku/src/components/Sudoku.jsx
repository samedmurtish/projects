import React, { useEffect, useState } from "react";

export default function Sudoku() {
  const [blockData, setBlockData] = useState([]);

  const newBlockData = [];

  const generateBlockNumbers = () => {
    let newBlockNumbersData = blockData;
  };

  useEffect(() => {
    if (newBlockData[length] == null) {
      setBlockData([]);
      for (let index = 0; index < 9; index++) {
        newBlockData.push({
          items: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ],
        });
      }

      setBlockData((prev) => [...prev, ...newBlockData]);
    }
  }, []);

  const renderBlocks = () => {
    return blockData.map((value, valueIndex) => (
      <div className="flex w-full h-full" key={valueIndex}>
        <div
          className="w-full h-full flex flex-col justify-between"
          key={valueIndex}
          style={{
            backgroundColor: valueIndex % 2 === 0 ? "white" : "#DDEEEE",
          }}
        >
          {value.items.map((itemValue, itemIndex) => (
            <div className="flex justify-between h-full w-full" key={itemIndex}>
              {itemValue.map((item, index) => (
                <span
                  key={index}
                  className="flex justify-center items-center w-full h-full border-2 border-zinc-100 text-3xl font-thin"
                >
                  {item}
                </span>
              ))}
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
        {generateBlockNumbers()}
      </div>
    </div>
  );
}
