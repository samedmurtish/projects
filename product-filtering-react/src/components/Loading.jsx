import React from "react";

export default function Loading() {
  return (
    <>
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading Products...</span>
      </div>
    </>
  );
}
