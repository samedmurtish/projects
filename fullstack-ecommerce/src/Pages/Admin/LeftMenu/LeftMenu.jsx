import React from "react";

export default function LeftMenu() {
  return (
    <div className="h-full w-52 bg-slate-700 text-white fixed">
      <div className="w-full flex justify-center items-center p-4 font-semibold border-b-2 border-b-slate-600">
        Admin Panel
      </div>
      <div className="mt-3 flex flex-col">
        <div className="px-3 py-2 bg-slate-800 font-semibold text-xs flex justify-center items-center">
          GENERAL
        </div>
        <div className="flex flex-col gap-1 p-3">
          <div className="border-b-2 bg-slate-600 hover:bg-slate-500 hover:shadow-inner border-b-slate-500 p-3 hover:border-b-white transition cursor-pointer">
            Overview
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col">
        <div className="px-3 py-2 bg-slate-800 font-semibold text-xs flex justify-center items-center">
          PRODUCT MANAGEMENT
        </div>
        <div className="flex flex-col gap-1 p-3">
          <div className="border-b-2 bg-slate-600 hover:bg-slate-500 hover:shadow-inner border-b-slate-500 p-3 hover:border-b-white transition cursor-pointer">
            Manage
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col">
        <div className="px-3 py-2 bg-slate-800 font-semibold text-xs flex justify-center items-center">
          SETTINGS
        </div>
        <div className="flex flex-col gap-1 p-3">
          <div className="border-b-2 bg-slate-600 hover:bg-slate-500 hover:shadow-inner border-b-slate-500 p-3 hover:border-b-white transition cursor-pointer">
            Users
          </div>
        </div>
      </div>
    </div>
  );
}
