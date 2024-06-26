import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { projectData } from "../../scripts/data";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import Footer from "../Footer/Footer";

export default function ProjectDetailedPage() {
  const { id } = useParams();

  document.title = "Harun Spaho`s Portfolio";
  const location = useLocation();
  let project = projectData[id];
  location.state != null && ({ project } = location.state);
  const [screenWidth, setScreenWidth] = useState(screen.width);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
    return () => window.removeEventListener("resize", setScreenWidth);
  }, [screenWidth]);

  const renderProductDetails = (isOnMobile) => {
    return !isOnMobile
      ? project.details.map((value, valueIndex) => (
          <div className="mb-32 bg-[#272727]">
            <div
              className="flex flex-row w-full h-max"
              style={{
                alignItems: value.text == "" ? "center" : "start",
              }}
              key={valueIndex}
            >
              {valueIndex % 2 == 0 && (
                <img src={value.img} className="w-[400px] h-full" />
              )}
              <div
                className="flex flex-col h-full w-full mt-0 mx-10"
                style={{
                  alignItems: valueIndex % 2 == 0 ? "" : "flex-end",
                }}
              >
                <p className="text-[3vw]">{value.title}</p>
                <p className="text-justify">{value.text}</p>
              </div>
              {valueIndex % 2 != 0 && (
                <img src={value.img} className="w-[400px] h-full" />
              )}
            </div>
            <div className="w-full h-1 bg-rose-700"></div>
          </div>
        ))
      : project.details.map((value, valueIndex) => (
          <div
            className="flex flex-col md:flex-row mb-32 w-full h-max justify-center items-center"
            key={valueIndex}
          >
            {isOnMobile && <img src={value.img} className="w-[400px] h-full" />}
            <div className="flex flex-col h-full w-full mt-5 md:mt-0 mx-0 md:mx-10 gap-2 md:gap-0">
              <p className="text-[8vw] self-center  md:self-start md:text-[3vw] text-center">
                {value.title}
              </p>
              <p className="text-justify">{value.text}</p>
            </div>
          </div>
        ));
  };
  /*
	            
	*/
  window.scrollTo(0, 0);
  return (
    <div className="select-none">
      <div className="hidden md:block ">
        <NavigationBar />
      </div>
      <div className="block md:hidden">
        <NavigationBarMobile />
      </div>
      <div className="flex w-full h-full pt-44 text-white  font-semibold">
        <div className="mx-auto my-0 w-3/4 h-max">
          <div className="flex-col flex">
            {renderProductDetails(screenWidth <= 900)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
