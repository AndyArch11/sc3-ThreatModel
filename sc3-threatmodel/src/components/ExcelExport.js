import React from 'react';
import * as XLSX from 'xlsx';

// Utility function to export threats to Excel
export function exportThreatsToExcel(threats, getDataClassificationText, getBusinessCriticalityText, onExport) {
  try {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Threat Model Guidance Worksheet
    const guidanceData = [
      ['Threat Modelling Guidance and Preparation'],
      [''],
      ['What is Threat Modeling?'],
      ['Threat modeling is a proactive approach to identifying and mitigating potential security threats to a system.'],
      ['It involves analyzing the system architecture, identifying potential attack vectors, and implementing security controls to mitigate those risks.'],
      ['Threat modeling is a key activity of the Security Development Lifecycle (SDL) and is essential for building secure systems.'],
      [''],
      ['Standards and References:'],
      ['• ISO/IEC 27001:2022 - Information security management systems'],
      ['• ISO/IEC 27002:2022 - Information security controls'],
      ['• ISO/IEC 27005:2022 - Guidance on managing information security risks'],
      ['• NIST SP 800-53 - Security and Privacy Controls'],
      ['• NIST SP 800-154 - Guide to Data-Centric System Threat Modeling'],
      ['• NIST SP 800-218 - Secure Software Development Framework'],
      ['• NIST Cybersecurity Framework (CSF)'],
      [''],
      ['Key Threat Modeling Questions:'],
      ['1. What are we working on? - Asset Identification'],
      ['2. What can go wrong? - Risk Assessment and Analysis'],
      ['3. What are we going to do about that? - Build Effective Controls'],
      ['4. Did we do a good enough job? - Assess Effectiveness of Actions'],
      [''],
      ['STRIDE Framework - Threat Categories:'],
      ['S - Spoofing: Impersonation threats'],
      ['T - Tampering: Data manipulation threats'],
      ['R - Repudiation: Denial of actions'],
      ['I - Information Disclosure: Unauthorized access to data'],
      ['D - Denial of Service: Service disruption'],
      ['E - Elevation of Privilege: Unauthorized access escalation'],
      [''],
      ['DREAD Framework - Risk Assessment:'],
      ['D - Damage Potential: Impact of the threat'],
      ['R - Reproducibility: Ease of repeating the attack'],
      ['E - Exploitability: Effort required to exploit'],
      ['A - Affected Users: Scope of impact'],
      ['D - Discoverability: Likelihood of finding the threat'],
      [''],
      ['Data Flow Diagram Components:'],
      ['• Data Stores: Storage of data (open-ended rectangles)'],
      ['• Data Flows: Movement of data (arrows)'],
      ['• Processes: Data transformation (circles/ovals)'],
      ['• External Entities: External actors (squares/rectangles)'],
      ['• Trust Boundaries: Security domain boundaries (dashed lines)'],
      [''],
      ['Best Practices:'],
      ['• Start simple, focus on critical assets first'],
      ['• Involve cross-functional teams'],
      ['• Use visual aids like data flow diagrams'],
      ['• Regularly review and update threat models'],
      ['• Prioritize threats based on risk assessment'],
      ['• Integrate into software development lifecycle'],
      ['• Document findings and decisions'],
      [''],
      ['Risk Treatment Options:'],
      ['• Mitigate: Reduce likelihood of threat'],
      ['• Eliminate: Remove the vulnerable component'],
      ['• Transfer: Shift responsibility to another entity'],
      ['• Accept: Acknowledge risk without action'],
      [''],
      ['Important Considerations:'],
      ['• Threat modeling is an ongoing process'],
      ['• Regular updates needed as systems evolve'],
      ['• Collaborative effort with all stakeholders'],
      ['• Quality depends on information and expertise'],
      ['• Use with other security practices'],
      [''],
      ['Disclaimer:'],
      ['This information is for general guidance only and requires adaptation'],
      ['for specific business contexts. Consult qualified professionals for'],
      ['specific legal and technical advice.']
    ];

    const guidanceWS = XLSX.utils.aoa_to_sheet(guidanceData);
    
    // Set column widths for guidance sheet
    guidanceWS['!cols'] = [{ wch: 80 }];
    
    // Add the guidance worksheet to workbook
    XLSX.utils.book_append_sheet(wb, guidanceWS, 'Threat Model Guidance');

    // Threat Model Entries Worksheet
    if (threats && threats.length > 0) {
      // Helper function to determine risk level (CVSS first, then DREAD)
      const getRiskLevel = (entry) => {
        // Prioritize CVSS Classification if available
        if (entry.cvssClassification && entry.cvssClassification.trim() !== '') {
          const cvssClassification = entry.cvssClassification.trim();
          // Normalize CVSS classification to standard risk levels
          switch (cvssClassification.toLowerCase()) {
            case 'critical':
            case 'very high':
              return "Critical";
            case 'high':
              return "High";
            case 'medium':
            case 'moderate':
              return "Medium";
            case 'low':
            case 'very low':
              return "Low";
            default:
              // If it's a valid CVSS classification but not recognized, use as-is
              return cvssClassification;
          }
        }
        
        // Fall back to DREAD calculation
        const dreadSum = Number(entry.damagePotential || 0) + Number(entry.reproducibility || 0) + 
                         Number(entry.exploitability || 1) + Number(entry.affectedUsers || 0) + Number(entry.discoverability || 10);
        
        if (dreadSum >= 40) return "Critical";
        if (dreadSum >= 25) return "High";
        if (dreadSum >= 12) return "Medium";
        return "Low";
      };

      // Prepare the comprehensive data for the threats table
      const threatHeaders = [
        // Basic Threat Information
        'Threat ID',
        'Threat Description',
        'Assessed By',
        'Assessed Date',
        'Design Location',
        
        // System Context
        'Source',
        'Target',
        'Protocol(s)',
        'Authentication',
        'Data Flow',
        'Data Classification',
        'Business Process',
        'Business Criticality',
        
        // STRIDE Assessment
        'Spoofing',
        'Tampering',
        'Repudiation',
        'Information Disclosure',
        'Denial of Service',
        'Elevation of Privilege',
        
        // DREAD Assessment
        'Damage Potential',
        'Reproducibility',
        'Exploitability',
        'Affected Users',
        'Discoverability',
        'DREAD Risk',
        
        // CVSS Assessment
        'CVSS Vector',
        'CVSS Score',
        'CVSS Classification',
        
        // Actions & Status
        'Actions',
        'Status',
        'Priority',
        'Target Date',
        'Responsible Person',
        'Last Updated',
        'Notes',
        
        // Final Risk Assessment
        'Final Risk Level'
      ];

      // Create section headers for better organization
      const sectionHeaders = [
        'Basic Information', '', '', '', '',           // 5 columns
        'System Context', '', '', '', '', '', '', '',  // 8 columns  
        'STRIDE Assessment', '', '', '', '', '',       // 6 columns
        'DREAD Assessment', '', '', '', '', '',        // 6 columns
        'CVSS Assessment', '', '',                     // 3 columns
        'Actions & Management', '', '', '', '', '', '', // 7 columns
        'Final Risk'                                   // 1 column
      ];

      const threatData = [sectionHeaders, threatHeaders];

      threats.forEach(threat => {
        // Calculate DREAD Risk for comparison
        const dreadSum = Number(threat.damagePotential || 0) + Number(threat.reproducibility || 0) + 
                         Number(threat.exploitability || 1) + Number(threat.affectedUsers || 0) + Number(threat.discoverability || 10);
        const dreadRisk = dreadSum >= 40 ? "Critical" : dreadSum >= 25 ? "High" : dreadSum >= 12 ? "Medium" : "Low";
        
        threatData.push([
          // Basic Threat Information
          threat.threatId || '',
          threat.threatDescription || '',
          threat.assessedBy || '',
          threat.assessedDate || '',
          threat.designLocation || '',
          
          // System Context
          threat.source || '',
          threat.target || '',
          threat.protocols || '',
          threat.authentication || '',
          threat.dataFlow || '',
          getDataClassificationText(threat.dataClassification),
          threat.businessProcess || '',
          getBusinessCriticalityText(threat.businessCriticality),
          
          // STRIDE Assessment
          threat.spoofing || '',
          threat.tampering || '',
          threat.repudiation || '',
          threat.informationDisclosure || '',
          threat.denialOfService || '',
          threat.elevationOfPrivilege || '',
          
          // DREAD Assessment
          threat.damagePotential || '',
          threat.reproducibility || '',
          threat.exploitability || '',
          threat.affectedUsers || '',
          threat.discoverability || '',
          dreadRisk,
          
          // CVSS Assessment
          threat.cvssVector || '',
          threat.cvssScore || '',
          threat.cvssClassification || '',
          
          // Actions & Status
          threat.actions || '',
          threat.status || '',
          threat.priority || '',
          threat.targetDate || '',
          threat.responsiblePerson || '',
          threat.lastUpdated || '',
          threat.notes || '',
          
          // Final Risk Assessment
          getRiskLevel(threat)
        ]);
      });

      const threatWS = XLSX.utils.aoa_to_sheet(threatData);
      
      // Set column widths for comprehensive threat entries sheet
      threatWS['!cols'] = [
        // Basic Threat Information
        { wch: 12 }, // Threat ID
        { wch: 30 }, // Threat Description
        { wch: 15 }, // Assessed By
        { wch: 12 }, // Assessed Date
        { wch: 20 }, // Design Location
        
        // System Context
        { wch: 15 }, // Source
        { wch: 15 }, // Target
        { wch: 15 }, // Protocol(s)
        { wch: 15 }, // Authentication
        { wch: 20 }, // Data Flow
        { wch: 18 }, // Data Classification
        { wch: 20 }, // Business Process
        { wch: 18 }, // Business Criticality
        
        // STRIDE Assessment
        { wch: 15 }, // Spoofing
        { wch: 15 }, // Tampering
        { wch: 15 }, // Repudiation
        { wch: 18 }, // Information Disclosure
        { wch: 15 }, // Denial of Service
        { wch: 18 }, // Elevation of Privilege
        
        // DREAD Assessment
        { wch: 12 }, // Damage Potential
        { wch: 12 }, // Reproducibility
        { wch: 12 }, // Exploitability
        { wch: 12 }, // Affected Users
        { wch: 12 }, // Discoverability
        { wch: 12 }, // DREAD Risk
        
        // CVSS Assessment
        { wch: 25 }, // CVSS Vector
        { wch: 10 }, // CVSS Score
        { wch: 15 }, // CVSS Classification
        
        // Actions & Status
        { wch: 30 }, // Actions
        { wch: 12 }, // Status
        { wch: 10 }, // Priority
        { wch: 12 }, // Target Date
        { wch: 18 }, // Responsible Person
        { wch: 12 }, // Last Updated
        { wch: 25 }, // Notes
        
        // Final Risk Assessment
        { wch: 15 }  // Final Risk Level
      ];
      
      // Add the threats worksheet to workbook
      XLSX.utils.book_append_sheet(wb, threatWS, 'Threat Model Entries');
    } else {
      // Create empty threats worksheet if no data
      const emptyThreatData = [
        ['No threat model entries available'],
        ['Use the threat modeling form to add entries']
      ];
      const emptyThreatWS = XLSX.utils.aoa_to_sheet(emptyThreatData);
      XLSX.utils.book_append_sheet(wb, emptyThreatWS, 'Threat Model Entries');
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    const filename = `ThreatModel_${timestamp}.xlsx`;

    // Write and download the file
    XLSX.writeFile(wb, filename);
    
    // Call onExport callback if provided
    if (onExport && typeof onExport === 'function') {
      onExport(filename);
    }

  } catch (error) {
    console.error('Error exporting to Excel:', error);
    alert('An error occurred while exporting to Excel. Please try again.');
  }
}
