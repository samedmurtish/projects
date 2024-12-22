"use client";

import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Projects from "./Projects";
import { collection, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../../database/firebase";
import supabase from "../../../../database/supabase";

export default function Edit({
  project,
  onCancel,
  setProjectData,
  categories,
}) {
  const [projectInfo, setProjectInfo] = useState({ ...project });
  const projectsRef = collection(database, "projects");
  const [tempImage, setTempImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderDetails = () => {
    if (!projectInfo.details) return null;

    return projectInfo.details.map((detail, detailIndex) => (
      <div
        key={detailIndex}
        className="flex flex-col gap-5 w-64 h-[27rem] justify-evenly items-center bg-[#1d1d1d] p-5 rounded-2xl"
      >
        <div className="relative w-52 h-52 group">
          {detail.imageUrl ? (
            <div className="absolute cursor-pointer backdrop-blur-sm top-0 left-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition w-full h-12 md:h-full rounded-xl flex justify-center items-center md:flex-col">
              <label
                htmlFor={`detail-image-${detailIndex}`}
                className="cursor-pointer bg-blue-500/50 text-white text-md md:text-xl uppercase font-extrabold hover:bg-blue-600/50 p-5 md:rounded-t-xl rounded-tl-xl w-full h-full flex justify-center items-center"
              >
                Change
              </label>
              <input
                type="file"
                accept="image/*"
                id={`detail-image-${detailIndex}`}
                hidden
                onChange={(e) => {
                  if (!e.target.files[0]) return;
                  const updatedDetails = [...projectInfo.details];
                  updatedDetails[detailIndex].imageUrl = URL.createObjectURL(
                    e.target.files[0]
                  );
                  setProjectInfo((prev) => ({
                    ...prev,
                    details: updatedDetails,
                  }));
                }}
              />
              <button
                onClick={() => {
                  const updatedDetails = [...projectInfo.details];
                  updatedDetails[detailIndex].imageUrl = null;
                  setProjectInfo((prev) => ({
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
          ) : (
            <div className="absolute cursor-pointer top-0 left-0 transition bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-full h-full z-[1000] rounded-xl">
              <label
                htmlFor={`detail-image-${detailIndex}`}
                className="w-52 h-52 cursor-pointer bg-blue-600 hover:bg-blue-700 flex justify-center items-center rounded-xl"
              >
                <span className="text-white text-6xl">
                  <FiPlus />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  id={`detail-image-${detailIndex}`}
                  hidden
                  onChange={(e) => {
                    if (!e.target.files[0]) return;
                    const updatedDetails = [...projectInfo.details];
                    updatedDetails[detailIndex].imageUrl = URL.createObjectURL(
                      e.target.files[0]
                    );
                    setProjectInfo((prev) => ({
                      ...prev,
                      details: updatedDetails,
                    }));
                  }}
                />
              </label>
            </div>
          )}
          {detail.imageUrl && (
            <img
              src={detail.imageUrl}
              className="min-w-52 max-w-52 h-52 object-cover rounded-xl z-0"
            />
          )}
        </div>

        <div>
          <h1>Description</h1>
          <textarea
            className="p-3 px-5 rounded-lg text-slate-700 w-full"
            value={detail.description}
            onChange={(e) =>
              updateDetailDescription(detailIndex, e.target.value)
            }
          ></textarea>
        </div>

        <button
          className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 p-3 w-full px-5 rounded-lg"
          onClick={() => removeDetail(detailIndex)}
          type="button"
        >
          Remove Detail
        </button>
      </div>
    ));
  };

  const addDetail = () => {
    setProjectInfo((prev) => ({
      ...prev,
      details: [...(prev.details || []), { image: null, description: "" }],
    }));
  };

  const removeDetail = (index) => {
    setProjectInfo((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  const updateDetailDescription = (index, value) => {
    setProjectInfo((prev) => {
      const updatedDetails = [...prev.details];
      updatedDetails[index].description = value;
      return { ...prev, details: updatedDetails };
    });
  };

  const saveChanges = async () => {
    setIsDisabled(true);
    const projectRef = doc(projectsRef, project.id);
    setLoading(true);

    try {
      let newProjectImageUrl = projectInfo.image;
      let newProjectImagePath = projectInfo.imagePath;

      if (tempImage) {
        if (projectInfo.imagePath) {
          await supabase.storage
            .from("project_images")
            .remove([`images/${projectInfo.imagePath}`]);
        }

        const fileName = `${projectInfo.name}-${Date.now()}`;
        const { error } = await supabase.storage
          .from("project_images")
          .upload(`images/${fileName}`, tempImage);

        if (!error) {
          newProjectImageUrl = `https://xjqscviwjivzzithxfel.supabase.co/storage/v1/object/public/project_images/images/${fileName}`;
          newProjectImagePath = fileName;
        }
      }

      const updatedDetails = await Promise.all(
        projectInfo.details.map(async (detail, index) => {
          if (!detail.image || detail.imageUrl) return detail;

          if (detail.imageName) {
            await supabase.storage
              .from("project_images")
              .remove([`images/${detail.imageName}`]);
          }

          const fileName = `${projectInfo.name}-detail-${index}-${Date.now()}`;
          const { error } = await supabase.storage
            .from("project_images")
            .upload(`images/${fileName}`, detail.image);

          if (!error) {
            return {
              ...detail,
              imageUrl: `https://xjqscviwjivzzithxfel.supabase.co/storage/v1/object/public/project_images/images/${fileName}`,
              imageName: fileName,
            };
          }

          return detail;
        })
      );

      const updatedProject = {
        ...projectInfo,
        image: newProjectImageUrl,
        imagePath: newProjectImagePath,
        details: updatedDetails,
      };

      await updateDoc(projectRef, updatedProject);
      setProjectData((prev) =>
        prev.map((item) => (item.id === project.id ? updatedProject : item))
      );
    } catch (error) {
      console.error("Error updating project:", error.message);
    } finally {
      setIsDisabled(false);
      setLoading(false);
      onCancel();
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveChanges();
      }}
      className="p-3 relative z-[0] h-full"
    >
      {loading && (
        <div className="absolute top-0 right-0 bg-black/50 w-full h-full flex justify-center items-center z-[10000]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-white"></div>
        </div>
      )}

      <div className="flex w-full h-full justify-between flex-col">
        <div className="flex flex-col md:flex-row gap-5 items-start overflow-y-auto">
          {/* Project Image and General Info */}
          <div className="flex flex-col justify-center items-center w-full md:w-full">
            <div className="flex flex-col bg-[#252525] justify-center items-center rounded-2xl w-full h-full">
              {/* Image Section */}
              <div className="pt-5 rounded-lg justify-center items-center md:w-max">
                <h1 className="text-2xl font-extrabold text-center">IMAGE</h1>
                {projectInfo.image ? (
                  <div className="relative w-52 h-52 group">
                    <img
                      src={projectInfo.image}
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
                          setProjectInfo((prev) => {
                            if (!e.target.files[0]) return prev;
                            return {
                              ...prev,
                              image: URL.createObjectURL(e.target.files[0]),
                            };
                          });
                          setTempImage(e.target.files[0]);
                        }}
                      />
                      <button
                        onClick={() => {
                          setProjectInfo((prev) => ({
                            ...prev,
                            image: null,
                          }));
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
                        setProjectInfo((prev) => {
                          if (!e.target.files[0]) return prev;
                          return {
                            ...prev,
                            image: URL.createObjectURL(e.target.files[0]),
                          };
                        });
                        setTempImage(e.target.files[0]);
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Name Section */}
              <div className="p-5 rounded-lg w-full">
                <h1 className="text-2xl font-extrabold text-center">NAME</h1>
                <input
                  type="text"
                  value={projectInfo.name}
                  onChange={(e) =>
                    setProjectInfo({ ...projectInfo, name: e.target.value })
                  }
                  className="p-3 px-5 rounded-lg text-slate-700 w-full"
                />
              </div>

              {/* Description Section */}
              <div className="px-5 rounded-lg w-full">
                <h1 className="text-2xl font-extrabold text-center">
                  DESCRIPTION
                </h1>
                <textarea
                  value={projectInfo.description}
                  onChange={(e) =>
                    setProjectInfo({
                      ...projectInfo,
                      description: e.target.value,
                    })
                  }
                  className="p-3 px-5 rounded-lg text-slate-700 w-full"
                ></textarea>
              </div>

              <div className="px-5 pb-5 rounded-lg w-full">
                <h1 className="text-2xl font-extrabold text-center">
                  CATEGORY
                </h1>
                <select
                  className="p-3 px-5 rounded-lg text-slate-700 mt-3 w-full"
                  value={projectInfo.categoryId}
                  onChange={(e) =>
                    setProjectInfo({
                      ...projectInfo,
                      categoryId: e.target.value,
                    })
                  }
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
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col min-w-[20rem] max-w-[40rem] bg-[#252525] rounded-lg p-5 w-full md:w-full">
            <h1 className="text-2xl font-extrabold pb-5">DETAILS</h1>
            {projectInfo.details.length > 0 && (
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

        {/* Save and Cancel Buttons */}
        <div className="flex gap-5 justify-end pt-5">
          <button
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 px-5 rounded-lg w-full border-b-blue-800 hover:border-b-blue-900 border-b-4 transition"
            type="submit"
            disabled={isDisabled}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 p-3 px-5 rounded-lg w-full border-b-gray-700 hover:border-b-gray-800 border-b-4 transition"
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
