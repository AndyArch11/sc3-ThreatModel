import React from "react";
import "./TM.css";
import { exportThreatsToExcel } from "./ExcelExport";

const TMTable = ({
  entries,
  setEntries,
  initialForm,
  setForm,
  dreadRiskColors,
  dataClassificationColors,
  businessCriticalityColors,
  statusColors,
  priorityColors,
  actionColors,
  setEditIndex,
  setSubmitted,
  setFieldsOpen,
  moveRowUp,
  moveRowDown,
  handleRemove,
  handleExport,
  editIndex,
  setDraggedProcessIndex,
  draggedProcessIndex,
  setDropTargetIndex,
  dropTargetIndex,
  handleMoveProcess,
  hoveredRowIndex,
  setHoveredRowIndex,
  handleRowClick,
  getDataClassificationText,
  getBusinessCriticalityText
 }) => {    // Helper function to create new entry
  const handleAddNewProcess = () => {
    setForm(initialForm);
    setEditIndex(null);
    setSubmitted(false);
    if (typeof setFieldsOpen === 'function') {
      setFieldsOpen(true);
    } else {
      console.warn('setFieldsOpen is not a function:', setFieldsOpen);
    }
  };

  // Helper function to start new Threat Model Assessment
  const handleStartNew = () => {
    if (
      window.confirm(
        "Are you sure you want to start a new Threat Model Assessment? This will clear all current entries."
      )
    ) {
      setEntries([]);
      setForm(initialForm);
      setEditIndex(null);
      setSubmitted(false);
      if (typeof setFieldsOpen === 'function') {
        setFieldsOpen(true);
      } else {
        console.warn('setFieldsOpen is not a function:', setFieldsOpen);
      }
    }
  };

  // Helper function to handle Excel export
  const handleExcelExport = () => {
    exportThreatsToExcel(
      entries, 
      getDataClassificationText, 
      getBusinessCriticalityText, 
      (filename) => {
        console.log(`Excel file exported: ${filename}`);
        // Show success message to user
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4caf50;
          color: white;
          padding: 12px 24px;
          border-radius: 4px;
          z-index: 10000;
          font-family: Arial, sans-serif;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        toast.textContent = `✓ Excel file exported: ${filename}`;
        document.body.appendChild(toast);
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 3000);
      }
    );
  };

  const handleDragStart = (e, index) => {
    setDraggedProcessIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetIndex(index);
  };

  const handleDragLeave = () => {
    setDropTargetIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedProcessIndex !== null && draggedProcessIndex !== dropIndex) {
      handleMoveProcess(draggedProcessIndex, dropIndex);
    }
    setDraggedProcessIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedProcessIndex(null);
    setDropTargetIndex(null);
  };

  if (entries.length === 0) {
    return null;
  }

  return (
    <>
      {/* Header stays inside the background card */}
      <h3 className="tm-table-heading">
          Threat Model Entries
      </h3>
      <div className="tm-table-container">
        <div className="tm-table-scroll">
          <table className="tm-table">
            <thead>
              <tr>
                <th colSpan={13} className="tm-th-group-threat">Threat Model Details - what are we working on?</th>
                <th colSpan={6} className="tm-th-group-stride">STRIDE Assessment - what can go wrong?</th>
                <th colSpan={7} className="tm-th-group-dread">DREAD Assessment - how bad can it get?</th>
                <th colSpan={3} className="tm-th-group-cvss">CVSS Assessment - Common Vulnerability Scoring System</th>
                <th colSpan={7} className="tm-th-group-action">Actions - what are we going to do about it?</th>
              </tr>
              <tr>
                <th className="tm-th-threat">Threat ID</th>
                <th className="tm-th-threat">Description</th>
                <th className="tm-th-threat">Assessed By</th>
                <th className="tm-th-threat">Assessed Date</th>
                <th className="tm-th-threat">Design Location</th>
                <th className="tm-th-threat">Source</th>
                <th className="tm-th-threat">Target</th>
                <th className="tm-th-threat">Protocols</th>
                <th className="tm-th-threat">Authentication</th>
                <th className="tm-th-threat">Data Flow</th>
                <th className="tm-th-threat">Data Classification</th>
                <th className="tm-th-threat">Business Process</th>
                <th className="tm-th-threat">Business Criticality</th>
                <th className="tm-th-stride">Spoofing</th>
                <th className="tm-th-stride">Tampering</th>
                <th className="tm-th-stride">Repudiation</th>
                <th className="tm-th-stride">Information Disclosure</th>
                <th className="tm-th-stride">Denial of Service</th>
                <th className="tm-th-stride">Elevation of Privilege</th>
                <th className="tm-th-dread">Damage Potential</th>
                <th className="tm-th-dread">Reproducibility</th>
                <th className="tm-th-dread">Exploitability</th>
                <th className="tm-th-dread">Affected Users</th>
                <th className="tm-th-dread">Discoverability</th>
                <th className="tm-th-dread">DREAD Average</th>
                <th className="tm-th-dread">DREAD Risk</th>
                <th className="tm-th-cvss">CVSS Vector</th>
                <th className="tm-th-cvss">CVSS Score</th>
                <th className="tm-th-cvss">CVSS Classification</th>
                <th className="tm-th-action">Suggested Action</th>
                <th className="tm-th-action">Status</th>
                <th className="tm-th-action">Priority</th>
                <th className="tm-th-action">Target Date</th>
                <th className="tm-th-action">Responsible Person</th>
                <th className="tm-th-action">Last Updated</th>
                <th className="tm-th-action">Notes</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`tm-table-row 
                    ${dropTargetIndex === index ? 'tm-table-row-drop-target' : ''} 
                    ${editIndex === index ? 'tm-table-row-editing' : ''} 
                    ${hoveredRowIndex === index ? 'tm-table-row-hover' : ''}`}
                  onClick={() => handleRowClick(index)}
                  onMouseEnter={() => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                  title={editIndex === index ? 
                    `Currently editing: ${entry.processId} - ${entry.processName} (click to save changes)` : 
                    `${entry.processId} - ${entry.processName} (click to edit this entry)`
                  }
                >
                  <td className="tm-td-threat">{entry.threatId}</td>
                  <td className="tm-td-threat">{entry.threatDescription}</td>
                  <td className="tm-td-threat">{entry.assessedBy}</td>
                  <td className="tm-td-threat">{entry.assessedDate}</td>
                  <td className="tm-td-threat">{entry.designLocation}</td>
                  <td className="tm-td-threat">{entry.source}</td>
                  <td className="tm-td-threat">{entry.target}</td>
                  <td className="tm-td-threat">{entry.protocols}</td>
                  <td className="tm-td-threat">{entry.authentication}</td>
                  <td className="tm-td-threat">{entry.dataFlow}</td>
                  <td className="tm-td-threat" style={{ backgroundColor: dataClassificationColors[getDataClassificationText(entry.dataClassification)] || "transparent" }}>{getDataClassificationText(entry.dataClassification)}</td>
                  <td className="tm-td-threat">{entry.businessProcess}</td>
                  <td className="tm-td-threat" style={{ backgroundColor: businessCriticalityColors[getBusinessCriticalityText(entry.businessCriticality)] || "transparent" }}>{getBusinessCriticalityText(entry.businessCriticality)}</td>
                  <td className="tm-td-stride">{entry.spoofing}</td>
                  <td className="tm-td-stride">{entry.tampering}</td>
                  <td className="tm-td-stride">{entry.repudiation}</td>
                  <td className="tm-td-stride">{entry.informationDisclosure}</td>
                  <td className="tm-td-stride">{entry.denialOfService}</td>
                  <td className="tm-td-stride">{entry.elevationOfPrivilege}</td>
                  <td className="tm-td-dread">{entry.damagePotential}</td>
                  <td className="tm-td-dread">{entry.reproducibility}</td>
                  <td className="tm-td-dread">{entry.exploitability}</td>
                  <td className="tm-td-dread">{entry.affectedUsers}</td>
                  <td className="tm-td-dread">{entry.discoverability}</td>
                  <td className="tm-td-dread">{entry.dreadAverage}</td>
                  <td className="tm-td-dread" style={{ backgroundColor: dreadRiskColors[entry.dreadRisk] || "#333" }}>
                    {entry.dreadRisk}
                  </td>
                  <td className="tm-td-cvss">{entry.cvssVector}</td>
                  <td className="tm-td-cvss">{entry.cvssScore}</td>
                  <td className="tm-td-cvss" style={{ backgroundColor: dreadRiskColors[entry.cvssClassification] || "transparent" }}>{entry.cvssClassification}</td>
                  <td className="tm-td-action" style={{ backgroundColor: actionColors[entry.actions] || "transparent" }}>{entry.actions}</td>
                  <td className="tm-td-action" style={{ backgroundColor: statusColors[entry.status] || "transparent" }}>{entry.status}</td>
                  <td className="tm-td-action" style={{ backgroundColor: priorityColors[entry.priority] || "transparent" }}>{entry.priority}</td>
                  <td className="tm-td-action">{entry.targetDate}</td>
                  <td className="tm-td-action">{entry.responsiblePerson}</td>
                  <td className="tm-td-action">{entry.lastUpdated}</td>
                  <td className="tm-td-action">{entry.notes}</td>

                  {/* Action buttons */}
                  <td className="tm-action-cell">
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); moveRowUp(index); }}
                      disabled={index === 0}
                      className="tm-action-button"
                      title="Move Up"
                    >▲</button>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); moveRowDown(index); }}
                      disabled={index === entries.length - 1}
                      className="tm-action-button"
                      title="Move Down"
                    >▼</button>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); handleRemove(index); }}
                      className="tm-action-button tm-action-button-remove"
                      title="Remove Entry"
                    >🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p></p> {/* Empty paragraph to ensure the table has some space below */}
        </div>
        {/* Button row: Create New Entry and Export to Excel */}
        <div className="tm-button-container">
          <button
            type="button"
            onClick={handleAddNewProcess}
            className="tm-btn tm-btn-outline-secondary"
          >
            + Add New Threat
          </button>
          <button
            type="button"
            onClick={handleStartNew}
            className="tm-btn tm-btn-outline-primary"
          >
            🗑️ Start New
          </button>
          <button
            type="button"
            onClick={handleExcelExport}
            className="tm-btn tm-btn-accent"
            title="Export threat model data and guidance to Excel"
          >
            📊 Export to Excel
          </button>
        </div>
     </div>
    </>
  );
};

export default TMTable;