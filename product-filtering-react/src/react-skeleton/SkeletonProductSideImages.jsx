import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonProductSideImages = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={500}
    viewBox="0 0 500 2000"
    backgroundColor="#fcfcfc"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="2000" height="5000" />
  </ContentLoader>
);

export default SkeletonProductSideImages;
