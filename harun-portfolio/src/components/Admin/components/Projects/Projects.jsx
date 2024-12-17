"use client";
import { useEffect, useState } from "react";
import Edit from "./EditProject";
import NewCategory from "../Categories/NewCategory";
import NewProject from "./NewProject";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { database } from "../../../../database/firebase";
import supabase from "../../../../database/supabase";

export default function Projects({
  projects,
  categories,
  setProjects,
  getProjects,
}) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [page, setPage] = useState("Projects");

  const handleEditMode = (project) => {
    setPage("Edit");
    setSelectedProject(project);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleDeleteProject = async (categoryId, projectId) => {
    try {
      const projectRef = doc(database, "projects", projectId);

      const projectToDelete = projects.find(
        (project) =>
          project.categoryId === categoryId && project.id === projectId
      );

      if (!projectToDelete) {
        console.error("Project not found.");
        return;
      }

      const imagePaths = [];

      if (projectToDelete.imagePath) {
        imagePaths.push(`images/${projectToDelete.imagePath}`);
      }

      if (projectToDelete.details) {
        projectToDelete.details.forEach((detail) => {
          if (detail.imageName) {
            imagePaths.push(`images/${detail.imageName}`);
          }
        });
      }

      if (imagePaths.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from("project_images")
          .remove(imagePaths);

        if (deleteError) {
          console.error(
            "Error deleting images from Supabase:",
            deleteError.message
          );
          return;
        }
      }

      await deleteDoc(projectRef);

      const updatedProjects = projects.filter(
        (project) =>
          !(project.categoryId === categoryId && project.id === projectId)
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  };

  const renderProjects = () => {
    return categories.map((category) => {
      const filteredProjects = projects.filter(
        (project) => project.categoryId === category.id
      );

      return (
        <div key={category.id} className="w-full pr-3 transition flex mb-5">
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-row w-full gap-3">
              <div className="flex flex-col justify-center items-center">
                <h1
                  className={`self-start text-2xl transition sticky top-[-1px] ${
                    Math.floor(Math.random() * 9) <= 3
                      ? "bg-gradient-to-br"
                      : Math.floor(Math.random() * 10) <= 6
                      ? "bg-gradient-to-tl"
                      : "bg-gradient-to-tr"
                  } from-rose-700 to-rose-900 z-10 min-w-32 max-w-64 p-3 rounded-xl text-center flex justify-center items-center 
              w-full sm:w-64 md:w-48 lg:w-40`}
                >
                  {category.categoryName}
                </h1>
                <div className="h-full w-[2px] bg-white justify-self-start"></div>
              </div>
              <div className="w-full">
                <div className="flex flex-col w-full">
                  {filteredProjects.length === 0 && (
                    <div className="w-full p-3 bg-[#242424] hover:bg-[#282828] first:rounded-t-lg last:rounded-b-lg cursor-pointer group transition flex justify-between">
                      <div className="flex gap-5 items-center">
                        <div className="flex flex-col">
                          <h1 className="text-lg transition">
                            No projects found.
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                  {filteredProjects.map((project, projectIndex) => (
                    <div
                      key={project.id}
                      className={`w-full p-3 ${
                        projectIndex % 2 === 0 ? "bg-[#1d1d1d]" : "bg-[#242424]"
                      } hover:bg-[#282828] first:rounded-t-lg last:rounded-b-lg cursor-pointer group transition flex justify-between`}
                    >
                      <div className="flex gap-5 items-center">
                        {project.image ? (
                          <img
                            src={project.image}
                            className="w-12 h-12"
                            alt=""
                          />
                        ) : (
                          <div className="w-12 h-12 flex justify-center items-center text-center border-2 border-zinc-700 text-[0.5rem]">
                            No Image.
                          </div>
                        )}
                        <div className="flex flex-col">
                          <h1 className="text-lg transition">{project.name}</h1>
                          <p className="text-sm transition">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg"
                          onClick={() => handleEditMode(project)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 p-2 px-5 transition rounded-lg"
                          onClick={() =>
                            handleDeleteProject(category.id, project.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return page == "Projects" ? (
    <div>
      <div
        className={`overflow-auto h-[35rem] gap-3 flex flex-col ${
          projects.length > 0 ? "" : "justify-center items-center"
        }`}
      >
        <div>
          {projects.length > 0 ? (
            renderProjects()
          ) : (
            <span className="text-center bg-[#242424] rounded-lg p-3 px-5 text-xl">
              Couldn't find any project. Please create one.
            </span>
          )}
        </div>
      </div>
      <div className="gap-5 flex pt-5">
        <button
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 p-2 px-5 transition rounded-lg w-full"
          onClick={() => setPage("New Project")}
        >
          New Project
        </button>
      </div>
    </div>
  ) : page == "Edit" ? (
    <Edit
      project={selectedProject}
      projectData={projects}
      setProjectData={setProjects}
      onCancel={() => {
        setSelectedProject(null);
        setPage("Projects");
      }}
      categories={categories}
    />
  ) : page == "New Project" ? (
    <NewProject
      onCancel={() => {
        setPage("Projects");
      }}
      categories={categories}
      projects={projects}
      setProjects={setProjects}
      getProjects={getProjects}
    />
  ) : page == "New Category" ? (
    <NewCategory
      onCancel={() => {
        setPage("Projects");
      }}
    />
  ) : null;
}
