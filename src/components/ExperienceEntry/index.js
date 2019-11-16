import React from "react";
import ExperienceEntryLogo from "../ExperienceEntryLogo";
import PropTypes from "prop-types";
import Td from "../Td";

const ExperienceEntry = props => (
  <tr>
    <td className="hide-on-small">
      <ExperienceEntryLogo {...props.logo} />
    </td>
    <Td>{props.asASoftwareDeveloper}</Td>
    <Td>{props.asAnEducator}</Td>
  </tr>
);

ExperienceEntry.propTypes = {
  logo: PropTypes.object,
  asASoftwareDeveloper: PropTypes.element,
  asAnEducator: PropTypes.element
};

export default ExperienceEntry;
