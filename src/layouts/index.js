import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import "./index.css";
import appleTouchIcon from "../../images/apple-touch-icon.png";
import favicon32x32 from "../../images/favicon-32x32.png";
import favicon16x16 from "../../images/favicon-16x16.png";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Nate Clark">
      <html lang="en" />
      <meta
        name="Description"
        content="Nate Clark's home page. Nate is a Software Developer and Educator in Water Valley, MS."
      />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
    </Helmet>
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: "60rem",
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0
      }}
    >
      {children}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default TemplateWrapper;
