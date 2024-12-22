import { collection, deleteDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../../../database/firebase";
import { FiDivideCircle } from "react-icons/fi";

export default function Statistics({ projects, setLoading }) {
  const [statistics, setStatistics] = useState([]);
  const [mostLikedProject, setMostLikedProject] = useState({});

  const statisticsRef = collection(database, "statistics");

  const getStatistics = async () => {
    setLoading(true);
    try {
      const data = await getDocs(statisticsRef);
      const fetchedStatistics = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStatistics(fetchedStatistics);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  useEffect(() => {
    if (statistics.length > 0) {
      sortMostLikedProjects();
    }
  }, [statistics]);

  const sortMostLikedProjects = () => {
    if (!statistics[0].likedProjects) return;

    const projectsArray = statistics[0].likedProjects;
    const tempProjects = [];

    function removeDuplicatesAndCount(projects) {
      const uniqueProjects = new Set(projects);
      const uniqueProjectsArray = Array.from(uniqueProjects);

      uniqueProjectsArray.forEach((project) => {
        const count = projects.filter((p) => p === project).length;
        tempProjects.push({ id: project, count: count });
      });

      return tempProjects;
    }

    removeDuplicatesAndCount(projectsArray);
    const filteredProjects = tempProjects.filter(
      (project) => project.count !== 0
    );

    function getHighestProject() {
      let highestProject = filteredProjects[0];
      for (let i = 1; i < filteredProjects.length; i++) {
        if (filteredProjects[i].count > highestProject.count) {
          highestProject = filteredProjects[i];
        }
      }
      return highestProject;
    }

    let topProjects = [];
    function sortProjectsByCount() {
      return (topProjects = filteredProjects.sort((a, b) => b.count - a.count));
    }

    sortProjectsByCount();

    const mostLikedProject = getHighestProject();

    setMostLikedProject({
      ...mostLikedProject,
      count: mostLikedProject.count,
    });
    setStatistics([...topProjects]);
  };

  const [mouseOver, setMouseOver] = useState(false);
  const [mouseOverID, setMouseOverID] = useState("");

  const renderMostLikedProjects = () => {
    console.log(statistics);
    const remaining = 5 - (statistics.length ? statistics.length : 0);
    const tempArray = [];
    for (let i = 0; i < remaining; i++) {
      tempArray.push({ id: "", count: 0 });
    }

    return (
      <div className="flex flex-col gap-5 justify-center items-center md:items-end h-full select-none">
        <h1 className="flex justify-center items-center text-center w-full">
          Top 5 Liked Projects
        </h1>
        <div className="flex flex-row gap-5 justify-center items-end h-full w-full">
          {statistics?.map((project, index) => {
            const selectedProject = projects.find((p) => p.id === project.id);
            if (index >= 5) {
              return null;
            }
            if (selectedProject) {
              return (
                <div
                  className="flex md:w-[3rem] w-full h-full bg-blue-500/20 justify-center items-end rounded-t-lg relative group"
                  onMouseOver={() => {
                    setMouseOver(true);
                    setMouseOverID(project.id);
                  }}
                  onMouseLeave={() => {
                    setMouseOver(false);
                    setMouseOverID("");
                  }}
                >
                  <div
                    className={`bg-blue-500 w-full rounded-t-lg flex justify-center items-center text-center select-none overflow-hidden transition text-5xl font-extrabold`}
                    style={{
                      height:
                        mouseOverID === project.id
                          ? "0px"
                          : (project.count / mostLikedProject.count) * 100 +
                            "%",
                      transition: "height 0.15s ease-in-out",
                      maxHeight: "100%",
                    }}
                  >
                    {project.count}
                  </div>

                  <div className="absolute top-0 left-0 right-0 h-full opacity-0 group-hover:opacity-100 flex flex-nowrap text-nowrap text-center transition bg-green-500/0 text-white rounded-t-lg p-3 px-5 justify-center items-center text-ellipsis overflow-hidden text-xl">
                    <p className="-rotate-90">{selectedProject.name}</p>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
          {tempArray.map((project, index) => {
            return (
              <div
                key={project.id + index}
                className="flex md:w-[3rem] w-full h-full bg-blue-500/20 justify-center items-end rounded-t-lg relative group"
                onMouseOver={() => {
                  setMouseOver(true);
                  setMouseOverID(project.id);
                }}
                onMouseLeave={() => {
                  setMouseOver(false);
                  setMouseOverID("");
                }}
              >
                ...
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMostLikedProject = () => {
    if (!statistics || statistics.length === 0) return null;
    const project = projects.find((p) => p.id === mostLikedProject.id);

    return (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full select-none">
        <h1 className="flex justify-center items-center text-center w-full">
          Most Liked Project
        </h1>
        <div>
          {project && (
            <div className="flex flex-row gap-5 justify-center items-center w-full h-full">
              <div className="flex flex-col w-full h-full justify-center items-center gap-5">
                <div className="flex flex-row justify-center items-center gap-2 relative">
                  <span
                    style={{
                      fontSize: `${
                        mostLikedProject.count < 10
                          ? 16
                          : mostLikedProject.count < 100
                          ? 14
                          : mostLikedProject.count < 1000
                          ? 12
                          : 10
                      }rem`,
                    }}
                    className="h-[5rem] flex justify-end items-center font-extrabold relative"
                  >
                    {mostLikedProject.count}
                  </span>
                  <span className="absolute text-[10rem] h-[10rem] font-sans md:left-[5rem] justify-center items-center md:px-5 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-transparent -bottom-[5rem] bg-clip-text font-extrabold flex">
                    Likes
                  </span>
                  <img
                    src={project.image}
                    className="w-52 h-52 object-contain mt-8"
                  />
                </div>
                <h1 className="text-9xl flex justify-end items-center font-extrabold"></h1>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleReset = async () => {
    setStatistics([]);
    setMostLikedProject({});
    setLoading(true);
    try {
      const statisticsRef = collection(database, "statistics");
      const querySnapshot = await getDocs(statisticsRef);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      console.log("Statistics reset successfully.");
    } catch (error) {
      console.error("Error resetting statistics:", error);
    } finally {
      setLoading(false);
    }
  };
  const times = 15;
  return (
    <div className="w-full pt-3 flex justify-between flex-col md:h-full h-screen">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-2xl flex justify-center items-center pb-5">
          Statistics
        </h1>
        <div
          className={`flex flex-col flex-nowrap md:flex-row gap-5 justify-start md:items-start items-center pl-[${
            mostLikedProject.count < 10 ? "md:2rem" : "md:0rem"
          }] w-full h-full`}
        >
          <div className="bg-[#232323] h-96 rounded-xl p-5 w-screen md:w-max">
            {renderMostLikedProjects()}
          </div>
          <div className="bg-[#232323] h-max rounded-xl p-5 w-max relative z-10">
            {renderMostLikedProject()}
            <div className="flex flex-col w-full h-full absolute z-[-1] top-0 left-0 overflow-hidden">
              {Array.from({ length: times }).map((_, outerIndex) => (
                <div
                  key={`outer-${outerIndex}`}
                  className={`flex flex-nowrap w-full text-nowrap`}
                  style={{
                    transform: "translateX(-" + outerIndex + "rem)",
                  }}
                >
                  {Array.from({ length: times }).map((_, innerIndex) =>
                    projects.map((project) => {
                      if (project.id === mostLikedProject.id) {
                        return (
                          <span
                            key={`${project.id}-${innerIndex}`}
                            className="pr-2 text-5xl text-[rgba(255,255,255,0.02)] uppercase font-extrabold"
                          >
                            {project.name}
                          </span>
                        );
                      } else {
                        return null;
                      }
                    })
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 w-full p-2 px-5 transition rounded-lg"
        onClick={() => handleReset()}
      >
        Reset Statistics
      </button>
    </div>
  );
}
