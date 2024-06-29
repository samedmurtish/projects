import tetris from "./Projects/Tetris Game/tetris.png";
import cpalette from "./Projects/Pixel Coloring/colorpalette.png";
import snake from "./Projects/Snake Game/snake.png";
import todo from "./Projects/ToDo List/todo.png";
import calculator from "./Projects/Basic Calculator/calculator.png";

export const projects = [
  {
    route: "tetris",
    name: "Tetris",
    description: "Tetris Game !",
    image: tetris,
    category: "Web Game",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    route: "pixel",
    name: "Pixel Coloring",
    description: "Pixel Coloring Game !",
    image: cpalette,
    category: "Web Game",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    route: "snake",
    name: "Snake",
    description: "Snake Game !",
    image: snake,
    category: "Web Game",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    route: "todolist",
    name: "To Do List",
    description: "To Do List !",
    image: todo,
    category: "Web Tool",
    languages: ["HTML", "CSS", "Javascript"],
  },
  {
    route: "calculator",
    name: "Basic Calculator",
    description: "Basic Calculator !",
    image: calculator,
    category: "Web Tool",
    languages: ["HTML", "CSS", "Javascript"],
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
