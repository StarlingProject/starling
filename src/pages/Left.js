import React from "react";
import starling from "./starling.png";
import social from "./social.jpg";

export default function Left() {
  return (
    <div>
      <div className="image">
        <img
          src={starling}
          style={{
            width: "28%",
            height: "15rem",
            objectFit: "fill",
            display: "block",
            margin: "auto",
          }}
        />
      </div>
      <div className="image">
        <img
          src={social}
          style={{
            width: "50%",
            height: "20rem",
            objectFit: "fill",
            display: "block",
            margin: "auto",
          }}
        />
      </div>
      <div className="slogan">
        <p>Explore more, Interact better</p>
      </div>
    </div>
  );
}
