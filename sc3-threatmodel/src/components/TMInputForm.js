import React, { useEffect, useState } from "react";
import "./TM.css";

const TMInputForm = ({ 
  entries,
  form,
  setForm,
  handleChange,
  handleSubmit,
  handleCancel,
  editIndex = null,
  fieldsOpen, 
  setFieldsOpen,
  dreadStats,
  dreadRiskColors,
  dataClassificationColors,
  businessCriticalityColors,
  statusColors,
  priorityColors,
  actionColors,
  lastThreat,
}) => {
  // State for view mode (basic or extended)
  const [viewMode, setViewMode] = useState('basic');

  // Use centralized DREAD stats from TMForm
  const { dreadAverage, dreadRisk } = dreadStats(form);

  // Helper functions to get text values for coloring
  const getDataClassificationText = (value) => {
    const mapping = {
      "1": "Public",
      "2": "Internal", 
      "3": "Confidential",
      "4": "Restricted",
      "5": "Highly Restricted"
    };
    return mapping[value] || "Not Set";
  };

  const getBusinessCriticalityText = (value) => {
    const mapping = {
      "1": "Platinum / Tier 1",
      "2": "Gold / Tier 2",
      "3": "Silver / Tier 3", 
      "4": "Bronze / Tier 4",
      "5": "None / Tier 5"
    };
    return mapping[value] || "Not Set";
  };

  // Robustly pre-fill all fields except Threat ID and Assessed Date in the Threat Model Details fieldset from lastThreat when starting a new entry
  useEffect(() => {
    if (
      editIndex === null &&
      lastThreat &&
      fieldsOpen &&
      !form.threatId && // Only when there's no threat ID (new entry)
      form.threatDescription === "" // And no description yet
    ) {
      // Pre-fill Threat Model Details fields except Threat ID and Assessed Date
      const prefillFields = [
        "threatDescription",
        "assessedBy",
        "designLocation",
        "source",
        "target",
        "protocols",
        "authentication",
        "dataFlow",
        "dataClassification",
        "businessProcess",
        "businessCriticality"
      ];
      const newForm = { ...form };
      prefillFields.forEach(field => {
        newForm[field] = lastThreat[field] !== undefined ? lastThreat[field] : (typeof newForm[field] === "number" ? 0 : "");
      });
      setForm(newForm);
    }
  }, [editIndex, lastThreat, fieldsOpen, form.threatId, form.threatDescription, setForm]);

  // Automatically set CVSS classification based on score
  useEffect(() => {
    if (form.cvssScore !== "" && form.cvssScore !== undefined && form.cvssScore !== null) {
      const score = parseFloat(form.cvssScore);
      if (!isNaN(score)) {
        let classification = "";
        if (score === 0.0) {
          classification = "None";
        } else if (score >= 0.1 && score <= 3.9) {
          classification = "Low";
        } else if (score >= 4.0 && score <= 6.9) {
          classification = "Medium";
        } else if (score >= 7.0 && score <= 8.9) {
          classification = "High";
        } else if (score >= 9.0 && score <= 10.0) {
          classification = "Critical";
        }
        
        if (classification !== "" && form.cvssClassification !== classification) {
          setForm(prevForm => ({
            ...prevForm,
            cvssClassification: classification
          }));
        }
      }
    }
  }, [form.cvssScore, form.cvssClassification, setForm]);

  return (    
    <form onSubmit={handleSubmit}>
      <details
        open={fieldsOpen}
        onToggle={e => {
          if (typeof setFieldsOpen === 'function') {
            setFieldsOpen(e.target.open);
          } else {
            console.warn('setFieldsOpen is not a function:', setFieldsOpen);
          }
        }}
      >
        <summary className="tm-inputform-summary">
          Threat Modelling Form Fields
        </summary>

        {/* View Mode Toggle */}
        <div className="tm-viewmode-container">
          <label>
            View Mode:
          </label>
          <div className="tm-viewmode-options">
            <label>
              <input
                type="radio"
                value="basic"
                checked={viewMode === 'basic'}
                onChange={(e) => setViewMode(e.target.value)}
              />
              Basic (Essential fields only)
            </label>
            <label>
              <input
                type="radio"
                value="extended"
                checked={viewMode === 'extended'}
                onChange={(e) => setViewMode(e.target.value)}
              />
              Extended (All fields)
            </label>
          </div>
        </div>

        <div>
          <table className="tm-inputform-table">
            <tbody>
              {/* Threat Model Details */ }
              <tr>
                <td colSpan={2}>
                  <fieldset className="tm-inputform-fieldset tm-inputform-fieldset-threat">
                    <legend className="tm-inputform-legend tm-inputform-legend-threat">
                      Threat Model Details - what are we working on?
                    </legend>
                    <table className="tm-inputform-field-table">
                      <tbody>
                        <tr title="A unique identifier for the threat model entry (e.g., a TM-001)">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Threat ID:<span className="tm-required">*</span></label></td>
                          <td>
                            <input
                              type="text"
                              name="threatId"
                              value={form.threatId}
                              onChange={handleChange}
                              required
                              className="tm-input"
                            /></td>
                        </tr>
                        <tr>
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Threat Description:<span className="tm-required">*</span></label></td>
                          <td>
                            <textarea
                              name="threatDescription"
                              value={form.threatDescription}
                              onChange={handleChange}
                              required
                              className="tm-input"
                            /></td>
                        </tr>
                        {viewMode === 'extended' && (
                          <>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Assessed By:</label></td>
                              <td>
                                <input
                                  type="text"
                                  name="assessedBy"
                                  value={form.assessedBy}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Assessed Date:</label></td>
                              <td>
                                <input
                                  type="date"
                                  name="assessedDate"
                                  value={form.assessedDate}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Design Location (URL):</label></td>
                              <td>
                                <input
                                  type="url"
                                  name="designLocation"
                                  value={form.designLocation}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Source:</label></td>
                              <td>
                                <textarea
                                  name="source"
                                  value={form.source}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Target:</label></td>
                              <td>
                                <textarea
                                  name="target"
                                  value={form.target}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Protocol(s):</label></td>
                              <td>
                                <textarea
                                  name="protocols"
                                  value={form.protocols}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Authentication:</label></td>
                              <td>
                                <textarea
                                  name="authentication"
                                  value={form.authentication}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Data Flow:</label></td>
                              <td>
                                <textarea
                                  name="dataFlow"
                                  value={form.dataFlow}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                            <tr>
                              <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Business Process:</label></td>
                              <td>
                                <input
                                  type="text"
                                  name="businessProcess"
                                  value={form.businessProcess}
                                  onChange={handleChange}
                                  className="tm-input"
                                /></td>
                            </tr>
                          </>
                        )}                        
                        <tr>
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Data Classification:</label></td>
                          <td>
                            <select
                              name="dataClassification"
                              value={form.dataClassification}
                              onChange={handleChange}
                              className="tm-input"
                              style={{ 
                                color: form.dataClassification ? dataClassificationColors[getDataClassificationText(form.dataClassification)] || "#333" : "#333",
                                fontWeight: form.dataClassification ? "bold" : "normal"
                              }}
                            >
                              <option value="">Select...</option>
                              <option value="1">Public</option>
                              <option value="2">Internal</option>
                              <option value="3">Confidential</option>
                              <option value="4">Restricted</option>
                              <option value="5">Highly Restricted</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Business Criticality:</label></td>
                          <td>
                            <select
                              name="businessCriticality"
                              value={form.businessCriticality}
                              onChange={handleChange}
                              className="tm-input"
                              style={{ 
                                color: form.businessCriticality ? businessCriticalityColors[getBusinessCriticalityText(form.businessCriticality)] || "#333" : "#333",
                                fontWeight: form.businessCriticality ? "bold" : "normal"
                              }}
                            >
                              <option value="">Select...</option>
                              <option value="1">Platinum / Tier 1</option>
                              <option value="2">Gold / Tier 2</option>
                              <option value="3">Silver / Tier 3</option>
                              <option value="4">Bronze / Tier 4</option>
                              <option value="5">None / Tier 5</option>
                            </select>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </td>
              </tr>
              {/* STRIDE Assessment */}
              <tr>
                <td colSpan={2}>
                  <fieldset className="tm-inputform-fieldset tm-inputform-fieldset-stride">
                    <legend className="tm-inputform-legend tm-inputform-legend-stride">
                      STRIDE Assessment - what can go wrong?
                    </legend>
                    <table className="tm-inputform-field-table">
                      <tbody>
                        <tr title="Is the threat capable of impersonating a user or system?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Spoofing:</label></td>
                          <td>
                            <textarea
                              name="spoofing"
                              value={form.spoofing}
                              onChange={handleChange}
                              className="tm-input"
                            /></td>
                        </tr>
                        <tr title="Can the threat modify data in transit or at rest?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Tampering:</label></td>
                          <td>
                            <textarea
                              name="tampering"
                              value={form.tampering}
                              onChange={handleChange}
                              className="tm-input"
                            /></td>
                        </tr>
                        <tr title="Can the user deny their actions?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Repudiation:</label></td>
                          <td>
                            <textarea
                              name="repudiation"
                              value={form.repudiation}
                              onChange={handleChange}
                              className="tm-input"
                            /></td>
                        </tr>
                        <tr title="Does the threat expose sensitive information?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Information Disclosure:</label></td>
                          <td>
                            <textarea
                              name="informationDisclosure"
                              value={form.informationDisclosure}
                              onChange={handleChange}
                              className="tm-input"
                            /></td>
                        </tr>
                        <tr title="Can the threat disrupt service availability?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Denial of Service:</label></td>
                          <td>
                            <textarea
                              name="denialOfService"
                              value={form.denialOfService}
                              onChange={handleChange}
                              className="tm-input"
                            /></td>
                        </tr>
                        <tr title="Can the threat gain elevated permissions?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Elevation of Privilege:</label></td>
                          <td>
                            <textarea
                              name="elevationOfPrivilege"
                              value={form.elevationOfPrivilege}
                              onChange={handleChange}
                              className="tm-input"
                            /></td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </td>
              </tr>
              {/* DREAD Assessment */}
              <tr>
                <td colSpan={3}>
                  <fieldset className="tm-inputform-fieldset tm-inputform-fieldset-dread">
                    <legend className="tm-inputform-legend tm-inputform-legend-dread">
                      DREAD Assessment - how bad can it get?
                    </legend>
                    <table className="tm-inputform-field-table">
                      <tbody>
                        <tr>
                          <td className="tm-inputform-field-cell-label-dread"><label className="tm-form-label">Damage Potential:</label></td>
                          <td className="tm-inputform-field-cell-tooltip">
                            <span className="tm-tooltip-container">
                              <span className="tm-tooltip-icon" tabIndex={0}>?</span>
                              <div className="tm-tooltip-content">
                                <ul>
                                  <li><b>0</b> : No damage</li>
                                  <li><b>3</b> : Individual user data is compromised, affected, or availability denied</li>
                                  <li><b>6</b> : All user data is compromised, affected, or availability denied</li>
                                  <li><b>7</b> : Availability to a service is denied</li>
                                  <li><b>8</b> : Availability of all services is denied</li>
                                  <li><b>9</b> : Administration plane and infrastructure data is compromised or affected</li>
                                  <li><b>10</b> : Complete system or data destruction, failure, or compromise</li>
                                </ul>
                              </div>
                            </span></td>
                          <td>
                            <input
                              title="The potential impact of the threat if it were to materialize?"
                              type="number" 
                              name="damagePotential" 
                              value={form.damagePotential} 
                              onChange={handleChange} 
                              className="tm-input" 
                              min="0"
                              max="10"
                            /></td>
                        </tr>
                        <tr>
                          <td className="tm-inputform-field-cell-label-dread"><label className="tm-form-label">Reproducibility:</label></td>
                          <td className="tm-inputform-field-cell-tooltip">   
                            <span className="tm-tooltip-container">
                              <span className="tm-tooltip-icon" tabIndex={0}>?</span>
                              <div className="tm-tooltip-content">
                                <ul>
                                  <li><b>0</b> : Very hard or impossible, even for administrators. The vulnerability is unstable and statistically unlikely to be reliably exploited</li>
                                  <li><b>5</b> : One or two steps required, tooling / scripting readily available</li>
                                  <li><b>10</b> : Unauthenticated users can trivially and reliably exploit using only a web browser</li>
                                </ul>
                              </div>
                            </span></td>
                          <td>
                            <input 
                              title="How easily the threat can be reproduced by an attacker?"
                              type="number" 
                              name="reproducibility" 
                              value={form.reproducibility} 
                              onChange={handleChange} 
                              className="tm-input" 
                              min="0"
                              max="10"
                            /></td>
                        </tr>
                        <tr title="How easy is it to exploit the threat?">
                          <td className="tm-inputform-field-cell-label-dread"><label className="tm-form-label">Exploitability:</label></td>
                          <td className="tm-inputform-field-cell-tooltip">
                            <span className="tm-tooltip-container">
                              <span className="tm-tooltip-icon" tabIndex={0}>?</span>
                              <div className="tm-tooltip-content">
                                <ul>
                                  <li><b>0</b> : N/A Every vulnerability is exploitable, given time and effort. All scores should be 1-10</li>
                                  <li><b>1</b> : Even with direct knowledge of the vulnerability no viable path for exploitation has been identified</li>
                                  <li><b>2</b> : Advanced techniques required, custom tooling. Only exploitable by authenticated users</li>
                                  <li><b>5</b> : Exploit is available/understood, usable with only moderate skill by authenticated users</li>
                                  <li><b>7</b> : Exploit is available/understood, usable by non-authenticated users</li>
                                  <li><b>10</b> : A web browser can be used to exploit the vulnerability</li>
                                </ul>
                              </div>
                            </span></td>
                          <td>
                            <input 
                              title="The ease with which the threat can be exploited"
                              type="number" 
                              name="exploitability" 
                              value={form.exploitability} 
                              onChange={handleChange} 
                              className="tm-input" 
                              min="1"
                              max="10"
                            /></td>
                        </tr>
                        <tr title="How many users are affected by the threat?">
                          <td className="tm-inputform-field-cell-label-dread"><label className="tm-form-label">Affected Users:</label></td>
                          <td className="tm-inputform-field-cell-tooltip">  
                            <span className="tm-tooltip-container">
                              <span className="tm-tooltip-icon" tabIndex={0}>?</span>
                              <div className="tm-tooltip-content">
                                <ul>
                                  <li><b>0</b> : No users affected</li>
                                  <li><b>5</b> : Restricted to users of a specific application / system / site</li>
                                  <li><b>10</b> : All users impacted</li>
                                </ul>
                              </div>
                            </span></td>
                          <td>
                            <input 
                              title="The number of users or systems that would be affected by the threat"
                              type="number" 
                              name="affectedUsers" 
                              value={form.affectedUsers} 
                              onChange={handleChange} 
                              className="tm-input" 
                              min="0"
                              max="10"
                            /></td>
                        </tr>
                        <tr title="How easy is it to discover the threat?">
                          <td className="tm-inputform-field-cell-label-dread"><label className="tm-form-label">Discoverability:</label></td>
                          <td className="tm-inputform-field-cell-tooltip">   
                            <span className="tm-tooltip-container">
                              <span className="tm-tooltip-icon" tabIndex={0}>?</span>
                              <div className="tm-tooltip-content">
                                <ul>
                                  <li><b>0</b> : Very hard to impossible to detect even given access to source code and privilege access to running systems</li>
                                  <li><b>5</b> : Can figure it out by guessing or by monitoring network traces</li>
                                  <li><b>8</b> : Details of faults like this are already in the public domain and can be easily discovered using a search engine</li>
                                  <li><b>10</b> : The information is visible in the web browser address bar or in a form</li>
                                </ul>
                              </div>
                            </span></td>
                          <td>
                            <input 
                              title="How easily the threat can be discovered by an attacker, default to 10"
                              type="number" 
                              name="discoverability" 
                              value={form.discoverability} 
                              onChange={handleChange} 
                              className="tm-input" 
                              min="1"
                              max="10"
                            /></td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ marginTop: "1em", fontWeight: "bold", color: "#7b1fa2" }}>
                      DREAD Average: {dreadAverage} &nbsp;
                      DREAD Risk: <span style={{ color: dreadRiskColors[dreadRisk] || "#333" }}>{dreadRisk}</span>
                    </div>
                  </fieldset>
                </td>
              </tr>
              {/* CVSS Assessment - Available in Basic mode */}
              <tr>
                <td colSpan={2}>
                  <fieldset className="tm-inputform-fieldset tm-inputform-fieldset-cvss">
                    <legend className="tm-inputform-legend tm-inputform-legend-cvss">
                      CVSS Assessment - Common Vulnerability Scoring System (Alternative to DREAD)
                    </legend>
                    <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>
                      Use the <a href="https://www.first.org/cvss/calculator/4-0" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>CVSS 4.0 Calculator</a> to generate vector strings and scores.
                    </div>
                    <table className="tm-inputform-field-table">
                      <tbody>
                        <tr>
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">CVSS Vector String:</label></td>
                          <td className="tm-inputform-field-cell-tooltip">
                            <span className="tm-tooltip-container">
                              <span className="tm-tooltip-icon" tabIndex={0}>?</span>
                              <div className="tm-tooltip-content">
                                <p>CVSS vector string in format:</p>
                                <p><b>CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:N/SC:N/SI:N/SA:N</b></p>
                                <p>Use the CVSS Calculator link above to generate this string.</p>
                              </div>
                            </span>
                          </td>
                          <td>
                            <input
                              title="CVSS vector string from CVSS Calculator"
                              type="text" 
                              name="cvssVector" 
                              value={form.cvssVector || ''} 
                              onChange={handleChange} 
                              className="tm-input" 
                              placeholder="CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:N/SC:N/SI:N/SA:N"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">CVSS Score:</label></td>
                          <td className="tm-inputform-field-cell-tooltip">
                            <span className="tm-tooltip-container">
                              <span className="tm-tooltip-icon" tabIndex={0}>?</span>
                              <div className="tm-tooltip-content">
                                <p>Numeric CVSS score from 0.0 to 10.0</p>
                                <ul>
                                  <li><b>0.0</b>: None</li>
                                  <li><b>0.1-3.9</b>: Low</li>
                                  <li><b>4.0-6.9</b>: Medium</li>
                                  <li><b>7.0-8.9</b>: High</li>
                                  <li><b>9.0-10.0</b>: Critical</li>
                                </ul>
                              </div>
                            </span>
                          </td>
                          <td>
                            <input
                              title="CVSS numeric score (0.0-10.0) from CVSS Calculator"
                              type="number" 
                              name="cvssScore" 
                              value={form.cvssScore || ''} 
                              onChange={handleChange} 
                              className="tm-input" 
                              min="0.0"
                              max="10.0"
                              step="0.1"
                              placeholder="0.0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">CVSS Classification:</label></td>
                          <td className="tm-inputform-field-cell-tooltip">
                            <span className="tm-tooltip-container">
                              <span className="tm-tooltip-icon" tabIndex={0}>?</span>
                              <div className="tm-tooltip-content">
                                <p>CVSS severity rating based on score:</p>
                                <ul>
                                  <li><b>None</b>: 0.0</li>
                                  <li><b>Low</b>: 0.1-3.9</li>
                                  <li><b>Medium</b>: 4.0-6.9</li>
                                  <li><b>High</b>: 7.0-8.9</li>
                                  <li><b>Critical</b>: 9.0-10.0</li>
                                </ul>
                              </div>
                            </span>
                          </td>
                          <td>
                            <select
                              name="cvssClassification"
                              value={form.cvssClassification || ''}
                              onChange={handleChange}
                              className="tm-input"
                              style={{ 
                                color: form.cvssClassification ? dreadRiskColors[form.cvssClassification] || "#333" : "#333",
                                fontWeight: form.cvssClassification ? "bold" : "normal"
                              }}
                            >
                              <option value="">Select classification...</option>
                              <option value="None">None (0.0)</option>
                              <option value="Low">Low (0.1-3.9)</option>
                              <option value="Medium">Medium (4.0-6.9)</option>
                              <option value="High">High (7.0-8.9)</option>
                              <option value="Critical">Critical (9.0-10.0)</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </td>
              </tr>
              {/* Actions */}
              <tr>
                <td colSpan={2}>
                  <fieldset className="tm-inputform-fieldset tm-inputform-fieldset-actions">
                    <legend className="tm-inputform-legend tm-inputform-legend-actions">
                      Actions - what are we going to do about it?
                    </legend>
                    <table className="tm-inputform-field-table">
                      <tbody>
                        {/* Extended action fields - only show in Extended mode */}
                        {viewMode === 'extended' && (
                        <tr title="What actions can be taken to mitigate the threat?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Suggested Action</label></td>
                          <td>
                            <select
                              name="actions"
                              value={form.actions}
                              onChange={handleChange}
                              className="tm-input"
                              style={{ 
                                color: form.actions ? actionColors[form.actions] || "#333" : "#333",
                                fontWeight: form.actions ? "bold" : "normal"
                              }}
                            >
                              <option value="">Select an action</option>
                              <option value="Mitigate">Mitigate</option>
                              <option value="Eliminate">Eliminate</option>
                              <option value="Transfer">Transfer</option>
                              <option value="Accept">Accept</option>
                            </select>
                          </td>
                        </tr>
                        )}
                        {/* Basic action fields - always show */}
                        <tr title="What is the status of the threat?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Status</label></td>
                          <td>
                            <select
                              name="status"
                              value={form.status}
                              onChange={handleChange}
                              className="tm-input"
                              style={{ 
                                color: form.status ? statusColors[form.status] || "#333" : "#333",
                                fontWeight: form.status ? "bold" : "normal"
                              }}
                            >
                              <option value="">Select a status</option>
                              <option value="In-Progress">In-Progress</option>
                              <option value="Mitigated">Mitigated</option>
                              <option value="Eliminated">Eliminated</option>
                              <option value="Transferred">Transferred</option>
                              <option value="Accepted">Accepted</option>
                            </select>
                          </td>
                        </tr>
                        <tr title="What is the priority of the threat?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Priority</label></td>
                          <td>
                            <select
                              name="priority"
                              value={form.priority}
                              onChange={handleChange}
                              className="tm-input"
                              style={{ 
                                color: form.priority ? priorityColors[form.priority] || "#333" : "#333",
                                fontWeight: form.priority ? "bold" : "normal"
                              }}
                            >
                              <option value="">Select a priority</option>
                              <option value="Low">Low</option>
                              <option value="Moderate">Moderate</option>
                              <option value="Urgent">Urgent</option>
                              <option value="Critical">Critical</option>
                            </select>
                          </td> 
                        </tr>
                        {/* Extended action fields - only show in Extended mode */}
                        {viewMode === 'extended' && (
                        <>
                        <tr title="What is the target date for resolving the threat?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Target Date</label></td>
                          <td>
                            <input
                              type="date"
                              name="targetDate"
                              value={form.targetDate}
                              onChange={handleChange}
                              className="tm-input"
                            /></td>
                        </tr>
                        <tr title="Who is responsible for addressing the threat?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Responsible Person</label></td>
                          <td>
                            <input
                              type="text"
                              name="responsiblePerson"
                              value={form.responsiblePerson}
                              onChange={handleChange}
                              className="tm-input"
                            />
                          </td>
                        </tr>
                        <tr title="What is the date when the threat was last updated?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Last Updated</label></td>
                          <td>
                            <input
                              type="date"
                              name="lastUpdated"
                              value={form.lastUpdated}
                              onChange={handleChange}
                              className="tm-input"
                            /></td>
                        </tr>
                        <tr title="Any additional notes or comments about the threat?">
                          <td className="tm-inputform-field-cell-label"><label className="tm-form-label">Notes</label></td>
                          <td>
                            <textarea
                              name="notes"
                              value={form.notes}
                              onChange={handleChange}
                              className="tm-input"
                            />
                          </td>
                        </tr>
                        </>
                        )}
                      </tbody>
                    </table>
                  </fieldset>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
          <div className="tm-flex-gap">
            <button
              type="submit"
              className="tm-btn tm-btn-primary"
            >
              {editIndex !== null ? "Update Entry" : "Submit Threat Details"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="tm-btn tm-btn-cancel"
            >
              Cancel
            </button>
          </div>
      </details>
    </form>
  );
};

export default TMInputForm;