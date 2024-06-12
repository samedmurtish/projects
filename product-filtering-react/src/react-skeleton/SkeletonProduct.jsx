import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonProduct = (props) => (
  <ContentLoader
    speed={2}
    width={250}
    height={450}
    viewBox="0 0 200 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="200" height="190" />
    <rect x="25" y="210" rx="3" ry="3" width="150" height="7" />
    <rect x="40" y="230" rx="3" ry="3" width="120" height="7" />
    <rect x="70" y="250" rx="3" ry="3" width="60" height="7" />
    <rect x="0" y="280" rx="3" ry="3" width="140" height="30" />
    <rect x="150" y="280" rx="3" ry="3" width="60" height="30" />
  </ContentLoader>
);

export default SkeletonProduct;
