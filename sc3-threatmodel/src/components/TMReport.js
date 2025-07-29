import React from "react";
import "./TM.css";

const TMReport = ({ entries }) => {
  return (
    <details className="tm-intro-details">
      <summary className="tm-intro-summary">
        &#x1F6A7; Threat Modelling Report
      </summary>
      <div>
        {/* Report content starts here */}
        <h3 className="tm-report-title">
            &#x1F6A7; Threat Modelling Report
        </h3>
      </div>
    </details>
  );
};

export default TMReport;