import React, { useState } from "react";
import TMIntro from "./TMIntro";
import TMInputForm from "./TMInputForm";
import TMTable from "./TMTable";
import TMReport from "./TMReport";
import { exportThreatsToExcel } from "./ExcelExport";
import "./TM.css";


const VERSION = "v0.1.0"; // Update as needed

// Helper to get today's date in YYYY-MM-DD format
const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const initialForm = {
    threatId: "",
    threatDescription: "",
    assessedBy: "",
    assessedDate: getToday(), // Default to today
    designLocation: "",
    source: "",
    target: "",
    protocols: "",
    authentication: "",
    dataFlow: "",
    dataClassification: "",
    businessProcess: "",
    businessCriticality: "",
    spoofing: "",
    tampering: "",
    repudiation: "",
    informationDisclosure: "",
    denialOfService: "",
    elevationOfPrivilege: "",
    damagePotential: 0,
    reproducibility: 0,
    exploitability: 1,
    affectedUsers: 0,
    discoverability: 10,
    actions: "",
    status: "",
    priority: "",
    targetDate: "",
    responsiblePerson: "",
    lastUpdated: "",
    notes: ""
}

const TMForm = () => {
  const [form, setForm] = useState(initialForm);
  const [entries, setEntries] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [fieldsOpen, setFieldsOpen] = useState(entries.length === 0);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  // Shared DREAD logic
  const dreadFields = [
    "damagePotential",
    "reproducibility",
    "exploitability",
    "affectedUsers",
    "discoverability"
  ];

  const dreadRiskColors = {
    Critical: "#d32f2f",
    High: "#fbc02d",
    Medium: "#388e3c",
    Low: "#1976d2"
  };

  const getDreadStats = (entry) => {
    const dreadSum = dreadFields.reduce((sum, field) => sum + Number(entry[field] || 0), 0);
    const dreadAverage = (dreadSum / dreadFields.length).toFixed(2);
    let dreadRisk = "Low";
    if (dreadSum >= 40) dreadRisk = "Critical";
    else if (dreadSum >= 25) dreadRisk = "High";
    else if (dreadSum >= 12) dreadRisk = "Medium";
    return { dreadSum, dreadAverage, dreadRisk };
  };

  // Map entries to include DREAD stats
  const entriesWithDread = entries.map(entry => ({
    ...entry,
    ...getDreadStats(entry)
  }));


  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = { ...form, [name]: value };

    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedEntries = entries.map((entry, idx) =>
        idx === editIndex ? form : entry
      );
      setEntries(updatedEntries);
      setEditIndex(null);
      setSubmitted(true);
      setFieldsOpen(false); // Collapse form fields after update
    } else {
      setEntries([...entries, form]);
      // Only pre-fill Threat Model Details fields except Threat ID, Threat Description, Assessed Date
      if (entries.length > 0) {
        const last = entries[entries.length - 1];
        const prefilled = {
          ...last,
          threatId: "",
          threatDescription: "",
          assessedDate: getToday()
        };
        setForm(prefilled);
      } else {
        setForm(initialForm);
      }
      setFieldsOpen(false); // Hide form after submit
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    setSubmitted(false);
    setForm(initialForm);
    setEditIndex(null);
    setFieldsOpen(true); // Expand form fields when returning to form
  };

    // Move row up handler
  const moveRowUp = (idx) => {
    if (idx === 0) return;
    setEntries((prev) => {
      const newEntries = [...prev];
      [newEntries[idx - 1], newEntries[idx]] = [newEntries[idx], newEntries[idx - 1]];
      return newEntries;
    });
    if (editIndex === idx) setEditIndex(idx - 1);
    else if (editIndex === idx - 1) setEditIndex(idx);
  };

  // Move row down handler
  const moveRowDown = (idx) => {
    if (idx === entries.length - 1) return;
    setEntries((prev) => {
      const newEntries = [...prev];
      [newEntries[idx], newEntries[idx + 1]] = [newEntries[idx + 1], newEntries[idx]];
      return newEntries;
    });
    if (editIndex === idx) setEditIndex(idx + 1);
    else if (editIndex === idx + 1) setEditIndex(idx);
  };

  // Remove entry handler
  const handleRemove = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setEditIndex(null);
      setForm(initialForm);
      setSubmitted(false);
    } else if (editIndex > idx) {
      setEditIndex(editIndex - 1);
    }
  };

  const handleExport = () => {
    exportThreatsToExcel(entries);
  };

  const handleRowClick = (idx) => {
    // If clicking on the row that's already being edited, save the changes
    if (editIndex === idx) {
      const updatedEntries = entries.map((entry, entryIdx) =>
        entryIdx === editIndex ? form : entry
      );
      setEntries(updatedEntries);
      setEditIndex(null);
      setSubmitted(true);
      setFieldsOpen(false); // Collapse form fields after save
    } else {
      // If clicking on a different row, load it for editing
      setForm(entries[idx]);
      setEditIndex(idx);
      setSubmitted(false);
      setFieldsOpen(true); // Expand the BIA Form Fields when a row is clicked
    }
  };

  // Drag and drop state for reordering risks
  const [draggedEntryIndex, setDraggedEntryIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

  const [selectedEntryIndex, setSelectedEntryIndex] = useState(null);

  const updatedEntries = [...entries];
  const draggedEntry= updatedEntries[draggedEntryIndex];

  // Drag and drop handlers for reordering processes
  const handleMoveProcess = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= entries.length) {
      return;
    }

    const updatedEntries = [...entries];
    const entryToMove = updatedEntries[fromIndex];
    updatedEntries.splice(fromIndex, 1);
    updatedEntries.splice(toIndex, 0, entryToMove);

    setEntries(updatedEntries);

    // Update selected process index if needed
    if (selectedEntryIndex === fromIndex) {
      setSelectedEntryIndex(toIndex);
    } else if (selectedEntryIndex !== null) {
      if (fromIndex < selectedEntryIndex && toIndex >= selectedEntryIndex) {
        setSelectedEntryIndex(selectedEntryIndex - 1);
      } else if (fromIndex > selectedEntryIndex && toIndex <= selectedEntryIndex) {
        setSelectedEntryIndex(selectedEntryIndex + 1);
      }
    }
  };
    
  const handleDragStart = (e, index) => {
    setDraggedEntryIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedEntryIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedEntryIndex === null || draggedEntryIndex === dropIndex) {
      return;
    }

    // Remove the dragged item
    updatedEntries.splice(draggedEntryIndex, 1);

    // Insert it at the new position
    const insertIndex =
      draggedEntryIndex < dropIndex ? dropIndex - 1 : dropIndex;
    updatedEntries.splice(insertIndex, 0, draggedEntry);

    setEntries(updatedEntries);

    // Update selected entry index if needed
    if (selectedEntryIndex === draggedEntryIndex) {
      setSelectedEntryIndex(insertIndex);
    } else if (selectedEntryIndex !== null) {
      if (
        draggedEntryIndex < selectedEntryIndex &&
        insertIndex >= selectedEntryIndex
      ) {
        setSelectedEntryIndex(selectedEntryIndex - 1);
      } else if (
        draggedEntryIndex > selectedEntryIndex &&
        insertIndex <= selectedEntryIndex
      ) {
        setSelectedEntryIndex(selectedEntryIndex + 1);
      }
    }

    setDraggedEntryIndex(null);
    setDragOverIndex(null);
  };  

  return (
    <div className="tm-main-container">
      <h2 className="tm-main-heading">
        Threat Model Form
      </h2>
      <TMIntro />

      
      {/* Show Add New Threat button if table is not empty and form is hidden */}
      {(!fieldsOpen && entries.length > 0) && (
        <button
          className="tm-btn tm-btn-primary"
          style={{ marginBottom: "1em" }}
          onClick={() => {
            setForm(entries.length > 0 ? {
              ...entries[entries.length - 1],
              threatId: "",
              threatDescription: "",
              assessedDate: getToday()
            } : initialForm);
            setEditIndex(null);
            setFieldsOpen(true);
            setSubmitted(false);
          }}
        >
          Add New Threat
        </button>
      )}
      {/* Show form only if fieldsOpen is true or table is empty */}
      {(fieldsOpen || entries.length === 0) && (
      <TMInputForm
        entries={entries}
        form={form}
        setForm={setForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleBack}
        editIndex={editIndex}
        fieldsOpen={fieldsOpen}
        setFieldsOpen={setFieldsOpen}
        dreadStats={getDreadStats}
        dreadRiskColors={dreadRiskColors}
        lastThreat={entries.length > 0 ? entries[entries.length - 1] : null}
      />
      )}

      <TMTable 
        entries={entriesWithDread}
        setEntries={setEntries}
        initialForm={initialForm}
        setForm={setForm}
        dreadRiskColors={dreadRiskColors}
        setEditIndex={setEditIndex}
        setSubmitted={setSubmitted}
        setFieldsOpen={setFieldsOpen}
        moveRowUp={moveRowUp}
        moveRowDown={moveRowDown}
        handleRemove={handleRemove}
        handleExport={handleExport}
        editIndex={editIndex}
        setDraggedProcessIndex={setDraggedEntryIndex}
        draggedProcessIndex={draggedEntryIndex}
        setDropTargetIndex={setDropTargetIndex}
        dropTargetIndex={dropTargetIndex}
        handleMoveProcess={handleMoveProcess}
        hoveredRowIndex={hoveredRowIndex}
        setHoveredRowIndex={setHoveredRowIndex}
        handleRowClick={handleRowClick}
      />

      <TMReport entries={entries} />
    </div>
  );
};

export default function WrappedTMForm() {
  return (
    <>
      <TMForm />
      <div className="tm-version">
        SC3 Threat Model Form {VERSION}
      </div>
    </>
  );
}