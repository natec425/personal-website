import React from "react";

const Td = props => (
  <td className="what-ive-been-doing-td" {...props}>
    {props.children}
  </td>
);

export default Td;
