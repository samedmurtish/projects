import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { projectData } from "../../scripts/data";
import NavigationBar from "../NavigationBar";
import { useScrollTrigger } from "@mui/material";

export default function ProjectDetailedPage() {
  const { id } = useParams();

  console.log(id);

  const location = useLocation();
  let project = projectData[id];
  location.state != null && ({ project } = location.state);

  const [detailLeft, setDetailLeft] = useState(true);

  const renderProductDetails = () => {
    return project.details.map((value, valueIndex) => (
      <div
        className="w-max justify-self-start self-start flex flex-row mb-32"
        key={valueIndex}
      >
        {valueIndex % 2 == 0 && (
          <img src={value.img} className="w-[400px] h-full mx-20" />
        )}
        <div
          className="flex flex-col"
          style={{ alignItems: valueIndex % 2 == 0 ? "" : "flex-end" }}
        >
          <p className="text-[3vw]">{value.title}</p>
          <p className="w-1/2">{value.text}</p>
        </div>
        {Math.abs(valueIndex % 2) === 1 && (
          <img src={value.img} className="w-[400px] h-full mx-20" />
        )}
      </div>
    ));
  };
  /*
	            
	*/
  window.scrollTo(0, 0);
  return (
    <div>
      <NavigationBar />
      <div className="flex w-full h-screen pt-44 text-white  font-semibold">
        <div className="mx-auto my-0 w-3/4 h-max">
          <div className="flex items-center flex-wrap">
            {renderProductDetails()}
          </div>
        </div>
      </div>
    </div>
  );
}
