import React, { useState, useEffect, useMemo } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import Projects from "./components/Projects/Projects";
import { auth, database } from "../../database/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Categories from "./components/Categories/Categories";
import { collection, getDocs } from "firebase/firestore";
import supabase from "../../database/supabase";

export default function AdminPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [user, setUser] = useState(null);

  const [categories, setCategories] = useState([]);
  const categoriesRef = collection(database, "categories");

  const [projects, setProjects] = useState([]);
  const projectsRef = collection(database, "projects");

  const getImages = async () => {
    const { data, error } = await supabase.storage
      .from("project_images")
      .list();
    if (error) console.error(error);
  };

  useEffect(() => {
    getImages();
  }, []);

  // {
  //   id: 1,
  //   name: "Econo Car",
  //   description: "Econo Car Logo Design",
  //   image: image,
  //   categoryId: 1,
  //   details: [
  //     {
  //       image: image,
  //       description:
  //         "The 'Econo Car' logo was assigned to me during my university studies. I was tasked with animating it using HTML, CSS, and JavaScript. Unfortunately, this is all I got of the logo.",
  //     },
  //   ],
  // },

  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      const data = await getDocs(projectsRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    getProjects();

    getCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const options = useMemo(
    () => [
      {
        name: "Projects",
      },
      {
        name: "Categories",
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
    <div>
      <div className="hidden md:block z-[]">
        <NavigationBar />
      </div>
      <div className="block md:hidden">
        <NavigationBarMobile />
      </div>

      {user && (
        <div className="h-full w-3/4 mx-auto my-0 text-white font-semibold pt-28 flex align-center justify-center">
          <div className="flex flex-row min-h-[40rem] w-full">
            <div className="bg-gradient-to-tl from-[#8c0327] to-[#8c0327]/50 w-[21rem] p-5 pt-0 overflow-hidden">
              <div className="flex justify-center items-center w-full gap-3 border-b-2 border-b-white p-5">
                <h1 className="text-2xl">Admin Panel</h1>
              </div>
              <div className="flex flex-col pt-5 justify-between">
                <div className="flex flex-col">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center w-full gap-3 p-3 hover:bg-black/10 ${
                        selectedOption?.name === option.name
                          ? "bg-black/20"
                          : ""
                      } cursor-pointer group transition`}
                      onClick={() => handleOptionClick(option)}
                    >
                      <h1
                        className={`text-lg ${
                          selectedOption?.name === option.name
                            ? "translate-x-2"
                            : ""
                        } group-hover:translate-x-2 transition`}
                      >
                        {option.name}
                      </h1>
                    </div>
                  ))}
                </div>
                <button
                  className="flex items-center w-full gap-3 p-3 hover:bg-black/10 cursor-pointer group transition"
                  onClick={() => auth.signOut()}
                >
                  Log out
                </button>
              </div>
            </div>
            <div className="bg-[#2d2d2d] h-full w-full p-5 pt-2">
              <div className="h-full overflow-auto">
                {selectedOption?.name === "Projects" ? (
                  <Projects
                    projects={projects}
                    categories={categories}
                    setProjects={setProjects}
                    getProjects={getProjects}
                  />
                ) : selectedOption?.name === "Categories" ? (
                  <Categories
                    categories={categories}
                    setCategories={setCategories}
                    projects={projects}
                    getCategories={getCategories}
                  />
                ) : (
                  selectedOption?.name === "Settings" && <div>Settings</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
