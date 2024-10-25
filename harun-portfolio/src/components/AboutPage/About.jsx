import React from "react";
import photo from "../../assets/me.jpg";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";

export default function Content() {
  document.title = "Harun Spaho`s Portfolio";
  return (
    <div className="select-none">
      <div className="hidden md:block ">
        <NavigationBar />
      </div>
      <div className="block md:hidden">
        <NavigationBarMobile />
      </div>
      <div className="h-full w-full text-white font-semibold pt-20">
        <div className="mx-auto my-0 w-3/4">
          <div className="flex w-full h-full ">
            <div className="flex flex-col md:flex-row items-center ml-0 mt-20">
              <img
                src={photo}
                className="w-4/5 md:w-[35%] h-max rounded-3xl shadow-xl"
              />
              <div className="my-20 md:ml-36 md:my-0 overflow-hidden text-wrap text-ellipsis truncate bg-[#AB012F] p-6 rounded-3xl cursor-help">
                <p className="text-[3vw] font-bold pb-6 flex ">
                  <span id="about-easter-egg" className="pr-3">
                    About{" "}
                  </span>{" "}
                  me{" "}
                  <span className="text-transparent pl-3" id="easteregg">
                    (Harun Spaho)
                  </span>
                </p>
                <div className="w-full h-1 bg-[#212121]"></div>
                <p className="font-thin text-[1.5vw] h-max bg-[#950129] p-5 rounded-b-xl text-justify ">
                  I am <span className="font-bold">Harun Spaho </span>from the
                  small town of <span className="font-normal">Struga</span> in{" "}
                  <span className="font-normal">North Macedonia</span>. I am
                  currently studying in the{" "}
                  <span className="font-normal">Graphic Design</span> department
                  at{" "}
                  <span className="font-normal">
                    International Balkan University
                  </span>
                  . <br />
                  <br /> When I work on my projects, I{" "}
                  <span className="font-normal">give my all</span> I want them
                  to be perfect down to the{" "}
                  <span className="font-normal">smallest pixel</span>. I
                  consistently finish assignments on time, sometimes even{" "}
                  <span className="font-normal">earlier</span>. I`m always eager
                  to create something <span className="font-normal">new</span>{" "}
                  and <span className="font-normal">fun</span>, and I can work
                  in a variety of different styles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
