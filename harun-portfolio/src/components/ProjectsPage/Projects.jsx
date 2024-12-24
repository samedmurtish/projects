import React, { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import SnackbarShow from "../../MuiElements/SnackbarShow";
import Footer from "../Footer/Footer";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { database } from "../../database/firebase";

export default function Projects() {
  document.title = "Harun Spaho`s Portfolio";
  const [projects, setProjects] = useState([]);
  const projectsRef = collection(database, "projects");
  const [categories, setCategories] = useState([]);
  const categoriesRef = collection(database, "categories");
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const [likedProjects, setLikedProjects] = useState([]);
  const statisticsRef = doc(collection(database, "statistics"), "statistics");
  const [siteSettings, setSiteSettings] = useState({});

  const sendLikedProjectsToStatistics = async (projectId) => {
    try {
      const docSnap = await getDoc(statisticsRef);
      let existingLikedProjects = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        existingLikedProjects = Array.isArray(data.likedProjects)
          ? data.likedProjects
          : [];
      }
      const mergedLikedProjects = [...existingLikedProjects, projectId];
      const itemCount = mergedLikedProjects.length;
      await setDoc(
        statisticsRef,
        { likedProjects: mergedLikedProjects, itemCount },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getProjects = async () => {
    setLoading(true);
    try {
      const data = await getDocs(projectsRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    }
  };
  const getCategories = async () => {
    setLoading(true);
    try {
      const data = await getDocs(categoriesRef);

      const fetchedCategories = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        order: doc.data().order, // Make sure `order` is being fetched
      }));

      // Sort categories by the `order` field
      fetchedCategories.sort((a, b) => a.order - b.order);

      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      getSiteSettings();
    }
  };

  const getSiteSettings = async () => {
    setLoading(true);
    try {
      const siteSettingsRef = doc(collection(database, "siteSettings"));
      const docSnap = await getDoc(siteSettingsRef);
      if (docSnap.exists()) {
        setSiteSettings(docSnap.data());
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProjects();
    getCategories();
    const storedLikedProjects = localStorage.getItem("likedProjects");
    if (storedLikedProjects) {
      setLikedProjects(JSON.parse(storedLikedProjects));
    }
  }, []);
  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Product added to cart successfully!",
  });
  const handleLikeProject = (project) => {
    setLikedProjects([...likedProjects, project.id]);
    setShowBar({
      clicked: true,
      message: `"${project.name}" successfully added to your liked projects list.`,
    });
    localStorage.setItem(
      "likedProjects",
      JSON.stringify([...likedProjects, project.id])
    );
    sendLikedProjectsToStatistics(project.id);
  };
  const handleImageLoad = (projectId) => {
    setImageLoading((prevState) => ({ ...prevState, [projectId]: false }));
  };
  const renderProjects = (category) => {
    return projects.map((value, valueIndex) => (
      <span
        className={`${value.categoryId != category ? "hidden" : ""}`}
        key={valueIndex}
      >
        {value.categoryId == category && (
          <div>
            <Link to={`/project/${value.id}`} state={{ project: value }}>
              <div className="w-full md:w-[18.5rem] h-[400px] bg-[#1b1b1b] flex items-center flex-col p-5 pb-0 rounded-t-3xl justify-center">
                {imageLoading[value.id] !== false && (
                  <div className="w-full h-full bg-neutral-700 animate-pulse rounded-xl"></div>
                )}
                <img
                  src={value.image}
                  alt={value.name}
                  className={`justify-self-center self-center rounded-xl object-contain w-full h-full overflow-hidden ${
                    imageLoading[value.id] === false ? "" : "hidden"
                  }`}
                  onLoad={() => handleImageLoad(value.id)}
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
                className="w-2/3 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 h-full p-5 transition text-xl flex justify-center items-center rounded-bl-3xl md:rounded-bl-none"
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
                className="w-1/3 flex justify-center items-center text-3xl hover:text-rose-500 border-4 border-t-0 border-l-0 border-rose-900 bg-rose-950 rounded-br-3xl disabled:text-rose-600"
                onClick={() => handleLikeProject(value)}
                disabled={likedProjects.includes(value.id)}
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
    // Collect unique category IDs from projects
    const uniqueCategoryIds = [...new Set(projects.map((p) => p.categoryId))];

    // Sort categories based on their "order" property
    const sorted = uniqueCategoryIds
      .map((categoryId) => categories.find((cat) => cat.id === categoryId))
      .filter(Boolean) // Remove any undefined categories
      .sort((a, b) => a.order - b.order);

    setSortedCategories(sorted.map((cat) => cat.id));
  };

  useEffect(() => {
    if (projects.length > 0 && categories.length > 0) {
      sortCategories();
    }
  }, [projects, categories]); // Re-run whenever projects or categories change

  const renderCategories = () => {
    if (sortedCategories.length === 0) {
      return (
        <div className="flex flex-col w-full mb-24 justify-center items-center h-full pt-24">
          <p className="text-5xl text-white font-thin text-center">
            No projects found.
          </p>
        </div>
      );
    }

    return sortedCategories.map((categoryId, valueIndex) => {
      const category = categories.find((cat) => cat.id === categoryId);
      if (!category) return null;

      return (
        <div key={valueIndex} className="flex flex-col w-full mb-24">
          <p className="text-5xl text-white font-thin w-full">
            {category.categoryName}
          </p>
          <div className="flex">
            <div className="w-2/3 bg-rose-600 h-1 my-5" />
            <div className="w-[20%] bg-rose-500 h-1 my-5" />
            <div className="w-[10%] bg-rose-400 h-1 my-5" />
            <div className="w-[5%] bg-rose-300 h-1 my-5" />
          </div>
          <div className="flex w-full h-full gap-5 justify-center items-center md:justify-start md:items-start flex-wrap">
            {renderProjects(categoryId)}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className={`flex justify-center items-start md:items-center flex-col ${
        projects.length == 0 ? "h-screen" : "h-full"
      }`}
    >
      {loading && (
        <div className="absolute top-0 right-0 bg-[#ab012e] w-full h-full flex justify-center items-center gap-5 z-[10000000000] flex-col text-white text-4xl font-extrabold">
          <div className="border-white/50 h-20 w-20 animate-spin rounded-full border-8 border-t-white" />
          Loading Projects...
        </div>
      )}
      <SnackbarShow get={showBar} set={setShowBar} />
      <div className="hidden sm:block md:self-start">
        <NavigationBar siteSettings={siteSettings} from={"projects"} />
      </div>
      <div className="block sm:hidden">
        <NavigationBarMobile siteSettings={siteSettings} from={"projects"} />
      </div>
      <div className="flex w-full h-full pt-24 text-white  font-semibold">
        <div className="mx-auto my-0 w-3/4 h-max">
          <p className="text-7xl md:text-8xl py-10 font-extrabold text-center md:text-start">
            Projects
          </p>
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
