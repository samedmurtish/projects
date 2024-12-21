import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { database } from "../../../../database/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import supabase from "../../../../database/supabase";

export default function NewProject({
  onCancel,
  setProjects,
  categories,
  getProjects,
}) {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: null,
    imagePath: null,
    categoryId: "",
    details: [],
  });

  const [tempImage, setTempImage] = useState(null);

  const projectsRef = collection(database, "projects");

  const [loading, setLoading] = useState(false);

  const uploadDetailImages = async () => {
    if (!newProject.details || newProject.details.length === 0) return [];

    const promises = newProject.details.map(async (detail, index) => {
      if (!detail.image) return { ...detail, imageUrl: null };

      const date = Date.now();
      const fileName = `${newProject.name}-detail-${index}-${date}`;

      const { error } = await supabase.storage
        .from("project_images")
        .upload(`images/${fileName}`, detail.image);

      if (error) {
        console.error("Error uploading detail image:", error.message);
        return { ...detail, imageUrl: null };
      }

      const imageUrl = `https://xjqscviwjivzzithxfel.supabase.co/storage/v1/object/public/project_images/images/${fileName}`;
      const imageName = fileName;

      return { description: detail.description, imageUrl, imageName };
    });

    const uploadedDetails = await Promise.all(promises);
    return uploadedDetails;
  };

  const uploadImage = async () => {
    if (!tempImage) return null;
    const date = Date.now();
    const { data, error } = await supabase.storage
      .from("project_images")
      .upload(`images/${newProject.name}-${date}`, tempImage);
    if (error) {
      console.log(error);
      return null;
    }
    return `${newProject.name}-${date}`;
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!newProject.name || !newProject.description || !newProject.categoryId) {
      alert("Please fill out all required fields!");
      return;
    }

    const imageName = await uploadImage();
    const imageUrl = imageName
      ? `https://xjqscviwjivzzithxfel.supabase.co/storage/v1/object/public/project_images/images/${imageName}`
      : null;

    const updatedDetails = await uploadDetailImages();

    const finalProject = {
      ...newProject,
      image: imageUrl,
      imagePath: imageName,
      details: updatedDetails,
    };

    try {
      const docRef = await addDoc(projectsRef, finalProject);

      const projectWithId = { ...finalProject, id: docRef.id };

      setProjects((prevProjects) => [...prevProjects, projectWithId]);
    } catch (error) {
      console.error("Error saving project:", error.message);
    } finally {
      setLoading(false);
      onCancel();
    }
  };

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
              <div className="absolute cursor-pointer backdrop-blur-sm top-0 left-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition w-full h-12 md:h-full rounded-xl flex justify-center items-center md:flex-col">
                <label
                  htmlFor={`detail-image-${index}`}
                  className="cursor-pointer bg-blue-500/50 text-white text-md md:text-xl uppercase font-extrabold hover:bg-blue-600/50 p-5 md:rounded-t-xl rounded-tl-xl w-full h-full flex justify-center items-center"
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
                    updatedDetails[index].image = e.target.files[0];
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
                  type="button"
                  className="bg-rose-500/50 text-white text-md md:text-xl uppercase font-extrabold hover:bg-rose-600/50 p-5 md:rounded-b-xl md:rounded-t-none rounded-tr-xl w-full h-full flex justify-center items-center"
                >
                  Remove
                </button>
              </div>
              <img
                src={URL.createObjectURL(detail.image)}
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
                  updatedDetails[index].image = e.target.files[0];
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
          type="button"
          className="bg-rose-600 hover:bg-rose-700 p-3 w-full rounded-lg text-white"
          onClick={() => removeDetail(index)}
        >
          Remove Detail
        </button>
      </div>
    ));

  return (
    <form
      className="p-3 h-full relative"
      onSubmit={(e) => {
        handleSave(e);
      }}
    >
      {loading && (
        <div className="absolute top-0 right-0 bg-black/50 w-full h-full flex justify-center items-center z-[1000000]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-white"></div>
        </div>
      )}
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col md:flex-row gap-5 items-start h-full">
          <div className="flex flex-col gap-3 w-full h-full bg-[#252525] p-5 rounded-2xl justify-center items-center">
            {/* IMAGE */}
            <h1 className="text-2xl font-extrabold text-center">IMAGE</h1>
            {newProject.image ? (
              <div className="relative w-52 h-52 group">
                <img
                  src={newProject.image}
                  className="w-52 h-52 object-cover rounded-xl"
                />

                <div className="absolute cursor-pointer backdrop-blur-sm top-0 left-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition w-full h-12 md:h-full rounded-xl flex justify-center items-center md:flex-col">
                  <label
                    htmlFor="project-image"
                    className="cursor-pointer bg-blue-500/50 text-white text-md md:text-xl uppercase font-extrabold hover:bg-blue-600/50 p-5 md:rounded-t-xl rounded-tl-xl w-full h-full flex justify-center items-center"
                  >
                    Change
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id={`project-image`}
                    hidden
                    onChange={(e) => {
                      handleInputChange(
                        "image",
                        URL.createObjectURL(e.target.files[0])
                      );
                      setTempImage(e.target.files[0]);
                    }}
                  />
                  <button
                    onClick={() => {
                      handleInputChange("image", null);
                    }}
                    type="button"
                    className="bg-rose-500/50 text-white text-md md:text-xl uppercase font-extrabold hover:bg-rose-600/50 p-5 md:rounded-b-xl md:rounded-t-none rounded-tr-xl w-full h-full flex justify-center items-center"
                  >
                    Remove
                  </button>
                </div>
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
                  onChange={(e) => {
                    handleInputChange(
                      "image",
                      URL.createObjectURL(e.target.files[0])
                    );
                    setTempImage(e.target.files[0]);
                  }}
                />
              </label>
            )}

            {/* NAME */}
            <input
              type="text"
              placeholder="Enter project name"
              className="p-3 px-5 rounded-lg text-slate-700 mt-3 w-full"
              value={newProject.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Enter project description"
              className="p-3 px-5 rounded-lg text-slate-700 mt-3 w-full"
              value={newProject.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />

            {/* CATEGORY */}
            <select
              className="p-3 px-5 rounded-lg text-slate-700 mt-3 w-full"
              value={newProject.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              required
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
          <div className="flex flex-col min-w-[20rem] w-full md:max-w-[40rem] bg-[#252525] rounded-lg p-5">
            <h1 className="text-2xl font-extrabold pb-5">DETAILS</h1>
            {newProject.details.length > 0 && (
              <div className="flex gap-5 overflow-auto p-5">
                {renderDetails()}
              </div>
            )}
            <button
              className="bg-blue-600 hover:bg-blue-700 p-3 max-w-full rounded-lg text-white"
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
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 rounded-lg text-white transition w-full"
            type="submit"
          >
            Add Project
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 p-3 rounded-lg text-white transition w-full"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
