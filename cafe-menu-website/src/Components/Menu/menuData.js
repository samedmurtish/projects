import categoryImage1 from "../../assets/images/food-1.jpg";
import categoryImage2 from "../../assets/images/desert-2.jpg";
import categoryImage3 from "../../assets/images/drinks-1.jpg";
import categoryImage4 from "../../assets/images/alcoholic-1.jpg";

import food1 from "../../assets/images/food-1.jpg";
import food2 from "../../assets/images/food-2.jpg";
import food3 from "../../assets/images/food-3.jpg";
import food4 from "../../assets/images/food-4.jpg";

import desert1 from "../../assets/images/desert-1.jpg";
import desert2 from "../../assets/images/desert-2.jpg";

import alcoholic1 from "../../assets/images/alcoholic-1.jpg";
import alcoholic2 from "../../assets/images/alcoholic-2.jpg";
import alcoholic3 from "../../assets/images/alcoholic-3.jpg";
import alcoholic4 from "../../assets/images/alcoholic-4.jpg";
import alcoholic5 from "../../assets/images/alcoholic-5.jpg";

import drinks1 from "../../assets/images/drinks-1.jpg";
import drinks2 from "../../assets/images/drinks-2.jpg";
import drinks3 from "../../assets/images/drinks-3.jpg";

export const menu = [
  {
    id: 0,
    title: "Foods",
    category: "foods",
    image: categoryImage1,
    items: [
      { id: 0, name: "Crispy Chicken", image: food1, price: 100 },
      { id: 1, name: "Spaghetti", image: food2, price: 100 },
      { id: 2, name: "Spaghetti w/sauce", image: food3, price: 100 },
      { id: 3, name: "Crispy Burger", image: food4, price: 100 },
    ],
  },
  {
    id: 1,
    title: "Deserts",
    category: "deserts",
    image: categoryImage2,
    items: [
      { id: 0, name: "Pancake", image: desert1, price: 100 },
      { id: 1, name: "Pancake", image: desert2, price: 100 },
    ],
  },
  {
    id: 2,
    title: "Drinks",
    category: "drinks",
    image: categoryImage3,
    items: [
      { id: 0, name: "Americano", image: drinks1, price: 100 },
      { id: 1, name: "Macchiato", image: drinks2, price: 100 },
      { id: 2, name: "Sparkling Water", image: drinks3, price: 100 },
    ],
  },
  {
    id: 3,
    title: "Alcoholic Drinks",
    category: "alcohol",
    image: alcoholic2,
    items: [
      { id: 0, name: "Alcohol", image: alcoholic1, price: 100 },
      { id: 1, name: "Alcohol", image: alcoholic2, price: 100 },
      { id: 2, name: "Alcohol", image: alcoholic3, price: 100 },
      { id: 3, name: "Alcohol", image: alcoholic4, price: 100 },
      { id: 4, name: "Alcohol", image: alcoholic5, price: 100 },
    ],
  },
];
