import React from "react";
import image from "../../../../assets/me.jpg";

export default function Projects({ onEdit, onNewProject, onNewCategory }) {
  const projectData = [
    {
      categoryName: "Logos",
      projects: [
        {
          name: "Econo Car",
          description: "Econo Car Logo Design",
          image: image,
        },
        {
          name: "My Piramit",
          description: "My Piramit Logo Design",
          image: image,
        },
        {
          name: "KAZFON",
          description: "KAZFON Logo Design",
          image: image,
        },
      ],
    },
    {
      categoryName: "Posters",
      projects: [
        {
          name: "Bin It",
          description: "Bin It Poster",
          image: image,
        },
        {
          name: "Keep It",
          description: "Keep It Poster",
          image: image,
        },
        {
          name: "No Poster",
          description: "No Poster Poster",
          image: image,
        },
      ],
    },
  ];

  const renderProjects = () => {
    return projectData.map((category, categoryIndex) => (
      <div key={categoryIndex} className="w-full pr-3 transition flex mb-5">
        <div className="flex gap-5 items-center w-full">
          <div className="flex flex-col w-full ">
            <h1 className="self-center text-2xl transition sticky top-[-1px] bg-gradient-to-bl from-[#8c0327] to-[#8c0327]/50 mb-3 z-10 w-64 p-3 rounded-xl text-center">
              {category.categoryName}
            </h1>
            <div>
              <div className="flex flex-col w-full">
                {category.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className={`w-full p-3 ${
                      projectIndex % 2 === 0 ? "bg-[#1d1d1d]" : "bg-[#242424]"
                    } hover:bg-[#282828] first:rounded-t-lg last:rounded-b-lg cursor-pointer group transition flex justify-between`}
                  >
                    <div className="flex gap-5 items-center">
                      {project.image && (
                        <img src={project.image} className="w-12 h-12" alt="" />
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
                        onClick={() => onEdit(project)}
                      >
                        Edit
                      </button>
                      <button className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 p-2 px-5 transition rounded-lg">
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
    ));
  };

  return (
    <div>
      <div className="overflow-auto h-[30rem] gap-3 flex flex-col">
        <div>{renderProjects()}</div>
      </div>
      <div className="gap-5 flex pt-5">
        <button
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg w-full"
          onClick={onNewProject}
        >
          New Project
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 p-2 px-5 transition rounded-lg w-full"
          onClick={onNewCategory}
        >
          New Category
        </button>
      </div>
    </div>
  );
}
