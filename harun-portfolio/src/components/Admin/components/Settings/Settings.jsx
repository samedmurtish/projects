import React from "react";

export default function Settings({ setNavigationBarColor }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-extrabold p-5 text-center self-center">
        Settings
      </h1>
      <div>
        <div className="w-full h-max flex flex-col">
          <h1 className="p-5 bg-[#242424]">Navigation Bar</h1>
          <div className="flex flex-wrap bg[#212121]">
            <div className="px-5 py-3 bg-[#242424] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3">
              <h1>Text Color</h1>
              <input
                type="color"
                className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                title="Choose your color"
              />
            </div>
            <div className="px-5 py-3 bg-[#242424] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3">
              <h1>Background Color</h1>
              <input
                type="color"
                className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                title="Choose your color"
                onChange={(e) => {
                  setNavigationBarColor(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-max p-5 bg-[#242424]">
          <p>Footer</p>
        </div>
        <div className="w-full h-max p-5 bg-[#242424]">
          <p>Background Color</p>
        </div>
      </div>
    </div>
  );
}
