import NavigationBar from "@/app/(pages)/components/General/Navigation/NavigationBar";
import NavigationBarMobile from "@/app/(pages)/components/General/Navigation/NavigationBarMobile";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-screen bg-white">{children}</div>;
}
