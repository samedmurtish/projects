import React from "react";
import NavigationBar from "../Navigation/NavigationBar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
}
