import React, { useState } from "react";
import RenderStars from "../Products/RenderStars";

export default function ImageShowcase({ product }) {
  const [showcaseImage, setShowcaseImage] = useState(product.images[0]);

  const renderImages = () => {
    return product.images.map((value, valueIndex) => (
      <img
        key={valueIndex}
        src={value}
        alt={product.title}
        className="h-max w-full border-2 border-slate-200 cursor-pointer border-t-0 border-x-0"
        onMouseOver={() => {
          setShowcaseImage(value);
        }}
      />
    ));
  };

  return (
    <div className="h-[400px] w-max bg-white flex flex-row border-2 border-slate-200">
      <div className="flex flex-col h-full w-[120px] justify-start border-r-2 overflow-y-auto">
        {renderImages()}
      </div>
      <div className="h-full w-[400px] ">
        <img
          src={showcaseImage}
          alt={product.title}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
