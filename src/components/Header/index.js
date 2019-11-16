import React from "react";
import Link from "gatsby-link";
import "./index.css";

const Header = () => (
  <div className="header-container">
    <div className="header-main-section">
      <h1 className="name-link-container">
        <Link to="/">Nate Clark</Link>
      </h1>
      <h3 className="title-container block-if-small">Software Developer</h3>
      <h3 className="title-container block-if-small">Educator</h3>
    </div>
  </div>
);

export default Header;
