import React from "react";
import background from "../../backgroundImages/background.svg";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex h-screen items-center justify-center text-slate-500`}
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className={`h-full min-w-full max-w-[600px] rounded-lg bg-[#002033] shadow-2xl md:h-max md:min-w-[400px]`}
      >
        {children}
      </div>
    </div>
  );
}
