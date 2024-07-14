import React from "react";
import { useParams } from "react-router-dom";
import { projects } from "../Projects/data/data";
import SnakeGame from "../Projects/React Projects/snakeGame/SnakeGame";
import ErrorPage from "../Error/ErrorPage";

export default function ProjectDetailed() {
  const data = useParams();

  const returnComponent = (index) => {
    console.log(index, "here");

    switch (index) {
      case "Snake":
        return <SnakeGame />;
      case "Holiday Beach Bar":
        return;
    }
  };

  const handleProjectRender = () => {
    if (projects[data.id]) {
      return projects.map((value, index) => (
        <div key={value + index}>
          {value.id == data.id && returnComponent(value.name)}
        </div>
      ));
    } else return <ErrorPage />;
  };

  return <div>{handleProjectRender()}</div>;
}
