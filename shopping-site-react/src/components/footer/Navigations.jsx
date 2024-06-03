import { list } from "postcss";
import React from "react";

export default function Navigations() {
  const text =
    "Snapdeal is India's leading pure-play value Ecommerce platform. Founded in 2010 by Kunal Bahl and Rohit Bansal, Snapdeal is one of the top four online lifestyle shopping destinations of India. Snapdeal brings together a wide assortment of good quality and value- priced merchandise on its platform. Snapdeal's vision is to enable the shoppers of Bharat to experience the joy of living their aspirations through reliable, value-for-money shopping. With a personalized, multilingual interface and cutting edge technology, Snapdeal has simplified the shopping experience for its value-conscious buyers by showcasing the most relevant products- products that are a good functional fit with their needs and of a quality that lasts- thereby delivering true value to its customers. With its commitment to high service standards, Snapdeal suppliers operate under a well structured ecosystem that enables them to offer great quality products at affordable prices. With majority of the value-seeking, middle-income, price-conscious buyers coming from the non-metros, Snapdeal`s logistics networks powered by third party logistics cover more than 96% of India`s pin codes enabling order deliveries to more than 2500 towns and cities and expanding. Further, Snapdeal's mission is to become India`s value lifestyle omni-channel leader. We are excited about continuing to build a complete ecosystem around value commerce, where we can serve Bharat consumers wherever they are on their offline to online shopping journey. Snapdeal is part of the AceVector Group and one of India`s best-known e-commerce companies with an exclusive focus on the value segment.";

  const displayCategory = (category) => {
    return category.map((value, index) => (
      <a
        key={index}
        className="hover:underline hover:cursor-pointer flex flex-row text-nowrap flex-nowrap h-fit"
      >
        {value} {index < category.length - 1 && <p className="px-1">/</p>}
      </a>
    ));
  };
  const womenCategory = [
    "Tops for Women",
    "Kurti",
    "Cotton Sarees",
    "Georgette Sarees",
    "Chiffon Sarees",
    "Net Sarees",
    "Dresses for Women",
    "Jumpsuit for Women",
    "Jeans for Women",
    "Salwar Suit",
    "Bra",
    "Jacket for Women",
    "Night Dress for Women",
    "Sweatshirt for Women",
    "Shorts for Women",
    "Readymade Blouse",
    "Dupatta",
    "T Shirt for Women",
    "Shirts for Women",
    "Skirts for Women",
    "Ethnic wear for Women",
    "Western Dresses for Women",
    "Leggings for Women",
  ];
  const menCategory = [
    "Shirts for Men",
    "Casual Shirts for Men",
    "Formal Shirts for Men",
    "Hoodies for Men",
    "Cotton Shirts for Men",
    "T Shirts for Men",
    "Polo T shirts",
    "Kurta Pajama for Men",
    "White Shirt",
    "Black Shirt",
    "Lower for Men",
    "Trousers for Men",
    "Jacket for Men",
    "Formal Pants for Men",
    "Tracksuit for Men",
    "Jeans for Men",
    "Kurta Payjama Sets",
    "Kurta for Men",
    "Blazer for Men",
    "Sweater for Men",
  ];
  return (
    <div className="shadow bg-gray-100 py-10 text-xs text-gray-500 text-pretty border-2 border-gray-200">
      <div className="w-5/6 mx-auto my-0 h-full flex flex-col justify-between items-center ">
        <div className="flex">
          <a className="hover:underline hover:cursor-pointer inline pr-3">
            <span className="font-semibold">Mens: </span>
          </a>
          <div className="flex flex-wrap">{displayCategory(menCategory)}</div>
        </div>
        <div className="flex">
          <a className="hover:underline hover:cursor-pointer inline pr-3">
            <span className="font-semibold">Women: </span>
          </a>
          <div className="flex flex-wrap">{displayCategory(womenCategory)}</div>
        </div>
        <p className="py-5">{text}</p>
      </div>
    </div>
  );
}
