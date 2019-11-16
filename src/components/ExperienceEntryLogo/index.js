import React from "react";
import PropTypes from "prop-types";

const ExperienceEntryLogo = props => (
  <a href={props.href}>
    <img style={{ minWidth: 100 }} src={props.src} alt={props.alt} />
  </a>
);

ExperienceEntryLogo.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string
};

export default ExperienceEntryLogo;
