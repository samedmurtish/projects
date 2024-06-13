import React, { useState } from "react";
import RenderStars from "../Products/RenderStars";

export default function ImageShowcase({ product }) {
  const [showcaseImage, setShowcaseImage] = useState(product.images[0]);

  const renderImages = () => {
    return product.images.map((value, valueIndex) => (
      <div
        className="h-[120px] w-full border-2 border-slate-200 cursor-pointer border-t-0 border-x-0 bg-slate-300 hover:bg-slate-400 flex justify-center items-center"
        key={valueIndex}
      >
        <img
          key={valueIndex}
          src={value}
          alt={product.title}
          className="h-[120px] w-max "
          onMouseOver={() => {
            setShowcaseImage(value);
          }}
        />
      </div>
    ));
  };

  return (
    <div className="h-[364px] w-max bg-white flex flex-row border-2 border-slate-200">
      <div className="flex flex-col h-full w-[120px] justify-start border-r-2 overflow-y-auto">
        {renderImages()}
      </div>
      <div className="h-full w-[400px] flex justify-center items-center">
        <img src={showcaseImage} alt={product.title} className="w-max h-full" />
      </div>
    </div>
  );
}
