import React, { useState, useEffect, useMemo } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import Categories from "./components/Categories/Categories";
import Projects from "./components/Projects/Projects";
import Settings from "./components/Settings/Settings";
import { auth, database } from "../../database/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import supabase from "../../database/supabase";
import Statistics from "./components/Statistics/Statistics";

export default function AdminPage() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [user, setUser] = useState(null);

  const [categories, setCategories] = useState([]);
  const categoriesRef = collection(database, "categories");

  const [projects, setProjects] = useState([]);
  const projectsRef = collection(database, "projects");

  const [loading, setLoading] = useState(true);

  const [SiteSettings, setSiteSettings] = useState({
    borderColor: "#ab012e",
    backgroundColor: "#ab012e",
    backgroundOpacity: "33",
    //
    buttonsTextColor: "#ffffff",
    buttonsColor: "#ab012e",
    buttonsHoverColor: "#a0002b",
    buttonsActiveColor: "#920127",
    //
    logoBackgroundColor: "#ab012e",
    logoTextColor: "#ffffff",

    aboutMeTitleColor: "#ab012e",
    aboutMeContentColor: "#ab012e",
    aboutMeContentTextColor: "#ffffff",
    aboutMeTitleTextColor: "#ffffff",
    aboutMeOpacity: "55",

    aboutMeImage: null,
    aboutMeImageName: null,
  });

  const navigate = useNavigate();

  const getProjects = async () => {
    setLoading(true);
    try {
      const data = await getDocs(projectsRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
    getCategories();
  }, []);

  const options = useMemo(
    () => [
      {
        name: "Projects",
      },
      {
        name: "Categories",
      },
      {
        name: "Statistics",
      },
      {
        name: "Settings",
      },
    ],
    [projects, categories]
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setSelectedOption(options[0]);
  }, []);

  return (
    <div className="relative">
      <div className="hidden md:block z-[]">
        <NavigationBar siteSettings={SiteSettings} from="admin" />
      </div>
      <div className="block md:hidden">
        <NavigationBarMobile />
      </div>
      {loading && (
        <div className="absolute top-0 right-0 bg-[#ab012e] w-screen flex justify-center items-center gap-5 z-[10000000000] flex-col text-white text-4xl font-extrabold h-screen">
          <div className="border-white/50 h-20 w-20 animate-spin rounded-full border-8 border-t-white" />
          Loading Page...
        </div>
      )}
      {user && (
        <div className="h-[95vh] w-screen md:w-3/4 mx-auto my-0 text-white font-semibold pt-[6rem] md:pt-28 flex align-center justify-center">
          <div className="flex flex-col md:flex-row md:min-h-[40rem] w-full">
            <div className="bg-gradient-to-tl from-[#8c0327] to-[#8c0327]/50 w-screen min-h-44 md:w-[21rem] p-5 pt-0 overflow-hidden">
              <div className="flex justify-center items-center w-full gap-3 border-b-2 border-b-white p-5">
                <h1 className="text-2xl">Admin Panel</h1>
              </div>
              <div className="flex flex-row md:flex-col pt-5 justify-center md:justify-start w-full">
                <div className="flex flex-row md:flex-col justify-center md:justify-start md:gap-0">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-start w-full gap-3 p-3 hover:bg-black/10 ${
                        selectedOption?.name === option.name
                          ? "bg-black/20 md:translate-y-0 translate-y-2"
                          : ""
                      } cursor-pointer group transition`}
                      onClick={() => handleOptionClick(option)}
                    >
                      <h1
                        className={`text-lg ${
                          selectedOption?.name === option.name
                            ? "md:translate-x-2"
                            : ""
                        } md:group-hover:translate-x-2 transition`}
                      >
                        {option.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[#2d2d2d] h-full w-full md:p-5 pt-2 relative">
              <div className="h-full overflow-auto">
                {loading && (
                  <div className="absolute top-0 right-0 bg-black/50 w-full h-full flex justify-center items-center z-[1000000] flex-col gap-5">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-white"></div>
                    Loading {selectedOption?.name}...
                  </div>
                )}
                {selectedOption?.name === "Projects" ? (
                  <Projects
                    projects={projects}
                    categories={categories}
                    setProjects={setProjects}
                    getProjects={getProjects}
                    loading={loading}
                    setLoading={setLoading}
                  />
                ) : selectedOption?.name === "Categories" ? (
                  <Categories
                    categories={categories}
                    setCategories={setCategories}
                    projects={projects}
                    getCategories={getCategories}
                    loading={loading}
                    setLoading={setLoading}
                  />
                ) : selectedOption?.name === "Settings" ? (
                  <Settings
                    setSiteSettings={setSiteSettings}
                    siteSettings={SiteSettings}
                    loading={loading}
                    setLoading={setLoading}
                  />
                ) : selectedOption?.name === "Statistics" ? (
                  <Statistics projects={projects} setLoading={setLoading} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
