import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import Projects from "./components/Projects/Main";
import Edit from "./components/Projects/Edit";
import NewProject from "./components/Projects/NewProject";
import NewCategory from "./components/Projects/NewCategory";
import Settings from "./components/settings";

export default function AdminPage() {
  const [editMode, setEditMode] = useState(false);
  const [newMode, setNewMode] = useState(false);
  const [newPageType, setNewPageType] = useState(null); // "Project" or "Category"
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    console.log("Edit mode state in AdminPage:", editMode);
    console.log("New mode:", newMode, "New Page Type:", newPageType);
    console.log("Selected project:", selectedProject);
  }, [editMode, newMode, newPageType, selectedProject]);

  const options = [
    {
      name: "Projects",
      node: (
        <Projects
          onEdit={(project) => {
            setSelectedProject(project);
            setEditMode(true);
          }}
          onNewProject={() => {
            setNewMode(true);
            setNewPageType("Project");
          }}
          onNewCategory={() => {
            setNewMode(true);
            setNewPageType("Category");
          }}
        />
      ),
    },
    {
      name: "Categories",
      node: <div>Categories</div>,
    },
    {
      name: "Settings",
      node: <Settings />,
    },
  ];

  const handleOptionClick = (option) => {
    setEditMode(false);
    setNewMode(false);
    setNewPageType(null);
    setSelectedProject(null);
    setSelectedOption(option);
    console.log("Option selected:", option.name);
  };

  useEffect(() => {
    setSelectedOption(options[0]);
  }, []);

  const renderOptions = () => {
    return options.map((option, index) => (
      <div
        key={index}
        className={`flex items-center w-full gap-3 p-3 hover:bg-black/10 ${
          selectedOption?.name == option.name ? "bg-black/20" : ""
        } cursor-pointer group transition`}
        onClick={() => handleOptionClick(option)}
      >
        <h1
          className={`text-lg ${
            selectedOption?.name == option.name ? "translate-x-2" : ""
          } group-hover:translate-x-2 transition`}
        >
          {option.name}
        </h1>
      </div>
    ));
  };

  return (
    <div>
      <div className="hidden md:block">
        <NavigationBar />
      </div>
      <div className="block md:hidden">
        <NavigationBarMobile />
      </div>
      <div className="h-full w-3/4 mx-auto my-0 text-white font-semibold pt-28 flex align-center justify-center">
        <div className="flex flex-row h-full w-full">
          <div className="bg-gradient-to-tl from-[#8c0327] to-[#8c0327]/50 max-w-56 p-5 pt-0 w-full">
            <div className="flex justify-center items-center w-full gap-3 border-b-2 border-b-white p-5">
              <h1 className="text-2xl">Admin Panel</h1>
            </div>
            <div className="flex flex-col pt-5">{renderOptions()}</div>
          </div>
          <div className="bg-[#2d2d2d] h-full w-full p-5 pt-2">
            <div className="h-full overflow-auto">
              {editMode ? (
                <Edit
                  project={selectedProject}
                  onCancel={() => {
                    setEditMode(false);
                    setSelectedProject(null);
                  }}
                />
              ) : newMode ? (
                newPageType === "Project" ? (
                  <NewProject
                    onCancel={() => {
                      setNewMode(false);
                      setNewPageType(null);
                    }}
                  />
                ) : (
                  <NewCategory
                    onCancel={() => {
                      setNewMode(false);
                      setNewPageType(null);
                    }}
                  />
                )
              ) : (
                selectedOption?.node
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
