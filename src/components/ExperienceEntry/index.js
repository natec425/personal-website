import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const ExperienceEntryLogo = props => {
  const img = <img style={{ minWidth: 100 }} src={props.src} alt={props.alt} />;
  return props.href ? <a href={props.href}>{img}</a> : img;
};

const ExperienceEntry = props => (
  <section className="experience-entry">
    <section className="experience-entry__logo">
      <h3>
        {props.logo.href ? (
          <a href={props.logo.href}>{props.title}</a>
        ) : (
          props.title
        )}
      </h3>
      <ExperienceEntryLogo {...props.logo} />
    </section>
    <section className="experience-entry__software-developer">
      <h4>As a Software Developer...</h4>
      {props.asASoftwareDeveloper}
    </section>
    <section className="experience-entry__educator">
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
