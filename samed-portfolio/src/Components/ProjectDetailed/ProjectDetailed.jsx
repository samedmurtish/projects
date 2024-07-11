import React from "react";
import { useParams } from "react-router-dom";
import { projects } from "../Projects/data/data";
import SnakeGame from "../../Projects/snakeGame/SnakeGame";
import ErrorPage from "../Error/ErrorPage";
import TetrisGame from "../../Projects/tetrisGame/TetrisGame";

export default function ProjectDetailed() {
  const data = useParams();

  const handleProjectRender = () => {
    if (projects[data.id]) {
      if (projects[data.id].purejs) {
        if (data.id == 0) return <TetrisGame />;
        else if (data.id == 1) return;
        else if (data.id == 2) return <SnakeGame />;
        else if (data.id == 3) return;
        else if (data.id == 4) return;
      }
    } else return <ErrorPage />;
  };

  return <div>{handleProjectRender()}</div>;
}
