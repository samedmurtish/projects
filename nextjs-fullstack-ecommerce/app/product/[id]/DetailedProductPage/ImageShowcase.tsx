"use client";
import React, { useEffect, useState, useRef } from "react";

// import SkeletonProductSideImages from "../../react-skeleton/SkeletonProductSideImages";
// import SkeletonProductImage from "../../react-skeleton/SkeletonProductImage";

export default function ImageShowcase({ product }: any) {
  const [showcaseImage, setShowcaseImage] = useState(product.images[0]);
  const [imagesLoaded, setImagesLoaded] = useState(true);
  const imageContainerRef: any = useRef();

  useEffect(() => {
    const images = imageContainerRef.current.querySelectorAll("img");
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach((img: any) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });

    // Clean up event listeners on unmount
    return () => {
      images.forEach((img: any) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, [product.images]);

  const renderImages = () => {
    return product.images.map((value: any, valueIndex: any) => (
      <div
        className="h-[120px] w-full border-2 border-slate-100 cursor-pointer border-t-0 border-x-0 bg-gray-200 hover:bg-gray-300 flex justify-center items-center"
        key={valueIndex}
      >
        <img
          src={value}
          alt={product.title}
          className="h-[120px] w-max p-3 image"
          onMouseOver={() => {
            setShowcaseImage(value);
          }}
        />
      </div>
    ));
  };

  const renderLoadingSideImages = () => {
    return product.images.map((value: any, valueIndex: any) => (
      <div
        className="h-full w-full flex justify-center items-center border-1 overflow-hidden"
        key={valueIndex}
      >
        {/* <SkeletonProductSideImages /> */}
      </div>
    ));
  };

  const renderLoadingMainImage = () => {
    return (
      <div
        className="h-full w-full flex justify-center items-center overflow-hidden "
        key={"image"}
      >
        {/* <SkeletonProductImage /> */}
      </div>
    );
  };

  return (
    <div
      ref={imageContainerRef}
      className="h-[364px] w-max bg-white flex flex-row border-2 border-slate-200"
    >
      <div className="flex flex-col h-full w-[120px] justify-start border-r-2 overflow-y-auto">
        {imagesLoaded ? renderImages() : renderLoadingSideImages()}
      </div>
      <div className="h-full w-[400px] flex justify-center items-center">
        {imagesLoaded ? (
          <img
            src={showcaseImage}
            alt={product.title}
            className="w-max h-full image"
          />
        ) : (
          renderLoadingMainImage()
        )}
      </div>
    </div>
  );
}
