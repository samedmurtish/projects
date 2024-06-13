import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function RenderStars({ stars }) {
  // Function to render star rating for a product
  const renderStars = (stars) => {
    let starList = [];

    const fixed = Math.floor(stars);

    // Render filled stars
    for (let index = 0; index < fixed; index++) {
      starList.push(<FaStar key={`star-${index}`} />);
    }

    // Render half star if applicable
    if (stars >= Math.floor(stars) + 0.5) {
      starList.push(<FaStarHalfAlt key={`half-star-${starList.length}`} />);
    }

    // Render empty stars to fill up to 5 stars
    let length = starList.length;
    while (length < 5) {
      starList.push(<FaRegStar key={`empty-star-${length}`} />);
      length++;
    }

    return <>{starList}</>;
  };
  return <>{renderStars(stars)}</>;
}
