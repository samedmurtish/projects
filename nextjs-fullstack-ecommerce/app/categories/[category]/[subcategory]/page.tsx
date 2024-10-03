"use client";

import NavigationBar from "@/app/components/General/Navigation/NavigationBar";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const { subcategory } = useParams();

  console.log(subcategory);

  return (
    <div>
      <NavigationBar />
      <div className="w-3/4 mx-auto my-0">
        <h1>{subcategory}</h1>
      </div>
    </div>
  );
}
