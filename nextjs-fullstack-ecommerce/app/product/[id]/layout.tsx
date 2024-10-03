import NavigationBar from "@/app/components/General/Navigation/NavigationBar";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen bg-white">
      <NavigationBar />
      {children}
    </div>
  );
}
