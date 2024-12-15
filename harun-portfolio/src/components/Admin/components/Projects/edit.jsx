"use client";

import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Projects from "./Projects";

export default function Edit({
  project,
  onCancel,
  projectData,
  setProjectData,
}) {
  // Initialize local state with the project passed as a prop
  const [projectInfo, setProjectInfo] = useState({ ...project });

  useEffect(() => {
    console.log("Editing project: ", projectInfo);
  }, [projectInfo]);

  // Render details with ability to add/remove/edit
  const renderDetails = () => {
    if (!projectInfo.details) return null;

    return projectInfo.details.map((detail, detailIndex) => (
      <div
        key={detailIndex}
        className="flex flex-col gap-5 w-64 h-[27rem] justify-evenly items-center bg-[#1d1d1d] p-5 rounded-2xl"
      >
        {/* Image Section */}
        <div className="relative w-52 h-52 group">
          {detail.image ? (
            <div className="absolute cursor-pointer backdrop-blur-sm top-0 left-0 opacity-0 group-hover:opacity-100 transition w-full h-full z-[1000] rounded-xl flex justify-center items-center flex-col">
              <button className="bg-blue-500/50 text-xl uppercase font-extrabold hover:bg-blue-600/50 active:bg-blue-700 transition text-white p-5 flex justify-center items-center w-full h-full rounded-t-xl">
                Change
              </button>
              <button
                className="bg-rose-500/50 text-xl uppercase font-extrabold hover:bg-rose-600/50 active:bg-rose-700 transition text-white p-5 flex justify-center items-center w-full h-full rounded-b-xl"
                onClick={() => removeDetail(detailIndex)}
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              className="absolute cursor-pointer top-0 left-0 transition bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-full h-full z-[1000] rounded-xl"
              onClick={() => addDetailImage(detailIndex)}
            >
              <span className="justify-center items-center font-extralight text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <FiPlus />
              </span>
            </div>
          )}
          {detail.image && (
            <img
              src={detail.image}
              className="min-w-52 max-w-52 h-52 object-cover rounded-xl z-0"
            />
          )}
        </div>

        {/* Description Section */}
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

        {/* Remove Detail Button */}
        <button
          className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 p-3 w-full px-5 rounded-lg"
          onClick={() => removeDetail(detailIndex)}
        >
          Remove Detail
        </button>
      </div>
    ));
  };

  const renderAddDetailButton = () => (
    <button
      className="min-w-64 h-[27rem] p-5 group bg-[#1d1d1d] rounded-2xl flex justify-center items-center flex-col"
      onClick={addDetail}
    >
      <div className="bg-blue-600/50 group-hover:bg-blue-700/50 active:bg-blue-800 transition w-full h-full flex justify-center items-center rounded-xl">
        <span className="text-6xl bg-blue-600 group-hover:bg-blue-700 group-active:bg-blue-800 transition p-3 rounded-full">
          <FiPlus />
        </span>
      </div>
    </button>
  );

  // Add a new detail
  const addDetail = () => {
    setProjectInfo((prev) => ({
      ...prev,
      details: [...(prev.details || []), { image: null, description: "" }],
    }));
  };

  // Remove a detail by index
  const removeDetail = (index) => {
    setProjectInfo((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  // Update detail description
  const updateDetailDescription = (index, value) => {
    setProjectInfo((prev) => {
      const updatedDetails = [...prev.details];
      updatedDetails[index].description = value;
      return { ...prev, details: updatedDetails };
    });
  };

  const saveChanges = () => {
    setProjectData((prevProjectData) => {
      const updatedList = prevProjectData.map((value) =>
        value.id === projectData.id ? projectInfo : value
      );

      return updatedList;
    });
    onCancel();
  };

  return (
    <div className="p-3">
      <div className="flex w-full flex-col">
        <div className="flex flex-row gap-5 items-start">
          {/* Project Image and General Info */}
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-col bg-[#252525] justify-center items-center rounded-2xl h-full">
              {/* Image Section */}
              <div className="p-5 rounded-lg justify-center items-center w-max">
                <h1 className="text-2xl font-extrabold text-center">IMAGE</h1>
                {projectInfo.image && (
                  <img
                    src={projectInfo.image}
                    className="w-52 h-52 object-cover rounded-xl"
                  />
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
              <div className="p-5 rounded-lg w-full">
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
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col w-full bg-[#252525] h-full rounded-lg p-5">
            <h1 className="text-2xl font-extrabold pb-5">DETAILS</h1>
            <div className="w-[40rem] flex gap-5 overflow-auto p-5 pt-0 shadow-inner">
              {renderDetails()}
              {renderAddDetailButton()}
            </div>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex gap-5 justify-end pt-5">
          <button
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 p-3 px-5 rounded-lg w-full border-b-green-800 hover:border-b-green-900 border-b-4"
            onClick={saveChanges}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 p-3 px-5 rounded-lg w-full border-b-gray-700 hover:border-b-gray-800 border-b-4"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
