import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import Footer from "../Footer/Footer";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../database/firebase";

export default function ProjectDetailedPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [projects, setProjects] = useState([]);
  const projectsRef = collection(database, "projects");

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await getDocs(projectsRef);
        const fetchedProjects = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProjects(fetchedProjects);

        const foundProject = fetchedProjects.find((proj) => proj.id === id);
        setProject(foundProject);
      } catch (error) {
        console.error(error);
      }
    };

    getProjects();
  }, []);

  document.title = "Harun Spaho`s Portfolio";

  const location = useLocation();

  const [screenWidth, setScreenWidth] = useState(screen.width);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
    return () => window.removeEventListener("resize", setScreenWidth);
  }, [screenWidth]);

  const renderProductDetails = (isOnMobile) => {
    return (
      <div className="md:mb-32 flex-col">
        <div className="flex flex-col md:flex-row w-full h-full mb-20 bg-[#272727]">
          <div className="flex flex-col md:flex-row w-full h-full">
            <img
              src={project.image}
              className="w-[400px] h-[400px] object-contain"
            />
            <div className="flex flex-col md:flex-row w-full md:h-max h-full items-start">
              <div className="flex flex-col h-full w-full mt-0 md:mx-10 p-5 items-start gap-5">
                <p className="text-[8vw] md:text-[3vw] md:text-start w-full text-center">
                  {project.name}
                </p>
                <p className="text-justify w-full">{project.description}</p>
              </div>
            </div>
          </div>
          <div className="w-full h-1 bg-rose-700"></div>
        </div>
        {!isOnMobile ? (
          <div>
            {project.details.map((value, valueIndex) => {
              return (
                <div className="mb-32 bg-[#272727]">
                  <div
                    className="flex flex-row w-full h-max"
                    style={{
                      alignItems: value.text == "" ? "center" : "start",
                    }}
                    key={valueIndex}
                  >
                    {valueIndex % 2 != 0 && (
                      <img
                        src={value.imageUrl}
                        className="w-[400px] h-[400px] object-contain"
                      />
                    )}
                    <div
                      className="flex flex-col h-full w-full mt-0 mx-10 gap-5"
                      style={{
                        alignItems: valueIndex % 2 == 0 ? "" : "flex-end",
                      }}
                    >
                      <p className="text-[3vw]">{project.name}</p>
                      <p className="text-justify">{value.description}</p>
                    </div>
                    {valueIndex % 2 == 0 && (
                      <img
                        src={value.imageUrl}
                        className="w-[400px] h-[400px] object-contain"
                      />
                    )}
                  </div>
                  <div className="w-full h-1 bg-rose-700"></div>
                </div>
              );
            })}
          </div>
        ) : (
          project.details.map((value, valueIndex) => (
            <div
              className="flex flex-col md:flex-row mb-32 w-full h-full justify-center items-center bg-[#272727]"
              key={valueIndex}
            >
              <img
                src={value.imageUrl}
                className="w-[400px] h-[400px] object-contain"
              />
              <div className="flex flex-col md:flex-row w-full md:h-max h-full items-start">
                <div className="flex flex-col h-full w-full mt-0 md:mx-10 p-5 items-start gap-5">
                  <p className="text-[8vw] md:text-[3vw] md:text-start w-full text-center">
                    {project.name}
                  </p>
                  <p className="text-justify w-full">{value.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };
  window.scrollTo(0, 0);
  return (
    <div className={`select-none h-full w-full`}>
      <div className="hidden md:block">
        <NavigationBar />
      </div>
      <div className="block md:hidden">
        <NavigationBarMobile />
      </div>
      {!project ? (
        <div className="text-white text-center mt-10">Loading project...</div>
      ) : (
        <div className="flex w-full h-full pt-44 text-white font-semibold">
          <div className="mx-auto my-0 w-3/4 h-max">
            <div className="flex-col flex">
              {renderProductDetails(screenWidth <= 900)}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
