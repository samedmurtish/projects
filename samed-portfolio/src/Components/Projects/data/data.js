import tetris from "./Project Logos/Tetris Game/tetris.png";
import cpalette from "./Project Logos/Pixel Coloring/colorpalette.png";
import snake from "./Project Logos/Snake Game/snake.png";
import todo from "./Project Logos/ToDo List/todo.png";
import calculator from "./Project Logos/Basic Calculator/calculator.png";
import cafe from "./Project Logos/Holiday/logo.png";
import ecommerce from "./Project Logos/eCommerce/logo.png";
import ecommerceClone from "./Project Logos/eCommerce Clone/logo.png";

export const projects = [
  {
    id: 0,
    purejs: false,
    react: true,
    reactRoute: "holiday",
    name: "Holiday Beach Bar",
    description: "Holiday Beach Bar Website !",
    image: cafe,
    category: "eCommerce",
    languages: ["React", "TailwindCSS", "Javascript"],
  },
  {
    id: 1,
    purejs: true,
    route: "tetrisGame",
    name: "Tetris",
    description: "Tetris Game !",
    image: tetris,
    category: "Web Game",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    id: 2,
    purejs: true,
    route: "pixelColoringGame",
    name: "Pixel Coloring",
    description: "Pixel Coloring Game !",
    image: cpalette,
    category: "Web Game",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    id: 3,
    purejs: false,
    name: "Snake",
    description: "Snake Game !",
    image: snake,
    category: "Web Game",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    id: 4,
    purejs: true,
    route: "to-do-list",
    name: "To Do List",
    description: "To Do List !",
    image: todo,
    category: "Web Tool",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    id: 5,
    purejs: true,
    route: "basicCalculator",
    name: "Basic Calculator",
    description: "Basic Calculator !",
    image: calculator,
    category: "Web Tool",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    id: 6,
    purejs: false,
    react: true,
    reactRoute: "ecommerce",
    name: "eCommerce Prototype Website",
    description: "eCommerce Prototype Website !",
    image: ecommerce,
    category: "eCommerce",
    languages: ["React", "TailwindCSS", "Javascript", "API"],
  },
  {
    id: 7,
    purejs: false,
    react: true,
    reactRoute: "ecommerce-clone",
    name: "eCommerce Clone Website",
    description: "eCommerce Clone Website !",
    image: ecommerceClone,
    category: "eCommerce",
    languages: ["React", "TailwindCSS", "Javascript"],
  },
];

export let sortedCategories = [];

export function sortCategories() {
  projects.map((value) => {
    let matches = false;
    sortedCategories.forEach((sortedValue) => {
      if (sortedCategories.length > 0)
        if (value.category == sortedValue) matches = true;
    });
    if (!matches) sortedCategories = [...sortedCategories, value.category];
  });
}

sortCategories();
