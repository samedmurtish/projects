import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function NewProject({ onCancel, setProjects, categories }) {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: null,
    categoryId: "",
    details: [],
  });

  const addDetail = () => {
    setNewProject((prevProject) => ({
      ...prevProject,
      details: [...prevProject.details, { image: null, description: "" }],
    }));
  };

  const removeDetail = (index) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      details: prevProject.details.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!newProject.categoryId) {
      alert("Please select a category!");
      return;
    }

    setProjects((prevProjects) => [...prevProjects, newProject]); // Use functional update
    onCancel();
  };

  const handleInputChange = (field, value) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      [field]: value,
    }));
  };

  const renderDetails = () =>
    newProject.details.map((detail, index) => (
      <div
        key={index}
        className="flex flex-col gap-5 w-64 h-[27rem] justify-evenly items-center bg-[#1d1d1d] p-5 rounded-2xl"
      >
        <div className="relative w-52 h-52 group">
          {detail.image ? (
            <div className="relative w-52 h-52 group">
              <div className="absolute cursor-pointer backdrop-blur-sm top-0 left-0 opacity-0 group-hover:opacity-100 transition w-full h-full rounded-xl flex justify-center items-center flex-col">
                <label
                  htmlFor={`detail-image-${index}`}
                  className="cursor-pointer bg-blue-500/50 text-white text-xl uppercase font-extrabold hover:bg-blue-600/50 p-5 rounded-t-xl w-full h-full flex justify-center items-center"
                >
                  Change
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id={`detail-image-${index}`}
                  hidden
                  onChange={(e) => {
                    if (!e.target.files[0]) return;
                    const updatedDetails = [...newProject.details];
                    updatedDetails[index].image = URL.createObjectURL(
                      e.target.files[0]
                    );
                    setNewProject((prev) => ({
                      ...prev,
                      details: updatedDetails,
                    }));
                  }}
                />
                <button
                  onClick={() => {
                    const updatedDetails = [...newProject.details];
                    updatedDetails[index].image = null;
                    setNewProject((prev) => ({
                      ...prev,
                      details: updatedDetails,
                    }));
                  }}
                  className="bg-rose-500/50 text-white text-xl uppercase font-extrabold hover:bg-rose-600/50 p-5 rounded-b-xl w-full h-full flex justify-center items-center"
                >
                  Remove
                </button>
              </div>
              <img
                src={detail.image}
                className="w-52 h-52 object-cover rounded-xl"
              />
            </div>
          ) : (
            <label
              htmlFor={`detail-image-${index}`}
              className="w-52 h-52 cursor-pointer bg-blue-600 hover:bg-blue-700 flex justify-center items-center rounded-xl"
            >
              <span className="text-white text-6xl">
                <FiPlus />
              </span>
              <input
                type="file"
                accept="image/*"
                id={`detail-image-${index}`}
                hidden
                onChange={(e) => {
                  if (!e.target.files[0]) return;
                  const updatedDetails = [...newProject.details];
                  updatedDetails[index].image = URL.createObjectURL(
                    e.target.files[0]
                  );
                  setNewProject((prev) => ({
                    ...prev,
                    details: updatedDetails,
                  }));
                }}
              />
            </label>
          )}
        </div>
        <textarea
          className="p-3 px-5 rounded-lg text-slate-700 w-full"
          placeholder="Enter detail description"
          value={detail.description}
          onChange={(e) => {
            const updatedDetails = [...newProject.details];
            updatedDetails[index].description = e.target.value;
            setNewProject((prev) => ({ ...prev, details: updatedDetails }));
          }}
        ></textarea>
        <button
          className="bg-rose-600 hover:bg-rose-700 p-3 w-full rounded-lg text-white"
          onClick={() => removeDetail(index)}
        >
          Remove Detail
        </button>
      </div>
    ));

  return (
    <div className="p-3 h-full">
      <form className="flex flex-col w-full h-full" onSubmit={handleSave}>
        <div className="flex flex-row gap-5 items-start h-full">
          <div className="flex flex-col gap-3 h-full bg-[#252525] p-5 rounded-2xl">
            {/* IMAGE */}
            <h1 className="text-2xl font-extrabold text-center">IMAGE</h1>
            {newProject.image ? (
              <div className="relative w-52 h-52 group">
                <img
                  src={newProject.image}
                  className="w-52 h-52 object-cover rounded-xl"
                />
                <button
                  className="absolute top-0 right-0 bg-rose-500 p-2 rounded-full text-white"
                  onClick={() => handleInputChange("image", null)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="project-image"
                className="w-52 h-52 bg-blue-600 hover:bg-blue-700 flex justify-center items-center cursor-pointer rounded-xl"
              >
                <FiPlus className="text-6xl text-white" />
                <input
                  type="file"
                  accept="image/*"
                  id="project-image"
                  hidden
                  onChange={(e) =>
                    handleInputChange(
                      "image",
                      URL.createObjectURL(e.target.files[0])
                    )
                  }
                />
              </label>
            )}

            {/* NAME */}
            <input
              type="text"
              placeholder="Enter project name"
              className="p-3 px-5 rounded-lg text-slate-700 mt-3"
              value={newProject.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Enter project description"
              className="p-3 px-5 rounded-lg text-slate-700 mt-3"
              value={newProject.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />

            {/* CATEGORY */}
            <select
              className="p-3 px-5 rounded-lg text-slate-700 mt-3"
              value={newProject.categoryId}
              onChange={(e) =>
                handleInputChange("categoryId", parseInt(e.target.value))
              }
            >
              <option value={0}>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col w-full bg-[#252525] rounded-lg p-5">
            <h1 className="text-2xl font-extrabold pb-5">DETAILS</h1>
            <div className="flex gap-5 overflow-auto p-5">
              {renderDetails()}
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 p-3 w-full rounded-lg text-white"
              onClick={addDetail}
              type="button"
            >
              Add Detail
            </button>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-5 mt-5">
          <button
            className="bg-green-600 p-3 rounded-lg text-white"
            type="submit"
          >
            Save Project
          </button>
          <button
            className="bg-gray-600 p-3 rounded-lg text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
