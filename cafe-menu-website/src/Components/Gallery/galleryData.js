import gallery1 from "../../assets/images/gallery-1.jpg";
import gallery2 from "../../assets/images/gallery-2.jpg";
import gallery3 from "../../assets/images/gallery-3.jpg";
import gallery4 from "../../assets/images/gallery-4.jpg";
import gallery5 from "../../assets/images/cafe.jpg";

export const galleryData = [
  {
    id: 0,
    category: "Beach",
    image: gallery3,
  },
  {
    id: 1,
    category: "Beach",
    image: gallery4,
  },
  {
    id: 2,
    category: "Bar",
    image: gallery1,
  },
  {
    id: 3,
    category: "Bar",
    image: gallery2,
  },
  { id: 4, category: "Bar", image: gallery5 },
];

export let sortedCategories = [];

export function sortCategories() {
  galleryData.map((value) => {
    let matches = false;
    sortedCategories.forEach((sortedValue) => {
      if (sortedCategories.length > 0)
        if (value.category == sortedValue) matches = true;
    });
    if (!matches) sortedCategories = [...sortedCategories, value.category];
  });
}

sortCategories();
