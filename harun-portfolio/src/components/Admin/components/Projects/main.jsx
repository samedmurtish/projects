import React from "react";
import image from "../../../../assets/me.jpg";

export default function Projects({ onEdit }) {
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
          details: [
            {
              image: image,
              description: "Bin It Poster",
            },
            {
              image: null,
              description: "Bin It Poster",
            },
          ],
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
      <div key={categoryIndex} className="w-full p-3 transition flex">
        <div className="flex gap-5 items-center w-full">
          <div className="flex flex-col w-full">
            <h1 className="text-2xl transition mb-5">
              {category.categoryName}
            </h1>
            <div>
              <div className="flex flex-col w-full">
                {category.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className={`w-full p-3 ${
                      projectIndex % 2 == 0 ? "bg-[#1d1d1d]" : "bg-[#242424]"
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
                        className="bg-violet-600 hover:bg-violet-700 active:bg-violet-800 p-2 px-5 transition rounded-lg"
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

  return <div className="overflow-auto">{renderProjects()}</div>;
}
