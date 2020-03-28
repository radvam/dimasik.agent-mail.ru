import React from "react";
import "./Score.css";

export default function Score(props) {
  return (
    <h2 className="score">
      Score: <span className="score-nubmer">{props.score}</span>
    </h2>
  );
}
