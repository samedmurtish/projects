import React from "react";
import { FiDivideCircle, FiMinus, FiPlus } from "react-icons/fi";

export default function Edit({ project }) {
  console.log(project);

  const renderDetails = () => {
    if (!project.details) return null;
    return project.details.map((detail, detailIndex) => (
      <div
        className="flex flex-col gap-5 w-64 h-[27rem] justify-center items-center bg-[#1d1d1d] p-5 rounded-2xl"
        key={detailIndex}
      >
        <div className="relative w-52 h-52 group">
          {detail.image ? (
            <div className="absolute cursor-pointer backdrop-blur-sm top-0 left-0 opacity-0 group-hover:opacity-100 transition w-full h-full z-[1000] rounded-xl flex justify-center items-center flex-col">
              <button className="bg-blue-500/50 text-xl uppercase font-extrabold hover:bg-blue-600/50 active:bg-blue-700 transition text-white p-5 flex justify-center items-center w-full h-full rounded-t-xl">
                Change
              </button>
              <button className="bg-rose-500/50  text-xl uppercase font-extrabold hover:bg-rose-600/50 active:bg-rose-700 transition text-white p-5 flex justify-center items-center w-full h-full rounded-b-xl">
                Remove
              </button>
            </div>
          ) : (
            <div className="absolute cursor-pointer top-0 left-0 transition bg-[#435fff] w-full h-full z-[1000] rounded-xl">
              <span className="justify-center items-center opacity-100 font-extralight text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <FiPlus />
              </span>
            </div>
          )}
          <img
            src={detail.image}
            className="min-w-52 max-w-52 h-52 object-cover rounded-xl z-0"
          />
        </div>
        <div>
          <h1>Description</h1>
          <textarea
            className="p-3 px-5 rounded-lg text-slate-700 w-full"
            placeholder={detail.description}
          ></textarea>

          <button className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 p-3 w-full px-5 rounded-lg">
            Remove Detail
          </button>
        </div>
      </div>
    ));
  };

  const renderAddDetailButton = () => {
    return (
      <button
        className="min-w-64 p-5 group bg-[#1d1d1d] rounded-xl flex justify-center items-center flex-col"
        onClick={() => {
          project.details.push({ image: null, description: "" });
        }}
      >
        <div className="bg-blue-600/50 hover:bg-blue-700/50 active:bg-blue-800 w-full h-full flex justify-center items-center rounded-xl">
          <span className="text-6xl bg-blue-600 group-hover:bg-blue-700 group-active:bg-blue-800 p-3 ">
            <FiPlus />
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="p-3">
      <div>
        <div className="flex w-full">
          <div className="flex gap-5 items-start">
            <div className="flex flex-col gap-2 bg-[#252525] p-5 rounded-lg">
              <h1 className="text-2xl font-extrabold text-center">IMAGE</h1>
              <div className="relative w-52 h-52 group">
                <div className="absolute cursor-pointer backdrop-blur-sm top-0 left-0 opacity-0 group-hover:opacity-100 transition w-full h-full z-[1000] rounded-xl flex justify-center items-center flex-col">
                  <button className="bg-blue-500/50 text-xl uppercase font-extrabold hover:bg-blue-600/50 active:bg-blue-700 transition text-white p-5 flex justify-center items-center w-full h-full rounded-t-xl">
                    Change
                  </button>
                  <button className="bg-rose-500/50  text-xl uppercase font-extrabold hover:bg-rose-600/50 active:bg-rose-700 transition text-white p-5 flex justify-center items-center w-full h-full rounded-b-xl">
                    Remove
                  </button>
                </div>
                <img
                  src={project.image}
                  className="w-52 h-52 object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 bg-[#252525] p-5 rounded-lg">
                <h1 className="text-2xl font-extrabold">NAME</h1>
                <input
                  type="text"
                  placeholder={project.name}
                  className="p-3 px-5 rounded-lg text-slate-700"
                />
              </div>
              <div className="flex flex-col gap-2 bg-[#252525] p-5 rounded-lg">
                <h1 className="text-2xl font-extrabold">DESCRIPTION</h1>
                <textarea
                  type="text"
                  placeholder={project.description}
                  className="p-3 px-5 rounded-lg text-slate-700"
                />
              </div>
            </div>
            <div className="flex flex-col bg-[#252525] rounded-lg p-5">
              <h1 className="text-2xl font-extrabold pb-5">DETAILS</h1>
              <div className="w-96">
                <div className="flex gap-5 overflow-auto w-full p-5 pt-0 shadow-inner">
                  {renderDetails()}
                  {renderAddDetailButton()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
