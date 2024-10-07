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
        className={`${valueIndex === 0 ? "rounded-tl-xl" : ""} ${
          valueIndex === product.images.length - 1
            ? "rounded-tr-xl md:rounded-tr-none"
            : ""
        } h-[120px] w-full border-slate-100 cursor-pointer border-2 bg-gray-200 hover:bg-gray-300 flex justify-center items-center`}
        key={valueIndex}
      >
        <img
          src={value}
          alt={product.title}
          className="h-[120px] w-full p-3 image object-cover"
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
        className="h-full w-[120px] md:w-full flex justify-center items-center border-1 overflow-hidden"
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
      className="h-[30rem] w-full bg-white flex flex-col md:flex-row border-2 border-slate-200 rounded-t-xl"
    >
      <div className="flex flex-row md:flex-col w-full h-[120px] md:h-full md:w-[120px] justify-start md:border-b-2 border-b-0 md:border-r-2">
        {imagesLoaded ? renderImages() : renderLoadingSideImages()}
      </div>
      <div className="h-full w-[400px] flex justify-center items-center overflow-hidden">
        {imagesLoaded ? (
          <img
            src={product.images.length > 0 ? showcaseImage : product.thumbnail}
            alt={product.title}
            className="w-full h-full image object-contain overflow-hidden"
          />
        ) : (
          renderLoadingMainImage()
        )}
      </div>
    </div>
  );
}
