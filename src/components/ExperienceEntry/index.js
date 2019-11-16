import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const ExperienceEntryLogo = props => {
  const img = <img style={{ minWidth: 100 }} src={props.src} alt={props.alt} />;
  return props.href ? <a href={props.href}>{img}</a> : img;
};

const ExperienceEntry = props => (
  <section class="experience-entry">
    <section class="experience-entry__logo">
      <h3>{props.title}</h3>
      <ExperienceEntryLogo {...props.logo} />
    </section>
    <section class="experience-entry__software-developer">
      <h4>As a Software Developer...</h4>
      {props.asASoftwareDeveloper}
    </section>
    <section class="experience-entry__educator">
      <h4>As an Educator...</h4>
      {props.asAnEducator}
    </section>
  </section>
);

ExperienceEntry.propTypes = {
  logo: PropTypes.object,
  asASoftwareDeveloper: PropTypes.element,
  asAnEducator: PropTypes.element
};

export default ExperienceEntry;
