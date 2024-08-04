import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex justify-center items-center bg-zinc-100 text-slate-500">
      <div className="rounded-lg bg-white shadow-2xl min-w-full md:min-w-[400px] max-w-[600px] md:h-max h-full">
        {children}
      </div>
    </div>
  );
}
