import React, { useEffect, useState } from "react";

export default function Footer({ setBottom }) {
  const currentDate = new Date();

  const [date, setDate] = useState(currentDate.getFullYear());

  useEffect(() => {
    setDate(currentDate.getFullYear());
  }, [currentDate.getFullYear()]);

  document.title = "Harun Spaho`s Portfolio";
  return (
    <div className={`bg-[#AB012F] w-full h-[130px] py-1 md:h-[70px]`}>
      <div className="select-none  text-white flex flex-col md:flex-row p-2 text-center md:text-pretty justify-between items-center w-[60%] md:w-3/4 h-full mx-auto my-0">
        <div>
          <b className="font-extrabold"></b>©<b> Harun Spaho</b>'s Portfolio,{" "}
          {date}. <b>All rights reserved</b>
        </div>
        <div className="flex justify-center items-center">
          Made with <b className="px-1">love</b> by{" "}
          <a
            href="https://samedmurtish.xyz/"
            target="_blank"
            className="flex justify-center items-center"
            id="main-link"
          >
            <span
              className="ml-3 p-1 px-3 text-rose-400 underline hover:text-rose-400 transition font-extrabold rounded-full bg-[#850023] hover:bg-[#72001e]"
              id="label-name"
            >
              smd
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
