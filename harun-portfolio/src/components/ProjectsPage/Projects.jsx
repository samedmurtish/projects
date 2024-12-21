import React, { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import SnackbarShow from "../../MuiElements/SnackbarShow";
import Footer from "../Footer/Footer";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../database/firebase";

export default function Projects() {
  document.title = "Harun Spaho`s Portfolio";

  const [projects, setProjects] = useState([]);
  const projectsRef = collection(database, "projects");

  const [categories, setCategories] = useState([]);
  const categoriesRef = collection(database, "categories");

  const getProjects = async () => {
    try {
      const data = await getDocs(projectsRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data() })));
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await getDocs(categoriesRef);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProjects();
    getCategories();
  }, []);

  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Product added to cart successfully!",
  });

  const renderProjects = (category) => {
    return projects.map((value, valueIndex) => (
      <span
        className={`${value.categoryId != category ? "hidden" : ""}`}
        key={valueIndex}
      >
        {value.categoryId == category && (
          <div>
            <Link to={`/project/${value.id}`} state={{ project: value }}>
              <div className="w-[320px] h-[400px] bg-[#1b1b1b] flex items-center flex-col p-5 pb-0 rounded-t-3xl justify-center">
                <img
                  src={value.image}
                  alt={value.name}
                  className="justify-self-center self-center rounded-xl w-full h-max overflow-hidden"
                />
              </div>
            </Link>
            <p className=" bg-[#1b1b1b] py-5 text-2xl flex justify-center items-center w-full text-center flex-col h-max">
              {value.name} <br />
              <span className="text-lg text-gray-300">
                {
                  categories.find((cat) => cat.id == value.categoryId)
                    .categoryName
                }
              </span>
            </p>
            <div className="bg-rose-400 h-1 w-full"></div>
            <div className="flex w-full h-full">
              <Link
                to={`/project/${value.id}`}
                state={{ project: value }}
                className="w-2/3 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 h-full p-5 transition text-xl flex justify-center items-center"
                onClick={() =>
                  setShowBar({
                    clicked: true,
                    message: "Redirecting to project..",
                  })
                }
              >
                View Project
              </Link>
              <button
                className="w-1/3 flex justify-center items-center text-3xl hover:text-rose-500 border-4 border-t-0 border-l-0 border-rose-900 bg-rose-950 rounded-br-3xl"
                onClick={() =>
                  setShowBar({
                    clicked: true,
                    message: `"${value.name}" successfully added to your liked projects list.`,
                  })
                }
              >
                <MdFavorite />
              </button>
            </div>
          </div>
        )}
      </span>
    ));
  };
  const [sortedCategories, setSortedCategories] = useState([]);
  const sortCategories = () => {
    projects.map((value) => {
      let matches = false;
      sortedCategories.forEach((sortedValue) => {
        if (sortedCategories.length > 0)
          if (value.categoryId == sortedValue) matches = true;
      });
      if (!matches)
        setSortedCategories([...sortedCategories, value.categoryId]);
    });
  };

  const renderCategories = () => {
    sortCategories();

    return sortedCategories.map((value, valueIndex) => (
      <div key={valueIndex} className="flex flex-col w-full mb-24">
        <p className="text-5xl text-white font-thin">
          {categories.find((cat) => cat.id == value).categoryName}
        </p>
        <div className="flex">
          <div className="w-2/3 bg-rose-600 h-1 my-5" />
          <div className="w-[20%] bg-rose-500 h-1 my-5" />
          <div className="w-[10%] bg-rose-400 h-1 my-5" />
          <div className="w-[5%] bg-rose-300 h-1 my-5" />
        </div>
        <div className="flex w-full h-full gap-5 justify-start items-start flex-wrap">
          {renderProjects(value)}
        </div>
      </div>
    ));
  };

  return (
    <div
      className={`flex justify-center items-start md:items-center flex-col ${
        projects.length == 0 ? "h-screen" : ""
      }`}
    >
      <SnackbarShow get={showBar} set={setShowBar} />
      <div className="hidden sm:block md:self-start">
        <NavigationBar />
      </div>
      <div className="block sm:hidden">
        <NavigationBarMobile />
      </div>
      <div className="flex w-full h-full pt-24 text-white  font-semibold">
        <div className="mx-auto my-0 w-3/4 h-max">
          <p className="text-7xl md:text-8xl py-10 font-extrabold">Projects</p>
          <div className="flex w-full h-full gap-5 justify-start items-center flex-wrap">
            {renderCategories()}
          </div>
        </div>
      </div>
      <div className="self-center justify-self-center bg-neutral-700 w-1/2 h-[2px] mt-16" />
      <div className="self-center justify-self-center bg-neutral-700 w-2/3 h-[2px] mx-16 mt-[2px]" />
      <div className="self-center justify-self-center bg-neutral-700 w-1/2 h-[2px] my-16 mt-[2px]" />
      <Footer />
    </div>
  );
}
