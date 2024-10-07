import React from "react";
import NavigationBar from "../Navigation/NavigationBar";
import NavigationBarMobile from "../Navigation/NavigationBarMobile";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-3/4 mx-auto my-0">{children}</div>;
}
