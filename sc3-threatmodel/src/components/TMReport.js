import React from "react";
import "./TM.css";

const TMReport = ({ 
  entries, 
  getDataClassificationText, 
  getBusinessCriticalityText,
  dreadRiskTextColors,
  dataClassificationColors,
  businessCriticalityColors,
  statusColors,
  priorityColors,
  actionColors
}) => {
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

  // Debug: Log the actual entries to see what CVSS and DREAD values we have
  console.log("TMReport - entries:", entries);
  entries.forEach((entry, index) => {
    const dreadSum = Number(entry.damagePotential || 0) + Number(entry.reproducibility || 0) + 
                     Number(entry.exploitability || 1) + Number(entry.affectedUsers || 0) + Number(entry.discoverability || 10);
    console.log(`Entry ${index}:`, {
      cvssClassification: entry.cvssClassification,
      cvssScore: entry.cvssScore,
      damagePotential: entry.damagePotential,
      reproducibility: entry.reproducibility,
      exploitability: entry.exploitability,
      affectedUsers: entry.affectedUsers,
      discoverability: entry.discoverability,
      dreadSum,
      dreadRisk: dreadSum >= 40 ? "Critical" : dreadSum >= 25 ? "High" : dreadSum >= 12 ? "Medium" : "Low",
      finalRisk: getRiskLevel(entry),
      usingCVSS: entry.cvssClassification && entry.cvssClassification.trim() !== ''
    });
  });

  // Calculate summary statistics using the new risk determination logic
  const totalThreats = entries.length;
  const criticalThreats = entries.filter(entry => getRiskLevel(entry) === "Critical").length;
  const highThreats = entries.filter(entry => getRiskLevel(entry) === "High").length;
  const mediumThreats = entries.filter(entry => getRiskLevel(entry) === "Medium").length;
  const lowThreats = entries.filter(entry => getRiskLevel(entry) === "Low").length;

  // Create donut chart data
  const riskData = [
    { label: 'Critical', value: criticalThreats, color: dreadRiskTextColors?.Critical || '#d32f2f' },
    { label: 'High', value: highThreats, color: dreadRiskTextColors?.High || '#f57f17' },
    { label: 'Medium', value: mediumThreats, color: dreadRiskTextColors?.Medium || '#388e3c' },
    { label: 'Low', value: lowThreats, color: dreadRiskTextColors?.Low || '#1976d2' }
  ].filter(item => item.value > 0); // Only show categories with values

  // State for tooltip
  const [tooltip, setTooltip] = React.useState({ show: false, content: '', x: 0, y: 0 });

  // Create reusable 3D card effect handler
  const create3DCardEffect = (baseElevation, baseOffset, glowColor = 'rgba(25,118,210,0.3)') => {
    return {
      onMouseMove: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const mouseIntensity = Math.min(distance * 2, 1);
        
        const dynamicElevation = baseElevation + Math.round(mouseIntensity * 12);
        const dynamicOffset = baseOffset + Math.round(mouseIntensity * 6);
        const tiltX = deltaY * mouseIntensity * 8;
        const tiltY = -deltaX * mouseIntensity * 8;
        const scale = 1 + mouseIntensity * 0.08;
        
        e.currentTarget.style.transform = `translateY(-${dynamicOffset}px) scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        e.currentTarget.style.boxShadow = `${dynamicOffset}px ${dynamicOffset}px ${dynamicElevation}px rgba(0,0,0,${0.15 + mouseIntensity * 0.15}), 0 0 0 1px rgba(255,255,255,${0.8 + mouseIntensity * 0.2}) inset, 0 0 ${mouseIntensity * 20}px ${glowColor.replace('0.3', (mouseIntensity * 0.3).toString())}`;
        
        const countEl = e.currentTarget.querySelector('.count-display');
        const labelEl = e.currentTarget.querySelector('.label-display');
        if (countEl) {
          countEl.style.transform = `scale(${1 + mouseIntensity * 0.15}) translateZ(${mouseIntensity * 10}px)`;
          countEl.style.textShadow = `0 ${mouseIntensity * 3}px ${mouseIntensity * 6}px ${glowColor.replace('0.3', (mouseIntensity * 0.4).toString())}`;
        }
        if (labelEl) {
          labelEl.style.transform = `translateZ(${mouseIntensity * 5}px)`;
          labelEl.style.textShadow = `0 ${mouseIntensity * 2}px ${mouseIntensity * 4}px rgba(108,117,125,${mouseIntensity * 0.3})`;
        }
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = `translateY(-${baseOffset}px) scale(1) rotateX(0deg) rotateY(0deg)`;
        e.currentTarget.style.boxShadow = `${baseOffset}px ${baseOffset}px ${baseElevation}px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset`;
        
        const countEl = e.currentTarget.querySelector('.count-display');
        const labelEl = e.currentTarget.querySelector('.label-display');
        if (countEl) {
          countEl.style.transform = 'scale(1) translateZ(0px)';
          countEl.style.textShadow = 'none';
        }
        if (labelEl) {
          labelEl.style.transform = 'translateZ(0px)';
          labelEl.style.textShadow = 'none';
        }
      }
    };
  };

  // Generate donut chart paths
  const generateDonutChart = (data) => {
    if (data.length === 0) return null;
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const centerX = 100;
    const centerY = 100;
    const outerRadius = 80;
    const innerRadius = 50;
    
    let cumulativeAngle = 0;
    
    const handleMouseEnter = (event, item) => {
      const percentage = ((item.value / total) * 100).toFixed(1);
      const content = `${item.label}: ${item.value} threat${item.value !== 1 ? 's' : ''} (${percentage}%)`;
      
      const rect = event.currentTarget.closest('svg').getBoundingClientRect();
      setTooltip({
        show: true,
        content,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setTooltip({ show: false, content: '', x: 0, y: 0 });
    };
    
    const segments = data.map((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + sliceAngle;
      
      // Convert angles to coordinates (start from top)
      const startAngleAdjusted = startAngle - Math.PI / 2;
      const endAngleAdjusted = endAngle - Math.PI / 2;
      
      const x1 = centerX + outerRadius * Math.cos(startAngleAdjusted);
      const y1 = centerY + outerRadius * Math.sin(startAngleAdjusted);
      const x2 = centerX + outerRadius * Math.cos(endAngleAdjusted);
      const y2 = centerY + outerRadius * Math.sin(endAngleAdjusted);
      
      const x3 = centerX + innerRadius * Math.cos(endAngleAdjusted);
      const y3 = centerY + innerRadius * Math.sin(endAngleAdjusted);
      const x4 = centerX + innerRadius * Math.cos(startAngleAdjusted);
      const y4 = centerY + innerRadius * Math.sin(startAngleAdjusted);
      
      const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
      
      let pathData;
      if (data.length === 1) {
        // Single segment - create full donut using proper donut path
        pathData = `M ${centerX - outerRadius} ${centerY}
                    A ${outerRadius} ${outerRadius} 0 1 1 ${centerX + outerRadius} ${centerY}
                    A ${outerRadius} ${outerRadius} 0 1 1 ${centerX - outerRadius} ${centerY}
                    M ${centerX - innerRadius} ${centerY}
                    A ${innerRadius} ${innerRadius} 0 1 0 ${centerX + innerRadius} ${centerY}
                    A ${innerRadius} ${innerRadius} 0 1 0 ${centerX - innerRadius} ${centerY}
                    Z`;
      } else {
        // Multiple segments - create arc path
        pathData = `M ${x1} ${y1}
                    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                    L ${x3} ${y3}
                    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
                    Z`;
      }
      
      // Calculate text position
      const midAngle = (startAngle + endAngle) / 2 - Math.PI / 2;
      const textRadius = (outerRadius + innerRadius) / 2;
      const textX = centerX + textRadius * Math.cos(midAngle);
      const textY = centerY + textRadius * Math.sin(midAngle);
      
      cumulativeAngle += sliceAngle;
      
      return (
        <g key={index}>
          <path
            d={pathData}
            fill={item.color}
            stroke="#fff"
            strokeWidth="2"
            style={{ transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => {
              if (tooltip.show) {
                const rect = e.currentTarget.closest('svg').getBoundingClientRect();
                setTooltip(prev => ({
                  ...prev,
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                }));
              }
            }}
          />
          {item.value > 0 && sliceAngle > 0.3 && (
            <text
              x={textX}
              y={textY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', pointerEvents: 'none' }}
            >
              {item.value}
            </text>
          )}
        </g>
      );
    });

    return segments;
  };

  // Group threats by status
  const threatsByStatus = entries.reduce((acc, entry) => {
    const status = entry.status || 'Not Set';
    if (!acc[status]) acc[status] = 0;
    acc[status]++;
    return acc;
  }, {});

  // Group threats by data classification
  const threatsByDataClassification = entries.reduce((acc, entry) => {
    const classification = getDataClassificationText(entry.dataClassification);
    if (!acc[classification]) acc[classification] = 0;
    acc[classification]++;
    return acc;
  }, {});

  // Group threats by business criticality
  const threatsByBusinessCriticality = entries.reduce((acc, entry) => {
    const criticality = getBusinessCriticalityText(entry.businessCriticality);
    if (!acc[criticality]) acc[criticality] = 0;
    acc[criticality]++;
    return acc;
  }, {});

  // Group threats by priority
  const threatsByPriority = entries.reduce((acc, entry) => {
    const priority = entry.priority || 'Not Set';
    if (!acc[priority]) acc[priority] = 0;
    acc[priority]++;
    return acc;
  }, {});

  // Count threats with suggested actions
  const threatsWithActions = entries.filter(entry => entry.actions && entry.actions.trim() !== '').length;
  const threatsWithoutActions = totalThreats - threatsWithActions;  

  if (entries.length === 0) {
    return null;
  }

  return (    
    <div className="tm-report-container">
      <details className="tm-report-details">
        <summary className="tm-report-summary">
          📊 Threat Modelling Report
        </summary>
        <div>
          <h3 className="tm-report-title">
            Threat Modelling Report
          </h3>
          
          {entries.length === 0 ? (
            <p>No threats have been modeled yet. Use the form above to add your first threat.</p>
          ) : (
            <>
              {/* Executive Summary */}
              <section style={{ marginBottom: '2em' }}>
                <h4 style={{ color: 'var(--sc3-primary)', borderBottom: '2px solid var(--sc3-secondary)', paddingBottom: '0.5em' }}>
                  Executive Summary
                </h4>
                <p>
                  This threat model contains <strong>{totalThreats}</strong> identified threat{totalThreats !== 1 ? 's' : ''}:
                </p>
                <ul style={{ marginLeft: '1.5em', marginBottom: '1em' }}>
                  {criticalThreats > 0 && (
                    <li style={{ color: dreadRiskTextColors?.Critical || '#d32f2f', fontWeight: 'bold', marginBottom: '0.5em' }}>
                      {criticalThreats} critical risk threat{criticalThreats !== 1 ? 's' : ''} require immediate attention
                    </li>
                  )}
                  {highThreats > 0 && (
                    <li style={{ color: dreadRiskTextColors?.High || '#f57f17', fontWeight: 'bold', marginBottom: '0.5em' }}>
                      {highThreats} high risk threat{highThreats !== 1 ? 's' : ''} should be prioritized
                    </li>
                  )}
                  {mediumThreats > 0 && (
                    <li style={{ color: dreadRiskTextColors?.Medium || '#388e3c', fontWeight: 'bold', marginBottom: '0.5em' }}>
                      {mediumThreats} medium risk threat{mediumThreats !== 1 ? 's' : ''}
                    </li>
                  )}
                  {lowThreats > 0 && (
                    <li style={{ color: dreadRiskTextColors?.Low || '#1976d2', fontWeight: 'bold', marginBottom: '0.5em' }}>
                      {lowThreats} low risk threat{lowThreats !== 1 ? 's' : ''}
                    </li>
                  )}
                </ul>
              </section>

              {/* Risk Distribution */}
              <section style={{ marginBottom: '2em' }}>
                <h4 style={{ color: 'var(--sc3-primary)', borderBottom: '2px solid var(--sc3-secondary)', paddingBottom: '0.5em' }}>
                  Risk Distribution
                </h4>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2em', alignItems: 'center', marginBottom: '1em' }}>
                  {/* Donut Chart */}
                  <div style={{ flex: '0 0 auto' }}>
                    {riskData.length > 0 ? (
                      <div style={{ textAlign: 'center', position: 'relative' }}>
                        <svg width="200" height="200" viewBox="0 0 200 200">
                          {generateDonutChart(riskData)}
                          <text
                            x="100"
                            y="100"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="16"
                            fontWeight="bold"
                            fill="var(--sc3-primary)"
                          >
                            {totalThreats}
                          </text>
                          <text
                            x="100"
                            y="115"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="12"
                            fill="var(--sc3-gray)"
                          >
                            Total Threats
                          </text>
                        </svg>
                        
                        {/* Tooltip */}
                        {tooltip.show && (
                          <div
                            style={{
                              position: 'absolute',
                              left: tooltip.x + 10,
                              top: tooltip.y - 10,
                              background: 'rgba(0, 0, 0, 0.8)',
                              color: 'white',
                              padding: '0.5em 0.75em',
                              borderRadius: '4px',
                              fontSize: '0.9em',
                              pointerEvents: 'none',
                              whiteSpace: 'nowrap',
                              zIndex: 1000,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                            }}
                          >
                            {tooltip.content}
                          </div>
                        )}
                        
                        {/* Legend */}
                        <div style={{ marginTop: '1em', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1em' }}>
                          {riskData.map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                              <div style={{ 
                                width: '16px', 
                                height: '16px', 
                                backgroundColor: item.color, 
                                borderRadius: '2px' 
                              }}></div>
                              <span style={{ fontSize: '0.9em' }}>{item.label}: {item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{ 
                        width: '200px', 
                        height: '200px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        border: '2px dashed #ccc',
                        borderRadius: '50%',
                        color: '#999'
                      }}>
                        No data
                      </div>
                    )}
                  </div>
                  
                  {/* Risk Grid */}
                  <div style={{ flex: '1 1 auto', minWidth: '300px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1em' }}>
                      <div style={{ background: '#ffebee', padding: '1em', borderRadius: '6px', textAlign: 'center', border: `2px solid ${dreadRiskTextColors?.Critical || '#d32f2f'}` }}>
                        <div style={{ fontSize: '2em', fontWeight: 'bold', color: dreadRiskTextColors?.Critical || '#d32f2f' }}>{criticalThreats}</div>
                        <div style={{ color: dreadRiskTextColors?.Critical || '#d32f2f' }}>Critical</div>
                      </div>
                      <div style={{ background: '#fffbea', padding: '1em', borderRadius: '6px', textAlign: 'center', border: `2px solid ${dreadRiskTextColors?.High || '#f57f17'}` }}>
                        <div style={{ fontSize: '2em', fontWeight: 'bold', color: dreadRiskTextColors?.High || '#f57f17' }}>{highThreats}</div>
                        <div style={{ color: dreadRiskTextColors?.High || '#f57f17' }}>High</div>
                      </div>
                      <div style={{ background: '#f8fff5', padding: '1em', borderRadius: '6px', textAlign: 'center', border: `2px solid ${dreadRiskTextColors?.Medium || '#388e3c'}` }}>
                        <div style={{ fontSize: '2em', fontWeight: 'bold', color: dreadRiskTextColors?.Medium || '#388e3c' }}>{mediumThreats}</div>
                        <div style={{ color: dreadRiskTextColors?.Medium || '#388e3c' }}>Medium</div>
                      </div>
                      <div style={{ background: '#f5faff', padding: '1em', borderRadius: '6px', textAlign: 'center', border: `2px solid ${dreadRiskTextColors?.Low || '#1976d2'}` }}>
                        <div style={{ fontSize: '2em', fontWeight: 'bold', color: dreadRiskTextColors?.Low || '#1976d2' }}>{lowThreats}</div>
                        <div style={{ color: dreadRiskTextColors?.Low || '#1976d2' }}>Low</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Status Overview */}
              <section style={{ marginBottom: '2em' }}>
                <h4 style={{ color: 'var(--sc3-primary)', borderBottom: '2px solid var(--sc3-secondary)', paddingBottom: '0.5em' }}>
                  Threat Status Overview
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5em' }}>
                  {(() => {
                    const statusEntries = Object.entries(threatsByStatus);
                    const maxStatusCount = Math.max(...statusEntries.map(([, count]) => count));
                    
                    return statusEntries.map(([status, count]) => {
                      const intensity = count / maxStatusCount;
                      const elevation = Math.round(intensity * 8) + 2; // 2-10px shadow
                      const offset = Math.round(intensity * 3) + 1; // 1-4px offset
                      
                      const cardEffects = create3DCardEffect(elevation, offset, 'rgba(25,118,210,0.3)');
                      
                      return (
                        <div 
                          key={status} 
                          style={{ 
                            background: '#f8f9fa', 
                            padding: '0.75em', 
                            borderRadius: '4px', 
                            textAlign: 'center', 
                            border: '1px solid #dee2e6',
                            boxShadow: `${offset}px ${offset}px ${elevation}px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset`,
                            transform: `translateY(-${offset}px)`,
                            transition: 'all 0.2s ease',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                          {...cardEffects}
                        >
                          <div className="count-display" style={{ 
                            fontSize: '1.5em', 
                            fontWeight: 'bold', 
                            color: 'var(--sc3-primary)',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{count}</div>
                          <div className="label-display" style={{ 
                            fontSize: '0.9em', 
                            color: '#6c757d',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{status}</div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </section>

              {/* Data Classification Overview */}
              <section style={{ marginBottom: '2em' }}>
                <h4 style={{ color: 'var(--sc3-primary)', borderBottom: '2px solid var(--sc3-secondary)', paddingBottom: '0.5em' }}>
                  Data Classification Distribution
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5em' }}>
                  {(() => {
                    const classificationEntries = Object.entries(threatsByDataClassification);
                    const maxClassificationCount = Math.max(...classificationEntries.map(([, count]) => count));
                    
                    return classificationEntries.map(([classification, count]) => {
                      const intensity = count / maxClassificationCount;
                      const elevation = Math.round(intensity * 8) + 2; // 2-10px shadow
                      const offset = Math.round(intensity * 3) + 1; // 1-4px offset
                      
                      const cardEffects = create3DCardEffect(elevation, offset, 'rgba(74,85,104,0.3)');
                      
                      return (
                        <div 
                          key={classification} 
                          style={{ 
                            background: '#f5f7fa', 
                            padding: '0.75em', 
                            borderRadius: '4px', 
                            textAlign: 'center', 
                            border: '1px solid #cbd5e0',
                            boxShadow: `${offset}px ${offset}px ${elevation}px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset`,
                            transform: `translateY(-${offset}px)`,
                            transition: 'all 0.2s ease',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                          {...cardEffects}
                        >
                          <div className="count-display" style={{ 
                            fontSize: '1.5em', 
                            fontWeight: 'bold', 
                            color: '#4a5568',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{count}</div>
                          <div className="label-display" style={{ 
                            fontSize: '0.9em', 
                            color: '#6c757d',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{classification}</div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </section>

              {/* Business Criticality Overview */}
              <section style={{ marginBottom: '2em' }}>
                <h4 style={{ color: 'var(--sc3-primary)', borderBottom: '2px solid var(--sc3-secondary)', paddingBottom: '0.5em' }}>
                  Business Criticality Distribution
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5em' }}>
                  {(() => {
                    const criticalityEntries = Object.entries(threatsByBusinessCriticality);
                    const maxCriticalityCount = Math.max(...criticalityEntries.map(([, count]) => count));
                    
                    return criticalityEntries.map(([criticality, count]) => {
                      const intensity = count / maxCriticalityCount;
                      const elevation = Math.round(intensity * 8) + 2; // 2-10px shadow
                      const offset = Math.round(intensity * 3) + 1; // 1-4px offset
                      
                      const cardEffects = create3DCardEffect(elevation, offset, 'rgba(116,66,16,0.3)');
                      
                      return (
                        <div 
                          key={criticality} 
                          style={{ 
                            background: '#faf5f2', 
                            padding: '0.75em', 
                            borderRadius: '4px', 
                            textAlign: 'center', 
                            border: '1px solid #e2d5cc',
                            boxShadow: `${offset}px ${offset}px ${elevation}px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset`,
                            transform: `translateY(-${offset}px)`,
                            transition: 'all 0.2s ease',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                          {...cardEffects}
                        >
                          <div className="count-display" style={{ 
                            fontSize: '1.5em', 
                            fontWeight: 'bold', 
                            color: '#744210',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{count}</div>
                          <div className="label-display" style={{ 
                            fontSize: '0.9em', 
                            color: '#6c757d',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{criticality}</div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </section>

              {/* Priority Overview */}
              <section style={{ marginBottom: '2em' }}>
                <h4 style={{ color: 'var(--sc3-primary)', borderBottom: '2px solid var(--sc3-secondary)', paddingBottom: '0.5em' }}>
                  Priority Distribution
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5em' }}>
                  {(() => {
                    const priorityEntries = Object.entries(threatsByPriority);
                    const maxPriorityCount = Math.max(...priorityEntries.map(([, count]) => count));
                    
                    return priorityEntries.map(([priority, count]) => {
                      const intensity = count / maxPriorityCount;
                      const elevation = Math.round(intensity * 8) + 2; // 2-10px shadow
                      const offset = Math.round(intensity * 3) + 1; // 1-4px offset
                      
                      const cardEffects = create3DCardEffect(elevation, offset, 'rgba(85,60,123,0.3)');
                      
                      return (
                        <div 
                          key={priority} 
                          style={{ 
                            background: '#f7f5f9', 
                            padding: '0.75em', 
                            borderRadius: '4px', 
                            textAlign: 'center', 
                            border: '1px solid #d6d3d9',
                            boxShadow: `${offset}px ${offset}px ${elevation}px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset`,
                            transform: `translateY(-${offset}px)`,
                            transition: 'all 0.2s ease',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                          {...cardEffects}
                        >
                          <div className="count-display" style={{ 
                            fontSize: '1.5em', 
                            fontWeight: 'bold', 
                            color: '#553c7b',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{count}</div>
                          <div className="label-display" style={{ 
                            fontSize: '0.9em', 
                            color: '#6c757d',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{priority}</div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </section>

              {/* Actions Overview */}
              <section style={{ marginBottom: '2em' }}>
                <h4 style={{ color: 'var(--sc3-primary)', borderBottom: '2px solid var(--sc3-secondary)', paddingBottom: '0.5em' }}>
                  Suggested Actions Overview
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5em' }}>
                  {(() => {
                    const actionCounts = [
                      { label: 'With Actions', count: threatsWithActions, bg: '#f0f9f0', border: '#c6e6c6', color: '#2d5016' },
                      { label: 'Without Actions', count: threatsWithoutActions, bg: '#fdf2f2', border: '#e6cccc', color: '#742a2a' }
                    ];
                    const maxActionCount = Math.max(...actionCounts.map(item => item.count));
                    
                    return actionCounts.map((item, index) => {
                      const intensity = item.count / maxActionCount;
                      const elevation = Math.round(intensity * 8) + 2; // 2-10px shadow
                      const offset = Math.round(intensity * 3) + 1; // 1-4px offset
                      
                      const cardEffects = create3DCardEffect(elevation, offset, item.color.includes('#') ? item.color.replace('#', 'rgba(').slice(0, -1) + ',0.3)' : 'rgba(45,80,22,0.3)');
                      
                      return (
                        <div 
                          key={index}
                          style={{ 
                            background: item.bg, 
                            padding: '0.75em', 
                            borderRadius: '4px', 
                            textAlign: 'center', 
                            border: `1px solid ${item.border}`,
                            boxShadow: `${offset}px ${offset}px ${elevation}px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset`,
                            transform: `translateY(-${offset}px)`,
                            transition: 'all 0.2s ease',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                          {...cardEffects}
                        >
                          <div className="count-display" style={{ 
                            fontSize: '1.5em', 
                            fontWeight: 'bold', 
                            color: item.color,
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{item.count}</div>
                          <div className="label-display" style={{ 
                            fontSize: '0.9em', 
                            color: '#6c757d',
                            transition: 'all 0.2s ease',
                            transformStyle: 'preserve-3d'
                          }}>{item.label}</div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </section>

              {/* Category Heat Map */}
              <section style={{ marginBottom: '2em' }}>
                <h4 style={{ color: 'var(--sc3-primary)', borderBottom: '2px solid var(--sc3-secondary)', paddingBottom: '0.5em' }}>
                  Category Distribution Heat Map
                </h4>
                <p style={{ fontSize: '0.9em', color: '#6c757d', marginBottom: '1em' }}>
                  Visual representation of threat distribution across categories, ordered from most to fewest threats.
                </p>
                
                {(() => {
                  // Combine all categories for heat map
                  const allCategories = [
                    ...Object.entries(threatsByStatus).map(([name, count]) => ({ name: `Status: ${name}`, count, category: 'status' })),
                    ...Object.entries(threatsByDataClassification).map(([name, count]) => ({ name: `Data: ${name}`, count, category: 'data' })),
                    ...Object.entries(threatsByBusinessCriticality).map(([name, count]) => ({ name: `Business: ${name}`, count, category: 'business' })),
                    ...Object.entries(threatsByPriority).map(([name, count]) => ({ name: `Priority: ${name}`, count, category: 'priority' })),
                    { name: 'Actions: Without Actions', count: threatsWithoutActions, category: 'actions' }
                  ];

                  // Sort by count (most to fewest)
                  const sortedCategories = allCategories.sort((a, b) => b.count - a.count);
                  
                  // Calculate heat map colors based on relative values
                  const maxCount = Math.max(...sortedCategories.map(c => c.count));
                  const minCount = Math.min(...sortedCategories.map(c => c.count));
                  const range = maxCount - minCount || 1;

                  const getHeatColor = (count) => {
                    const intensity = (count - minCount) / range;
                    // Generate color from light blue (low) to dark red (high)
                    if (intensity < 0.25) return '#e3f2fd'; // Very light blue
                    if (intensity < 0.5) return '#90caf9';  // Light blue
                    if (intensity < 0.75) return '#ffb74d'; // Orange
                    return '#e57373'; // Light red
                  };

                  const getCategoryColor = (category) => {
                    switch (category) {
                      case 'status': return statusColors ? Object.values(statusColors)[0] || '#2196f3' : '#2196f3';
                      case 'data': return dataClassificationColors ? Object.values(dataClassificationColors)[0] || '#4caf50' : '#4caf50';
                      case 'business': return businessCriticalityColors ? Object.values(businessCriticalityColors)[0] || '#ff9800' : '#ff9800';
                      case 'priority': return priorityColors ? Object.values(priorityColors)[0] || '#9c27b0' : '#9c27b0';
                      case 'actions': return actionColors ? Object.values(actionColors)[0] || '#607d8b' : '#607d8b';
                      default: return '#757575';
                    }
                  };

                  return (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5em' }}>
                      {sortedCategories.map((item, index) => (
                        <div
                          key={`${item.category}-${item.name}`}
                          style={{
                            background: getHeatColor(item.count),
                            padding: '0.75em',
                            borderRadius: '4px',
                            textAlign: 'center',
                            border: `2px solid ${getCategoryColor(item.category)}`,
                            position: 'relative',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <div style={{ 
                            fontSize: '0.7em', 
                            color: getCategoryColor(item.category), 
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '0.25em'
                          }}>
                            #{index + 1}
                          </div>
                          <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#2c3e50' }}>
                            {item.count}
                          </div>
                          <div style={{ fontSize: '0.85em', color: '#34495e', fontWeight: '500' }}>
                            {item.name}
                          </div>
                          <div style={{ 
                            fontSize: '0.7em', 
                            color: '#7f8c8d', 
                            marginTop: '0.25em',
                            fontStyle: 'italic'
                          }}>
                            {((item.count / totalThreats) * 100).toFixed(1)}% of total
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </section>
            </>
          )}
        </div>
      </details>
    </div>
  );
};

export default TMReport;