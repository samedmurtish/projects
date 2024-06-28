import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { navigations } from "./Navigations";

export default function NavigationBarMobile() {
  const [menuOpened, setMenuOpened] = useState(false);

  const renderNav = () => {
    return navigations.map((value, valueIndex) => (
      <Link
        to={`/${value.route}`}
        key={valueIndex}
        className="flex justify-center items-center px-5 pb-2"
      >
        <div className="p-3 border-b-2 border-b-transparent hover:border-b-white border-b-[#0a2e5e] cursor-pointer w-full transition hover:bg-[#082449] bg-[#071d3a] active:bg-[#082449] flex justify-center rounded-lg">
          <p>{value.name}</p>
        </div>
      </Link>
    ));
  };

  return (
    <>
      <div className="bg-[#061d3a] fixed w-full z-[99999]">
        <div className="flex justify-between items-center text-white font-semibold py-5 text-xl mx-auto my-0 w-3/4 ">
          <Link className="py-3" to="/">
            Samed Murtish
          </Link>
          <div
            className="rounded-full bg-[#05162c] hover:bg-[#05162c] p-2 cursor-pointer"
            onClick={() => setMenuOpened(!menuOpened)}
          >
            <HiOutlineMenu />
          </div>
        </div>

        {menuOpened && (
          <div className="h-screen w-2/5 bg-[#05162c] fixed right-0 text-white">
            <div className="font-semibold py-3">{renderNav()}</div>
          </div>
        )}
      </div>
    </>
  );
}
