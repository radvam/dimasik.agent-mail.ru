import React from "react";
import "./Logo.css";

export default function Logo(props) {
  return (
    <h1>
      <a className="logo" href="./index.html">
        Song<span className="logo-bird">bird</span>
      </a>
    </h1>
  );
}
