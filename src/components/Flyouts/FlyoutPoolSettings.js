import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPrint } from "@fortawesome/free-solid-svg-icons";
import classes from "./FlyoutPoolSettings.css";

const FlyoutPoolSettings = ({ show, poolId, currentSelectedWeek }) => {
  if (!show) {
    return null;
  }

  // Add your flyout content here

  return (
    <ul className="dropdown-menu pull-right flyout-menu show ">
      <li>
        <a
          className="dropdown-item  "
          href={`/pools/${poolId}/${currentSelectedWeek}`}
        >
          <FontAwesomeIcon
            className="fal fa-pencil fa-fw mr-2 "
            icon={faPencil}
          />
          Edit Picks
        </a>
      </li>
      <li>
        <a className="dropdown-item">
          <FontAwesomeIcon className="fal fa-print fa-fw mr-2" icon={faPrint} />
          View/Print
        </a>
      </li>
    </ul>
  );
};

export default FlyoutPoolSettings;
