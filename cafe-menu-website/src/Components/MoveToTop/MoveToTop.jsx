import React, { useEffect, useState } from "react";

import { FaArrowUp } from "react-icons/fa";

export default function MoveToTop() {
  const [show, setShow] = useState(window.scrollY > 10);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {show && (
        <a
          className="bg-[#05A981] text-white text-4xl shadow-2xl w-20 h-20 rounded-full fixed bottom-0 right-0 z-[999999999999] flex justify-center items-center m-5 cursor-pointer"
          href="#start"
        >
          <FaArrowUp />
        </a>
      )}
    </>
  );
}
