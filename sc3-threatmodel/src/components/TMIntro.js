import React, { useState } from "react";
import "./TM.css";

const TMIntro = () => {
  
  // State for guidance section
  const [showImplementationGuidance, setShowImplementationGuidance] = useState(false);
  const [showBreakingItDown, setShowBreakingItDown] = useState(false);
  
  // State for SVG modal
  const [showSvgModal, setShowSvgModal] = useState(false);
  const [svgZoom, setSvgZoom] = useState(1);

  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG modal functions
  const openSvgModal = () => {
    setShowSvgModal(true);
    setSvgZoom(1);
  };

  const closeSvgModal = () => {
    setShowSvgModal(false);
    setSvgZoom(1);
  };

  const zoomIn = () => {
    setSvgZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setSvgZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setSvgZoom(1);
  };

  // Back to top button component
  const BackToTopButton = () => (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <button 
        onClick={scrollToTop}
        className="tm-btn tm-btn-secondary"
        style={{ 
          fontSize: '0.9rem',
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        title="Back to top of page"
      >
        ↑ Back to Top
      </button>
    </div>
  );

  return (
    <details className="tm-intro-details">
      <summary className="tm-intro-summary">
        📚 Threat Modelling Guidance and Preparation
      </summary>
        <p>
            <em>Threat modeling</em> is a proactive approach to identifying and mitigating potential security threats to a system. It involves analyzing the system architecture, identifying potential attack vectors, and implementing security controls to mitigate those risks.
            Threat modeling is a key activity of the Security Development Lifecycle (SDL) and is essential for building secure systems. It helps organisations understand their threat landscape, prioritize risks, and implement appropriate security measures.
        </p>
        <p>Also see:</p>
        <ul>
            <li><a href="https://www.iso.org/standard/27001">ISO/IEC 27001:2022</a> - Information security, cybersecurity and privacy protection — Information security management systems — Requirements</li>
            <li><a href="https://www.iso.org/standard/75652.html">ISO/IEC 27002:2022</a> - Information security, cybersecurity and privacy protection — Information security controls</li>
            <li><a href="https://www.iso.org/standard/80585.html">ISO/IEC 27005:2022</a> - Information security, cybersecurity and privacy protection — Guidance on managing information security risks</li>
            <li><a href="https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final">NIST SP 800-53</a> - Security and Privacy Controls for Information Systems and Organizations</li>
            <li><a href="https://csrc.nist.gov/pubs/sp/800/154/ipd">NIST SP 800-154</a> - Guide to Data-Centric System Threat Modeling</li>
            <li><a href="https://csrc.nist.gov/publications/detail/sp/800-218/final">NIST SP 800-218</a> - Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities</li>
            <li><a href="https://www.nist.gov/cyberframework">NIST Cybersecurity Framework (CSF)</a></li>
        </ul>
        
        <p>ISO tends to focus on risk treatment and governance, while NIST offers practical guidance and tools for integration into development lifecycles.</p>

        {/* ISO/IEC 27001:2022 Mapping Table */}
        <h3 role="doc-subtitle" style={{marginTop: '2em'}}>ISO/IEC 27001 Mapping</h3>
        <div style={{overflowX: 'auto'}}>
        <table className="tm-intro-table">
          <thead>
            <tr className="tm-intro-table-header">
              <th className="tm-intro-table th">Threat Modeling Output</th>
              <th className="tm-intro-table th">Related ISO Control</th>
              <th className="tm-intro-table th">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tm-intro-table td">Identified Threat Actors and Attack Vectors</td>
              <td className="tm-intro-table td">ISO/IEC 27001:2022 Annex A 5.7 - Threat Intelligence</td>
              <td className="tm-intro-table td">Supports proactive threat awareness and aligns with business context</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Asset-Targeted Attack Scenarios</td>
              <td className="tm-intro-table td">ISO/IEC 27001:2022 Annex A 5.12 - Classification of Information</td>
              <td className="tm-intro-table td">Helps assess risk impact of system / environment changes</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Technical Vulnerability Discovery</td>
              <td className="tm-intro-table td">ISO/IEC 27001:2022 Annex A 8.8 - Vulnerability Management</td>
              <td className="tm-intro-table td">Informs treatment plans and patch prioritization</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Countermeasure Mapping</td>
              <td className="tm-intro-table td">ISO/IEC 27001:2022 Annex A 8.27 - Security Architecture</td>
              <td className="tm-intro-table td">Supports design decisions and aligns controls with threat profiles</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Best Practice on Information Security Controls</td>
              <td className="tm-intro-table td">ISO/IEC 27002 guidance</td>
              <td className="tm-intro-table td">Enhances audit evidence and risk communication</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Risk Evaluation and Likelihood Scores</td>
              <td className="tm-intro-table td">ISO/IEC 27005</td>
              <td className="tm-intro-table td">Core input to structured risk assessment methodology</td>
            </tr>
          </tbody>
        </table>
        </div>

        {/* NIST Cybersecurity Framework Mapping Table */}
        <h3 role="doc-subtitle">NIST Cybersecurity Framework Mapping</h3>
        <div style={{overflowX: 'auto'}}>
        <table  className="tm-intro-table">
          <thead>
            <tr>
              <th className="tm-intro-table th">Threat Modeling Output</th>
              <th className="tm-intro-table th">NIST CSF Function / Category</th>
              <th className="tm-intro-table th">Practical Application</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tm-intro-table td">System and Data Flow Diagrams</td>
              <td className="tm-intro-table td"><b>Govern</b> Organisational Context (GV.OC) and <b>Identify</b> Asset Management (ID.AM)</td>
              <td className="tm-intro-table td">Baseline system characterization, boundary awareness, and organisational context</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Mitigation Strategy Evaluation</td>
              <td className="tm-intro-table td"><b>Identify</b> Incident Management (ID.IM)</td>
              <td className="tm-intro-table td">Strengthens resilience through informed recovery planning</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Threat Enumeration and Attack Surface</td>
              <td className="tm-intro-table td"><b>Protect</b> Data Security (PR.DS)</td>
              <td className="tm-intro-table td">Drives control selection and implementation</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Vulnerability Integration</td>
              <td className="tm-intro-table td"><b>Detect</b> Continuous Monitoring (DE.CM)</td>
              <td className="tm-intro-table td">Elevates detection capabilities through contextual threat awareness</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Risk Prioritization and Impact Scoring</td>
              <td className="tm-intro-table td"><b>Respond</b> Incident Management (RS.MA)</td>
              <td className="tm-intro-table td">Informs incident response planning and contingency strategies</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Recovery Planning and Lessons Learned</td>
              <td className="tm-intro-table td"><b>Recover</b> Incident Recovery Plan Execution and Incident Recovery Communication (RC.RP, RC.CO)</td>
              <td className="tm-intro-table td">Supports development and testing of recovery plans, backup/restoration procedures, and continuous improvement through post-incident reviews. Threat modeling outputs inform resilience and recovery activities.</td>
            </tr>
          </tbody>
        </table>
        </div>

        <p>Additional resources can be found at:</p>
        <ul>
            <li><a href="https://www.cisa.gov/resources-tools/resources?f%5B0%5D=resource_type%3A43">CISA Publications</a></li>
            <li><a href="https://www.nist.gov/publications">NIST Publications</a></li>
            <li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html">OWASP Threat Modeling Cheat Sheet</a></li>
            <li><a href="https://shostack.org/resources/threat-modeling">Shostack Threat Modeling Resources</a></li>
            <li><a href="https://threat-modeling.com/">Threat Modeling</a></li>
            <li><a href="https://learn.microsoft.com/en-us/windows-hardware/drivers/driversecurity/threat-modeling-for-drivers">Threat Modeling for Drivers - a worked example.</a></li>
        </ul>
        <h3>Before commencing a threat modeling exercise, it is important to:</h3>
        <ol>
            <li>Define the scope and objectives of the threat modeling effort.</li>
            <li>Define the Threat Modelling methodology to be used.</li>
              <ul>
                <li><strong>Asset-centric:</strong> Threat modeling focusing on system assets and the business impact from the loss of those assets.</li>
                <li><strong>Attack-centric:</strong> Threat modeling focusing on potential attacks that have the greatest chance of success and their impact on the system.</li>
                <li><strong>System-centric:</strong> Threat modeling focusing on the system's architecture, components, and their interactions to identify potential threats.</li>
              </ul>
            <li>Gather relevant documentation, such as system architecture diagrams and data flow diagrams.</li>
            <li>Identify key stakeholders and involve them in the process.</li>
        </ol>
        <h3>Key steps in the threat modeling process include:</h3>
        <ol>
            <li>Identify assets and their value to the organisation.</li>
            <li>Create a visual model of the system to be analysed, such as a system architecture and data flows and message sequence diagrams.</li>
            <li>Identify potential threats and vulnerabilities.</li>
            <li>Assess the risk associated with each threat.</li>
            <li>Define and implement mitigation strategies, prioritised by risk.</li>
            <li>Validate that the threats have been mitigated.</li>
            <li>Review and update the threat model regularly.</li>
        </ol>     

        {/* OWASP Threat Modeling Technique */}
        <h3 role="doc-subtitle" style={{marginTop: '2em'}}>Threat Modeling Steps</h3>
        <p>
          The <strong>Threat Modeling Manifesto</strong> recommends focusing on four key questions:
        </p>
        <ol>
          <li><strong>What are we working on?</strong> Asset Identification<br />
            Define the system, application, or feature in scope. Gather architecture diagrams, data flows, and clarify boundaries and assets.</li>
          <li><strong>What can go wrong?</strong> Risk Assessment and Analysis<br />
            Identify potential threats, vulnerabilities, and attack scenarios that could impact the system. Use frameworks like STRIDE to brainstorm possible issues.</li>
          <li><strong>What are we going to do about that?</strong> Build Effective Controls<br />
            Determine mitigations, controls, or design changes to address the identified threats and reduce risk to acceptable levels.</li>
          <li><strong>Did we do a good enough job?</strong> Assess Effectiveness of Actions<br />
            Review the process, validate that threats are addressed, and ensure the model is kept up to date as the system evolves.</li>
        </ol>
        <p>
          This iterative, question-based method encourages collaboration, continuous improvement, and practical risk reduction. It is suitable for agile teams and can be integrated into regular development workflows.
        </p>
        <p>
          The Threat Modeling process should be fast and inexpensive, balancing efficiency and thoroughness in breadth, and where this identifies areas of greater concern, additional scrutiny and in-depth analysis should be applied.
        </p>
        <p>As both systems and threats constantly evolve, keeping threat models up to date manually can be challenging. Automating the threat modeling process through the adoption of automated threat modeling tools is essential to maintain an effective security posture. 
          Automate threat modeling as much as possible such as through integration with CI/CD pipelines and continuous monitoring with SIEM solutions and machine learning tools, and complement with manual threat modeling efforts as needed.</p>
        <p>Risks associated with outdated threat models include increased vulnerability to attacks, failure to comply with regulations, and potential financial losses. Regularly updating threat models helps mitigate these risks.</p>
        <p>Risks associated with automated threat modeling include over reliance on the tool, security knowledge gaps of those configuring the tool, tool accuracy, potential for false positives/negatives, too noisy to find actual threats, and the need for continuous tuning and validation of models.</p>

        <BackToTopButton />

        <h2>🧭 What are we working on?</h2>
        <p>This involves defining the system, application, or feature in scope. It is important to gather architecture diagrams, data flows, and clarify boundaries and assets.</p>
        <p>Asset inventories are crucial for understanding what needs protection. They should include:</p>
        <ul>
          <li>Hardware assets (e.g., servers, workstations)</li>
          <li>Software assets (e.g., applications, libraries)</li>
          <li>Data assets (e.g., databases, files)</li>
          <li>Network assets (e.g., firewalls, routers)</li>
        </ul>
        <p>Automated asset inventories help monitor for changes to the environment that may require threat modeling. This can include changes in the network topology, the addition of new applications, or updates to existing systems, etc.</p>

        <h3>Components of data flow diagrams (DFDs) as used in threat modeling</h3>
        <p>Data flow diagrams (DFDs) are a visual representation of the flow of data within a system. They help identify how data is processed, stored, and transmitted between different components. Key components of DFDs include:</p>
        <ul>
          <li><strong>Data Stores:</strong> Represent the storage of data within the system. Data stores are usually depicted as open-ended rectangles.</li>
          <li><strong>Data Flows:</strong> Represent the movement of data between processes, data stores, and external entities. Data flows are usually depicted as arrows.</li>
          <li><strong>Processes:</strong> Represent the transformation of data within the system. Processes are typically depicted as circles or ovals.</li>
          <li><strong>External Entities:</strong> Represent actors or systems that interact with the system being modeled. External entities are typically depicted as squares or rectangles.</li>
          <li><strong>Trust Boundaries:</strong> Represent the lines between different security domains within the system. Trust boundaries help identify areas where different security controls may apply. Trust boundaries are typically depicted as dashed lines.</li>
        </ul>
        <div className="tm-intro-dfd-sample-diagram" style={{ margin: "1em 0" }}>
          <svg 
            width="300" 
            height="120"
            style={{ cursor: 'pointer' }}
            onDoubleClick={openSvgModal}
            title="Double-click to view in full screen with zoom"
          >            
            {/* Data Store */}
            {/* Top border */}
            <line x1="10" y1="45" x2="70" y2="45" stroke="#333" strokeWidth="2" />
            {/* Bottom border */}
            <line x1="10" y1="75" x2="70" y2="75" stroke="#333" strokeWidth="2" />
            {/* Fill the rectangle area */}
            <rect x="10" y="45" width="60" height="30" fill="#fff" stroke="none" />
            <text x="40" y="65" fontSize="12" textAnchor="middle" fill="#000" >Data Store</text>

            {/* Data Flow Arrow */}
            <line x1="70" y1="60" x2="120" y2="60" stroke="#d0021b" strokeWidth="1" />
            <polygon points="120,60 115,55 115,65" fill="#d0021b" />

            {/* Process */}
            <circle cx="145" cy="60" r="25" fill="#dfefca" stroke="#444" strokeWidth="0.5" />
            <text x="145" y="65" fontSize="12" textAnchor="middle" fill="#000">Process</text>

            {/* Data Flow Arrow */}
            <line x1="170" y1="60" x2="220" y2="60" stroke="#d0021b" strokeWidth="1" />
            <polygon points="220,60 215,55 215,65" fill="#d0021b" />

            {/* External Entity */}
            <rect x="220" y="40" width="40" height="40" fill="#f6caca" stroke="#444" strokeWidth="0.5" />
            <text x="240" y="35" fontSize="12" textAnchor="middle">Entity</text>

            {/* Trust Boundary */}
            <line x1="195" y1="20" x2="195" y2="90" stroke="#9013fe" strokeWidth="2" strokeDasharray="6,4" />
            <text x="195" y="100" fontSize="12" textAnchor="middle" fill="#9013fe">Trust Boundary</text>
          </svg>  
        </div>

        <p>One weakness of DFDs is that they do not capture where connections are initiated from and can be limited in their ability to convey control of interactions. 
          Behavioural diagrams such as Sequence and Communication diagrams and Control flow graphs (CFGs) are complementary to DFDs. 
          They illustrate how different components of a system interact over time and can convey from where connections are initiated, helping to identify potential security issues in the flow of data and control.</p>
        <p>DFDs can also be further enhanced through user stories, persona mappings, data classification schemes, and other techniques that capture the context, sensitivity, and intent behind data flows.</p>
        <p>As an example: A data flow diagram may convey that a data flow originates from an internal data store and is sent across trust boundaries to an external entity for processing. 
          However, it may not convey if the external entity is trusted to initiate a call to pull the data from a publicly exposed endpoint or if the data is being pushed to the external entity through the external entity's own publicly exposed endpoint.
          Nor does it convey how the data store moves its data to the internal process that is mediating the transfer of the data to the external entity.
          Knowing these interactions will have an impact on how the threats are modelled with respect to this data flow, allowing better identification of entry points, access rights, and potential attack vectors, etc.</p>

        <BackToTopButton />

        <h2>🔍 What can go wrong?</h2>
        <p>There are several things that can go wrong in a system, including:</p>
        <ul>
          <li>Unauthorized access to sensitive data</li>
          <li>Data manipulation or corruption</li>
          <li>Denial of service attacks</li>
          <li>Insider threats</li>
          <li>Inadequate logging and monitoring</li>
        </ul>
        <p>To identify potential threats, it is important to consider the system's architecture, data flows, and potential attack vectors.
          Threat modeling frameworks such as STRIDE and DREAD can be used to systematically identify and categorize threats.
          The OWASP Threat Modeling technique also provides a practical, question-driven approach to identifying threats.</p>

        {/* STRIDE and DREAD Frameworks */}
        <h3 role="doc-subtitle" style={{marginTop: '2em'}}>STRIDE: Threat Identification Framework</h3>
        <p>
          STRIDE is a threat modeling framework that helps identify and categorize potential threats to a system. It is an acronym for six categories of threats:
        </p>
        <div style={{overflowX: 'auto'}}>
        <table className="tm-intro-table">
          <thead>
            <tr>
              <th className="tm-intro-table th">Category</th>
              <th className="tm-intro-table th">Threat Type</th>
              <th className="tm-intro-table th">Desired Property Violated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tm-intro-table td"><b>S</b>poofing</td>
              <td className="tm-intro-table td">Impersonation</td>
              <td className="tm-intro-table td">Authenticity</td>
            </tr>
            <tr>
              <td className="tm-intro-table td"><b>T</b>ampering</td>
              <td className="tm-intro-table td">Data manipulation</td>
              <td className="tm-intro-table td">Integrity</td>
            </tr>
            <tr>
              <td className="tm-intro-table td"><b>R</b>epudiation</td>
              <td className="tm-intro-table td">Denial of actions</td>
              <td className="tm-intro-table td">Auditability</td>
            </tr>
            <tr>
              <td className="tm-intro-table td"><b>I</b>nformation Disclosure</td>
              <td className="tm-intro-table td">Unauthorized access</td>
              <td className="tm-intro-table td">Confidentiality</td>
            </tr>
            <tr>
              <td className="tm-intro-table td"><b>D</b>enial of Service</td>
              <td className="tm-intro-table td">Service disruption</td>
              <td className="tm-intro-table td">Availability</td>
            </tr>
            <tr>
              <td className="tm-intro-table td"><b>E</b>levation of Privilege</td>
              <td className="tm-intro-table td">Unauthorized access escalation</td>
              <td className="tm-intro-table td">Authorisation</td>
            </tr>
          </tbody>
        </table>
        </div>
        <ul>
          <li>Purpose: Helps identify what could go wrong in a system.</li>
          <li>Strengths: Easy to apply during design; aligns well with CIA triad; great for brainstorming threats.</li>
          <li>Use Case: Early-stage architecture reviews, Data Flow Diagram (DFD)-based modeling, secure Software Development Life Cycle (SDLC) integration.</li>
        </ul>

        <h3 role="doc-subtitle" style={{marginTop: '2em'}}>DREAD: Threat Prioritization Framework</h3>
        <p>
          DREAD is a risk assessment framework used to quantify and prioritize threats based on their severity. Helps as an input into answering the question: "What are we going to do about that?" It is an acronym for five factors:
        </p>
        <div style={{overflowX: 'auto'}}>
        <table className="tm-intro-table">
          <thead>
            <tr>
              <th className="tm-intro-table th tm-intro-table-narrow-column">Category</th>
              <th className="tm-intro-table th tm-intro-table-wide-column">What It Measures</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tm-intro-table td tm-intro-table-narrow-column"><b>D</b>amage</td>
              <td className="tm-intro-table td tm-intro-table-wide-column">Potential impact of the threat</td>
            </tr>
            <tr>
              <td className="tm-intro-table td tm-intro-table-narrow-column"><b>R</b>eproducibility</td>
              <td className="tm-intro-table td tm-intro-table-wide-column">Ease of repeating the attack</td>
            </tr>
            <tr>
              <td className="tm-intro-table td tm-intro-table-narrow-column"><b>E</b>xploitability</td>
              <td className="tm-intro-table td tm-intro-table-wide-column">Effort required to exploit the threat</td>
            </tr>
            <tr>
              <td className="tm-intro-table td tm-intro-table-narrow-column"><b>A</b>ffected Users</td>
              <td className="tm-intro-table td tm-intro-table-wide-column">Scope of impact on users</td>
            </tr>
            <tr>
              <td className="tm-intro-table td tm-intro-table-narrow-column"><b>D</b>iscoverability</td>
              <td className="tm-intro-table td tm-intro-table-wide-column">Likelihood of attacker finding the threat</td>
            </tr>
          </tbody>
        </table>
        </div>
        <ul>
          <li>Purpose: Quantifies and prioritizes threats based on severity.</li>
          <li>Strengths: Helps rank threats for remediation; useful in triage and risk scoring.</li>
          <li>Use Case: Post-identification phase; complements STRIDE or other models.</li>
          <li>Including discoverability as a factor for assessment has led to criticism that it rewards security through obscurity, and in practice is either removed from the assessment or always given the maximum rating.</li>
          <li>N.B. DREAD is part of a risk assessment system that was formerly used by Microsoft but discontinued due to its subjectivity and inconsistent assessments, replacing it with a simpler classification of low, moderate, important, and critical; <a href="https://msdn.microsoft.com/en-us/library/cc307404.aspx">Microsoft Security Development Lifecycle (SDL)</a>.</li>
        </ul>

        <h3 role="doc-subtitle" style={{marginTop: '2em'}}>Key Differences between STRIDE and DREAD</h3>
        <div style={{overflowX: 'auto'}}>
        <table className="tm-intro-table">
          <thead>
            <tr>
              <th className="tm-intro-table th">Aspect</th>
              <th className="tm-intro-table th">STRIDE</th>
              <th className="tm-intro-table th">DREAD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tm-intro-table td">Focus</td>
              <td className="tm-intro-table td">Threat types</td>
              <td className="tm-intro-table td">Threat severity</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Output</td>
              <td className="tm-intro-table td">Threat categories</td>
              <td className="tm-intro-table td">Risk scores (0-50 or 1-10 per factor)</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Application Stage</td>
              <td className="tm-intro-table td">Early design</td>
              <td className="tm-intro-table td">Post-identification / triage</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Subjectivity</td>
              <td className="tm-intro-table td">Lower (categorical)</td>
              <td className="tm-intro-table td">Higher (scoring can vary by assessor)</td>
            </tr>
            <tr>
              <td className="tm-intro-table td">Integration</td>
              <td className="tm-intro-table td">Works well with DFDs, SDLC</td>
              <td className="tm-intro-table td">Often paired with STRIDE or CVSS</td>
            </tr>
          </tbody>
        </table>
        </div>      

        <BackToTopButton />

        <h2>🛡️ What are we going to do about that?</h2>

        <p>Once the threats are identified, you need to answer the question: "What are we going to do about that?" Similar to responding to risks, suggested Threat Modeling actions:</p>  
        <ul>
          <li><strong>Mitigate:</strong> Take action to reduce the likelihood of the threat materializing.</li>
          <li><strong>Eliminate:</strong> Remove the feature or component that is causing the threat.</li>
          <li><strong>Transfer:</strong> Shift the responsibility to another entity, such as the customer.</li>
          <li><strong>Accept:</strong> If none of the above options are acceptable, acknowledge the risk posed by the threat and don't take any action.</li>
        </ul>

        <p>Once a threat has been identified, consider codifying it in a pattern such as web app authentication pattern. Then when applications require web app authentication, if they are implemented as per the pattern, another threat assessment is not required.
          However, if the implementation deviates from the pattern, a new threat assessment may be necessary. 
          Pattern libraries can take significant investment in time to build, but they can greatly enhance the efficiency and effectiveness of the threat modeling process with an expectation that they will have a ROI.</p>

        <h2>📝 Did we do a good enough job?</h2>
        <p>Finally, you need to answer the question: "Did we do a good enough job?" This involves reviewing the threat model and ensuring that all identified threats have been addressed.
          It is important to validate that the threats have been mitigated and that the threat model is kept up to date as the system evolves. This can be done through regular reviews, testing, and validation of the threat model.</p>

        <BackToTopButton />

        <div className="tm-intro-guidance-container">
          <div
            className="tm-intro-guidance-toggle"
            onClick={() => setShowBreakingItDown(!showBreakingItDown)}
          >
            <h3 className="tm-intro-guidance-title">
              Breaking It Down
            </h3>
            <span className="tm-intro-guidance-toggle-icon">
              {showBreakingItDown ? "−" : "+"}
            </span>
          </div>
          {showBreakingItDown && (
            <div className="tm-intro-guidance-content">
              <p>
                Threat Modelling is largely about imagining potential threats and vulnerabilities in a system, and proactively addressing them before they can be exploited. 
                The effectiveness of a threat model depends on the quality of the information gathered, the expertise of the team involved, the commitment to addressing identified threats, and not least, the ability to visualise, anticipate, and imagine potential attack vectors.
              </p>
              <p>
                Threat Model frameworks all share common elements, including the identification of assets, potential threats, vulnerabilities, and the implementation of mitigations. 
                They often incorporate best practices from various security standards and methodologies, providing a structured approach to threat modeling. However, it can be daunting to navigate the myriad of frameworks and tools available, especially for those new to threat modeling.
              </p>
              <p>
                All threat modelling frameworks are based on the same fundamental principles, but they may differ in their approach, terminology, and specific techniques used.
              </p>
              <ul>
                <li>Protecting the Confidentiality, Integrity, and Availability (CIA Triad) of data assets.</li>
                <li>Like any good crime novelist or journalist; envisaging the Who, What, Where, When, Why, and How of potential threats.</li>
              </ul>
              <p>
                It is best to start from basic principles and build upon these with more advanced techniques as capabilities mature, keeping in mind that regardless of the specific framework or methodology used, the core principles of threat modeling remain the same.
              </p>
              <div className="tm-intro-table-container">
                <table className="tm-intro-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1em', marginBottom: '1em' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', textAlign: 'center' }}></th>
                    <th style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>Target</th>
                    <th style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>Attacker</th>
                    <th style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>Defender</th>
                    <th style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>Framework</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', backgroundColor: '#f8f9fa', verticalAlign: 'top', textAlign: 'center' }}>Who</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>People</li>
                          <ul style={{ margin: '4px 0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                            <li>Staff</li>
                            <li>Privileged Users such as Administrators</li>
                            <li>Executives</li>
                            <li>Third-Party Vendors</li>
                            <li>Business Partners</li>
                            <li>Customers</li>
                          </ul>
                        <li>Critical Assets</li>
                          <ul style={{ margin: '4px 0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                            <li>Data Assets</li>
                            <li>System Assets</li>
                            <li>Physical Assets</li>
                          </ul>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>Insider Threats</li>
                        <ul style={{ margin: '4px 0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                          <li>Employees</li>
                          <li>Contractors</li>
                          <li>Business Partners</li>
                          <li>Supply Chain Partners</li>
                          <li>Third-Party Vendors</li>
                        </ul>
                        <li>External Attackers</li>
                        <ul style={{ margin: '4px 0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                          <li>Disgruntled Customers</li>
                          <li>Script Kiddies</li>
                          <li>Individual Hackers / Hacktivists</li>
                          <li>Hacker Collectives</li>
                          <li>Criminal Organizations</li>
                          <li>Competitors</li>
                          <li>Nation-State Actors</li>
                        </ul>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>Security Teams</li>
                        <li>Incident Response Teams</li>
                        <li>IT Support Staff</li>
                        <li>Third-Party Vendors</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>Personae non Gratae (PnG)</li>
                        <li>Threat Actor Profiling</li>
                        <li>User Story Mapping</li>
                        <li>Stakeholder Analysis</li>
                        <li>OCTAVE (Asset-Driven)</li>
                        <li>Security Cards (Human Impact)</li>
                        <li>Hybrid Threat Modeling Method (hTMM)</li>
                        <li>Attack Trees (Actor Modeling)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', backgroundColor: '#f8f9fa', verticalAlign: 'top', textAlign: 'center' }}>What</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>Data</li>
                        <li>Applications</li>
                        <li>Infrastructure</li>
                        <li>Identities / Credentials</li>
                        <li>Processes</li>
                        <ul style={{ margin: '4px 0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                          <li>Business Processes</li>
                          <li>Data Flows</li>
                          <li>Integration Points</li>
                        </ul>
                        <li>Technology</li>
                        <ul style={{ margin: '4px 0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                          <li>Hardware</li>
                          <li>Software</li>
                          <li>Network Infrastructure</li>
                        </ul>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>Data Theft</li>
                        <li>Data Manipulation</li>
                        <li>Service Disruption</li>
                        <li>System Compromise</li>
                        <li>Denial of Service</li>
                        <li>Reputation Damage</li>
                        <li>Intellectual Property Theft</li>
                        <li>Credential Theft</li>
                        <li>Account Takeover</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Data Protection</li>
                        <li>System Integrity</li>
                        <li>Service Availability</li>
                        <li>Compliance with Regulations</li>
                        <li>Business Continuity
                          <ul>
                            <li>Disaster Recovery</li>
                            <li>Incident Response</li>
                            <li>Backup and Restore</li>
                          </ul>
                        </li>
                        <li>Asset Management
                          <ul>
                            <li>Inventory Management</li>
                            <li>Asset Classification</li>
                            <li>Asset Lifecycle Management</li>
                            <li>Configuration Management</li>
                            <li>Patch Management</li>
                            <li>Vulnerability Management</li>
                            <li>Change Management</li>
                            <li>Release Management</li>
                            <li>Continuous Integration/Continuous Deployment (CI/CD)</li>
                            <li>Infrastructure as Code (IaC)</li>
                            <li>Security as Code (SaC)</li>
                            <li>Hardware Asset Management (HAM) / Software Asset Management (SAM)</li>
                            <li>License Management</li>
                            <li>Cloud Asset Management</li>
                            <li>Certificate Management</li>
                          </ul>
                        </li>
                        <li>Security Awareness
                          <ul>
                            <li>Training Programs</li>
                            <li>Phishing Simulations</li>
                            <li>Security Policies</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>CIA Triad (Confidentiality, Integrity, Availability)</li>
                        <li>Data Classification Frameworks</li>
                        <li>Application Security Frameworks</li>
                        <li>Infrastructure Security Frameworks</li>
                        <li>Process Mapping and Analysis Tools</li>
                        <li>CVSS (Common Vulnerability Scoring System)</li>
                        <li>CVE-CWE Mapping</li>
                        <li>OWASP SAMM (Software Assurance Maturity Model)</li>
                        <li>Trike (Requirements-Based Modeling)</li>
                        <li>LINDDUN (Privacy-Focused)</li>
                        <li>DREAD (Risk Assessment)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', backgroundColor: '#f8f9fa', verticalAlign: 'top', textAlign: 'center' }}>Where</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>On-Premises</li>
                        <li>Cloud Environments</li>
                        <li>Hybrid Environments</li>
                        <li>Third-Party Systems</li>
                        <li>Mobile Devices</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: '0', paddingLeft: '20px', listStylePosition: 'inside' }}>
                        <li>Network Perimeter</li>
                        <li>Endpoints</li>
                        <li>Cloud Services</li>
                        <li>Third-Party Integrations</li>
                        <li>Mobile Applications</li>
                        <li>IoT / OT Devices</li>
                        <li>Embedded Systems</li>
                        <li>Legacy Systems</li>
                        <li>Email Systems</li>
                        <li>Workstations, Laptops, Desktops</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Network Segmentation</li>
                        <li>Access Controls</li>
                        <li>Endpoint Protection</li>
                        <li>Cloud Security Posture Management (CSPM)</li>
                        <li>Zero Trust Security</li>
                        <li>Mobile Device Management (MDM)</li>
                        <li>Mobile Application Management (MAM)</li>
                        <li>Data Loss Prevention (DLP)</li>
                        <li>IoT / OT Security Solutions</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>STRIDE (Environment-Specific)</li>
                        <li>LINDDUN (Privacy by Design)</li>
                        <li>PASTA (Technical Scope Analysis)</li>
                        <li>OCTAVE (Infrastructure Assessment)</li>
                        <li>Cloud Security Frameworks</li>
                        <li>IoT/OT Security Frameworks</li>
                        <li>Zero Trust Architecture</li>
                        <li>Network Security Frameworks</li>
                        <li>Mobile Security Frameworks</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', backgroundColor: '#f8f9fa', verticalAlign: 'top', textAlign: 'center' }}>When</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>During Design Phase</li>
                        <li>During Development Phase</li>
                        <li>During Deployment Phase</li>
                        <li>During Maintenance Phase</li>
                        <li>During Operational Phase</li>
                        <li>During Incident Response</li>
                        <li>On Market Announcement</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Vulnerability Detected</li>
                        <li>Following a Security Breach</li>
                        <li>Political Event</li>
                        <li>Negative Publicity</li>
                        <li>Regulatory Change</li>
                        <li>Market Competition</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>24/7</li>
                        <li>Red Team / Blue Team Exercises</li>
                        <li>Incident Response Drills</li>
                        <li>Threat Hunting</li>
                        <li>Continuous Monitoring</li>
                        <li>Security Audits</li>
                        <li>Penetration Testing</li>
                        <li>Responding to an Incident</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>SDL (Security Development Lifecycle)</li>
                        <li>DevSecOps Integration</li>
                        <li>Continuous Risk Assessment</li>
                        <li>Incident Response Planning</li>
                        <li>SSDLC (Secure Software Development Lifecycle)</li>
                        <li>Agile Threat Modeling</li>
                        <li>VAST (Visual, Agile, and Simple Threat)</li>
                        <li>Threat Modeling Manifesto</li>
                        <li>DORA/TLPT (Regulatory Testing)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', backgroundColor: '#f8f9fa', verticalAlign: 'top', textAlign: 'center' }}>Why</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Access to Sensitive Data</li>
                        <li>Access to Privileged Permissions</li>
                        <li>Opportunistic</li>
                        <li>Vulnerable</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Boredom</li>
                        <li>Personal Gratification</li>
                        <li>Curiosity</li>
                        <li>Financial Gain</li>
                        <li>Revenge / Malice</li>
                        <li>Ideological Beliefs</li>
                        <li>Thrill-Seeking</li>
                        <li>Competition</li>
                        <li>Reputation</li>
                        <li>Anarchy</li>
                        <li>Disruption of Services</li>
                        <li>Other</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>To Protect Sensitive Data</li>
                        <li>To Ensure System Integrity</li>
                        <li>To Maintain Service Availability</li>
                        <li>To Comply with Regulations</li>
                        <li>To Mitigate Risks</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Attack Tree Analysis</li>
                        <li>Motivation Modeling</li>
                        <li>Kill Chain Analysis (Cyber Kill Chains)</li>
                        <li>CAPEC (Common Attack Pattern Enumeration)</li>
                        <li>Personae non Gratae (PnG) Motivation Analysis</li>
                        <li>Security Cards (Adversary Motivations)</li>
                        <li>MITRE ATT&CK (Tactics & Techniques)</li>
                        <li>Threat Intelligence Integration</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', fontWeight: 'bold', backgroundColor: '#f8f9fa', verticalAlign: 'top', textAlign: 'center' }}>How</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Vulnerable Configurations</li>
                        <li>Weak Authentication</li>
                        <li>Poor Security Practices</li>
                        <li>Inadequate Monitoring</li>
                        <li>Human Factors</li>
                          <ul>
                            <li>Scammed</li>
                            <li>Identity Theft</li>
                            <li>Weak Passwords</li>
                            <li>Shared Credentials</li>
                            <li>Passwords on Sticky Notes</li>
                          </ul>
                        <li>Technical Debt</li>
                          <ul>
                            <li>Jailbroken Devices</li>
                            <li>Unpatched Software</li>
                            <li>Misconfigured Settings</li>
                            <li>Legacy Systems</li>
                          </ul>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Hacked passwords</li>
                        <li>Phishing attacks</li>
                        <li>Social engineering</li>
                        <li>Impersonation</li>
                        <li>Credential stuffing</li>
                        <li>Brute force attacks</li>
                        <li>Session hijacking</li>
                        <li>Man-in-the-middle attacks</li>
                        <li>Application vulnerabilities</li>
                        <li>Misconfigured cloud settings</li>
                        <li>Unpatched software</li>
                        <li>Malware infections</li>
                        <li>Dark Web exploits</li>
                        <li>Zero-Day Exploits</li>
                        <li>Lateral movement from breach</li>
                        <li>Insider threats</li>
                        <li>Supply chain attacks</li>
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>Antivirus/Antimalware Solutions</li>
                        <li>Firewalls</li>
                        <li>Intrusion Detection Systems (IDS) / Intrusion Prevention Systems (IPS)</li>
                        <li>Security Information and Event Management (SIEM)</li>
                        <li>Security Orchestration, Automation, and Response (SOAR)</li>
                        <li>Data Loss Prevention (DLP)</li>
                        <li>Endpoint Detection and Response (EDR)</li>
                        <li>Threat Intelligence Platforms</li>                        
                      </ul>
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '12px', verticalAlign: 'top' }}>
                      <ul>
                        <li>STRIDE (Attack Method Classification)</li>
                        <li>STRIDE+ (Extended Attack Categories)</li>
                        <li>PASTA (Attack Simulation & Analysis)</li>
                        <li>OCTAVE (Vulnerability Evaluation)</li>
                        <li>VAST (Visual Attack Modeling)</li>
                        <li>CVSS Scoring Methodology</li>
                        <li>DREAD (Exploitability Assessment)</li>
                        <li>MITRE ATT&CK (Attack Techniques)</li>
                        <li>Cyber Kill Chains</li>
                        <li>Attack Trees</li>
                        <li>CVE-CWE (Vulnerability & Weakness Mapping)</li>
                        <li>Security Cards (Attack Methods)</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>

        <div className="tm-intro-guidance-container">
          <div
            className="tm-intro-guidance-toggle"
            onClick={() => setShowImplementationGuidance(!showImplementationGuidance)}
          >
            <h3 className="tm-intro-guidance-title">
              Further Reading & Implementation Guidance
            </h3>
            <span className="tm-intro-guidance-toggle-icon">
              {showImplementationGuidance ? "−" : "+"}
            </span>
          </div>
          {showImplementationGuidance && (
            <div className="tm-intro-guidance-content">

              {/* CVSS Information */}
              <h3 role="doc-subtitle" style={{marginTop: '2em'}}>📝 Common Vulnerability Scoring System (CVSS)</h3>
              <p>
                The <strong>Common Vulnerability Scoring System (CVSS)</strong> is an open framework for rating the severity of security vulnerabilities in software, and is complementary to threat modeling. CVSS helps to answer "What are we going to do about that?"
              </p>
              <p>
                CVSS provides a standardized way to capture the principal characteristics of a vulnerability and produce a numerical score reflecting its severity, which can then be translated into a qualitative representation (such as low, medium, high, or critical).
              </p>
              <ul>
                <li><strong>What:</strong> CVSS scores are widely used by security professionals, vendors, and organisations to prioritize vulnerability remediation and communicate risk.</li>
                <li><strong>How:</strong> The score is calculated based on several metrics, including exploitability, impact, and the context in which the vulnerability exists (e.g., network, adjacent, local).</li>
                <li><strong>Why:</strong> Using CVSS helps organisations consistently assess and compare vulnerabilities, supporting effective risk management and resource allocation.</li>
                <li><strong>Reference:</strong> <a href="https://www.first.org/cvss/" target="_blank" rel="noopener noreferrer">CVSS Official Website</a></li>
              </ul>        

              {/* DORA & Threat Led Penetration Testing (TLPT) */}
              <h3 role="doc-subtitle" style={{marginTop: '2em'}}>🏦 DORA & Threat Led Penetration Testing (TLPT)</h3>
              <p>
                <strong>DORA (Digital Operational Resilience Act)</strong> is an EU regulation aimed at strengthening the IT security and operational resilience of financial entities. 
                DORA requires organisations to implement robust risk management, incident reporting, and digital resilience testing practices, including advanced threat-led testing.
              </p>
              <p>
                <strong>Threat Led Penetration Testing (TLPT)</strong> is a regulatory-driven approach to security testing, where simulated attacks are designed based on realistic threat intelligence and tailored to the organisation's risk profile. 
                TLPT is mandated by DORA and other financial sector regulations to ensure organisations can withstand sophisticated cyber threats.
              </p>
              <ul>
                <li><strong>Purpose:</strong> TLPT validates the effectiveness of security controls and incident response capabilities against real-world attack scenarios.</li>
                <li><strong>How:</strong> Tests are based on current threat intelligence, mapped to critical business services, and executed by independent teams (often called "red teams").</li>
                <li><strong>Why:</strong> TLPT helps organisations identify gaps, improve resilience, and meet regulatory requirements for operational resilience and cyber risk management.</li>
                <li><strong>Reference:</strong> <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R2554" target="_blank" rel="noopener noreferrer">EU DORA Regulation</a></li>
              </ul>

              {/* Other Threat Modeling Frameworks & Tools */}
              <h3 role="doc-subtitle" style={{marginTop: '2em'}}>🧩 Threat Modeling Frameworks & Tools</h3>
              <p>What to consider when selecting a threat modeling framework or tool:</p>
              <ol>
                <li><strong>Cost:</strong> Evaluate the total cost of ownership, including licensing, implementation, and maintenance costs.</li>
                <li><strong>Organisational Context:</strong> Consider the specific needs, goals, and risk appetite of your organisation when selecting a framework or tool.</li>
                <li><strong>Compliance:</strong> Ensure the framework or tool aligns with relevant compliance requirements, such as ISO/IEC 27001, NIST CSF, or industry-specific regulations.</li>
                <li><strong>Integration:</strong> Assess how well the framework or tool integrates with your existing security tools and processes, such as vulnerability management systems, SIEMs, and CI/CD pipelines.</li>
                <li><strong>Compatibility:</strong> Ensure the framework or tool is compatible with your existing technology stack, network environment, and security policies, and can work seamlessly with other tools and systems in your environment.</li>
                <li><strong>Scalability:</strong> Consider whether the framework or tool can scale with your organisation's growth and evolving threat landscape.</li>
                <li><strong>Usability:</strong> Evaluate the user-friendliness of the framework or tool, including the learning curve for your team and the availability of training resources. Does the tool promote collaboration and engagement? Does the tool support automated visualisations, reporting, and customisation options for assets and threat models?</li>
                <li><strong>Versioning:</strong> Choose frameworks and tools that support versioning and change management, allowing your team to track and manage changes to threat models over time.</li>
                <li><strong>Discovery:</strong> Assess the framework or tool's ability to facilitate the discovery of assets, vulnerabilities, and threats within your organisation. Does it identify data flows, trust boundaries, and components for threat modeling analysis?</li>
                <li><strong>Export:</strong> Consider the framework or tool's ability to export threat models and related documentation in various formats, such as PDF, XML, or JSON, to support collaboration and reporting.</li>
                <li><strong>Automation:</strong> Consider the level of automation offered by the framework or tool, including automated threat modeling, reporting, and integration with other security tools.</li>
                <li><strong>Threat Intelligence:</strong> Assess the framework or tool's ability to leverage threat intelligence feeds and data to enhance threat modeling efforts. Does it incorporate real-time threat data, vulnerability information, and attack patterns?</li>
                <li><strong>Support and Community:</strong> Consider the level of support available, including documentation, training, and community engagement, as well as local timezone support.</li>
              </ol>
              <p>
                The following frameworks may be worth considering depending on your organisation's needs and context:
              </p>
              
              <details>
              <summary><strong>Threat Modeling Frameworks:</strong></summary>
              <ul>                
                <details>
                  <summary><strong>Threat Modeling Manifesto</strong></summary>
                  <li>Set of principles and best practices for effective threat modeling, emphasizing collaboration, continuous improvement, and integration into the software development lifecycle. 
                    Asks four key questions to be answered by a threat modeler:</li>
                  <ul>
                    <li>What are we working on?</li>
                    <li>What can go wrong?</li>
                    <li>What are we going to do about it?</li>
                    <li>How did we do?</li>
                  </ul>
                  <li>Reference: <a href="https://www.threatmodelingmanifesto.org/">Threat Modeling Manifesto</a></li>
                </details>
                <details>
                  <summary><strong>CIA (Confidentiality, Integrity, Availability)</strong></summary>
                  <li>To get started if not familiar with threat modeling, consider starting with the CIA triad as a foundational framework and asking how each of these could be threatened.</li>
                  <li>Focuses on the three core principles of information security:</li>
                  <ul>
                    <li><strong>Confidentiality:</strong> Ensuring that sensitive information is only accessible to authorized individuals.</li>
                    <li><strong>Integrity:</strong> Maintaining the accuracy and completeness of data and preventing unauthorized modifications.</li>
                    <li><strong>Availability:</strong> Ensuring that information and resources are accessible to authorized users when needed.</li>
                  </ul>
                </details>                
                <details>
                  <summary><strong>OWASP SAMM (Software Assurance Maturity Model)</strong></summary>
                  <li>A framework that helps organisations assess and improve their software security posture through a set of best practices and guidelines. It is not a Threat Modeling framework, but supports Threat Modeling activities.</li>
                  <li>It includes a set of security practices organized into five business functions: Governance, Design, Implementation, Verification, and Operations.</li>
                  <li>Threat assessments are covered under the Design function.</li>
                  <li>Reference: <a href="https://owaspsamm.org/model/design/threat-assessment/">OWASP SAMM Threat Assessment</a></li>
                  <li>Reference: <a href="https://owasp.org/www-project-threat-model/">OWASP Threat Modeling Project</a></li>
                  <li>Reference: <a href="https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html">OWASP Threat Modeling Cheat Sheet</a></li>
                </details>
                <details>
                  <summary><strong>Cyber Kill Chains</strong></summary>
                  <li>Based on the concept of a "kill chain," which outlines the stages of an attack from initial reconnaissance to execution. 
                    Helps answer the question: "What can go wrong?" and is often used for operational threat modeling in conjunction with MITRE ATT&CK.</li>
                  <ul>
                    <li>Reconnaissance</li>
                    <li>Weaponization</li>
                    <li>Delivery</li>
                    <li>Exploitation</li>
                    <li>Installation</li>
                    <li>Command and Control</li>
                    <li>Actions on Objectives</li>
                  </ul>
                  <li>Reference: <a href="https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-security/kill-chain.html" target="_blank" rel="noopener noreferrer">Lockheed Martin Cyber Kill Chain</a></li>
                </details>
                <details>
                  <summary><strong>Hybrid Threat Modeling Method (hTMM)</strong></summary>
                  <li>A flexible approach that combines elements from various threat modeling methodologies to suit specific project needs.</li>
                  <ul>
                    <li>Combines STRIDE, Security Cards, and Personae Non Gratae (PnG) frameworks.</li>
                    <li>Identifies the system</li>
                    <li>Applies Security Cards based on developer's suggestions</li>
                    <li>Removes unlikely or unrealistic threat actor personas</li>
                    <li>Summarises the results of the analysis</li>
                    <li>Moves on to a formal risk assessment</li>
                  </ul>
                  <li>Reference: <a href="https://www.sei.cmu.edu/documents/2308/2018_004_001_516627.pdf" target="_blank" rel="noopener noreferrer">Hybrid Threat Modeling Method (hTMM)</a></li>
                </details>
                <details>
                  <summary><strong>STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)</strong></summary>
                  <li>A threat modeling framework that categorizes threats into six main types.</li>
                  <ul>
                    <li>Spoofing: Impersonating a user or system</li>
                    <li>Tampering: Modifying data or code</li>
                    <li>Repudiation: Denying an action or event</li>
                    <li>Information Disclosure: Exposing sensitive data</li>
                    <li>Denial of Service: Disrupting service availability</li>
                    <li>Elevation of Privilege: Gaining unauthorized access</li>
                  </ul>
                  <li>Reference: <a href="https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool" target="_blank" rel="noopener noreferrer">STRIDE Framework</a></li>
                </details>
                <details>
                  <summary><strong>STRIDE+ (STRIDE Plus)</strong></summary>
                  <li>An informal extension of the STRIDE framework that adds additional categories (as suggested in various threat modeling blogs and presentations) for more comprehensive threat modeling.</li>
                  <ul>
                    <li>Includes STRIDE categories</li>
                    <li>Plus additional categories such as:</li>
                    <ul>
                      <li>Privacy: Ensuring user data is protected and not misused</li>
                      <li>Compliance: Adhering to legal and regulatory requirements</li>
                      <li>Operational Risks: Addressing risks that could impact business operations</li>
                    </ul>
                  </ul>
                </details>
                <details>
                  <summary><strong>Security Cards</strong></summary>
                  <li>A card-based brainstorming technique that helps teams identify threats and vulnerabilities in a collaborative manner. Uses 42 cards to create threat scenarios based on:</li>
                  <ul>
                    <li>Human Impact: Considers the potential consequences and impact on individuals and organisations</li>
                    <li>Adversary Motivations: Understanding why an adversary would attack</li>
                    <li>Adversary Resources: Identifying what resources an adversary has at their disposal</li>
                    <li>Adversary Methods: Explores how an adversary might carry out an attack</li>
                  </ul>
                  <li>While the cards can be used in a number of ways, the suggested approach is to use them in a workshop setting to facilitate discussion and collaboration.</li>
                  <ul>
                    <li>Gather the team with diverse perspectives and expertise.</li>
                    <li>Explain the purpose of the Security Cards and how they can help identify threats.</li>
                    <li>Brainstorm potential threats, vulnerabilities, and attack scenarios using the cards as prompts.</li>
                    <li>Consider countermeasures and mitigation strategies for identified threats.</li>
                    <li>Document the identified threats, vulnerabilities, and mitigation strategies, and prioritize threats based on their potential impact and likelihood.</li>
                  </ul>
                  <li>Reference: <a href="https://securitycards.cs.washington.edu/index.html" target="_blank" rel="noopener noreferrer">Security Cards</a></li>
                </details>
                <details>
                  <summary><strong>Personae non Gratae (PnG)</strong></summary>
                  <li>Focuses on identifying and analyzing threat actors (personas), looking at their:</li>
                  <ul>
                    <li>Motivations: Understand the reasons behind an adversary's actions.</li>
                    <li>Psychology: Explore the mindset and behavioral patterns of the adversary.</li>
                    <li>Skills: Identify the capabilities and expertise of the adversary.</li>
                    <li>Goals: Determine the objectives the adversary aims to achieve.</li>
                  </ul>
                  <li>Reference: <a href="https://www.computer.org/csdl/magazine/so/2014/04/mso2014040028/13rRUwInvrl" target="_blank" rel="noopener noreferrer">How Well Do You Know Your Personae Non Gratae?</a></li>
                  <li>Reference: <a href="https://dl.acm.org/doi/fullHtml/10.1145/3544548.3581484" target="_blank" rel="noopener noreferrer">Models of Applied Privacy (MAP): A Persona Based Approach to Threat Modeling</a></li>
                </details>
                <details>
                  <summary><strong>LINDDUN</strong></summary>
                  <li>Specializes in privacy threat modeling, mapping threats to data flow diagrams and privacy concerns. Has a number of variations such as LINDDUN GO, LINDDUN PRO, and LINDDUN MAESTRO. LINDDUN is an acronym for 7 main privacy threat types:</li>
                  <ul>
                    <li><b>L</b>inking: Associating data items or user actions to learn more about an individual.</li>
                    <li><b>I</b>dentifying: Learning the identity of an individual.</li>
                    <li><b>N</b>on-repudiation: Being able to attribute a claim to an individual.</li>
                    <li><b>D</b>etecting: Deducing the involvement of an individual through observation.</li>
                    <li><b>D</b>ata disclosure: Excessively collecting, storing, processing, or sharing personal data.</li>
                    <li><b>U</b>nawareness and unintervenability: Insufficiently informing, involving, or empowering individuals in the processing of personal data.</li>
                    <li><b>N</b>on-compliance: Deviating from security and data management best practices, standards, and legislation.</li>
                  </ul>
                  <li>Reference: <a href="https://linddun.org/" target="_blank" rel="noopener noreferrer">LINDDUN Privacy Threat Modeling</a></li>
                </details>
                <details>
                  <summary><strong>PASTA (Process for Attack Simulation and Threat Analysis)</strong></summary>
                  <li>A risk-centric, seven-stage methodology that emphasizes business impact and attack simulation.</li>
                  <ul>
                    <li>Define Objectives</li>
                    <li>Define Technical Scope</li>
                    <li>Decompose Application</li>
                    <li>Analyse Threats</li>
                    <li>Vulnerability and Weakness Analysis</li>
                    <li>Model Attacks</li>
                    <li>Risk and Impact Analysis</li>
                  </ul>                
                  <li>Reference: <a href="https://cdn2.hubspot.net/hubfs/4598121/Content%20PDFs/VerSprite-PASTA-Threat-Modeling-Process-for-Attack-Simulation-Threat-Analysis.pdf" target="_blank" rel="noopener noreferrer">PASTA Threat Modeling</a></li>
                </details>
                <details>
                  <summary><strong>DREAD</strong></summary>
                  <li>While DREAD is primarily a risk assessment framework, it can be used in conjunction with threat modeling to prioritize threats based on their severity. Different organisations use different scores for each category, leading to variations in risk assessments.</li>
                  <ul>
                    <li>The following is one example mapping:</li>
                    <li>Damage Potential: The potential impact of the threat if it were to materialize.</li>
                      <ul>
                        <li>0: Nothing</li>
                        <li>3: Individual user data is compromised, affected or availability denied</li>
                        <li>5: All individual tenant data is compromised, affected or availability denied</li>
                        <li>6: All tenant data is compromised, affected or availability denied</li>
                        <li>7: Availability of a specific cloud controller components/service is denied</li>
                        <li>8: Availability of all cloud controller components is denied</li>
                        <li>9: Underlying cloud management and infrastructure data is compromised or affected</li>
                        <li>10: Complete system or data destruction, failure or compromise</li>
                      </ul>
                    <li>Reproducibility: How easily the threat can be reproduced by an attacker.</li>
                      <ul>
                        <li>0: Very hard or impossible, even for administrators. The vulnerability is unstable and statistically unlikey to be reliably exploited</li>
                        <li>5: One or two steps required, tooling / scripting readily available</li>
                        <li>10: Unauthenticated users can trivially and reliably exploit using only a web browser</li>
                      </ul>
                    <li>Exploitability: The ease with which the threat can be exploited.</li>
                      <ul>
                        <li>0: N/A Every vulnerability is exploitable, given time and effort. All scores should be 1-10</li>
                        <li>1: Even with direct knowledge of the vulnerability we do not see a viable path for exploitation</li>
                        <li>2: Advanced techniques required, custom tooling. Only exploitable by authenticated users</li>
                        <li>5: Exploit is available/understood, usable with only moderate skill by authenticated users</li>
                        <li>7: Exploit is available/understood, usable by non-authenticated users</li>
                        <li>10: A web browser can be used to exploit the vulnerability</li>
                      </ul>
                    <li>Affected Users: The number of users or systems that would be affected by the threat.</li>
                      <ul>
                        <li>0: No users affected</li>
                        <li>5: Specific to a given project </li>
                        <li>10: All users impacted</li>
                      </ul>
                    <li>Discoverability: How easily the threat can be discovered by an attacker, default to 10</li>
                      <ul>
                        <li>0: Very hard to impossible to detect even given access to source code and privilege access to running systems</li>
                        <li>5: Can figure it out by guessing or by monitoring network traces</li>
                        <li>8: Details of faults like this are already in the public domain and can be easily discovered using a search engine</li>
                        <li>10: The information is visible in the web browser address bar or in a form</li>
                      </ul>
                      <li>Risk = (DAMAGE + REPRODUCIBILITY + EXPLOITABILITY + AFFECTED USERS + DISCOVERABILITY) / 5 </li>               
                  </ul>
                  <li>Consideration: DREAD is a subjective measure for prioritising threats and may return inconsistent results.</li>
                  <li>Reference: <a href="https://wiki.openstack.org/wiki/Security/OSSA-Metrics#DREAD" target="_blank" rel="noopener noreferrer">OpenStack DREAD Threat Modeling</a></li>
                </details>
                <details>
                  <summary><strong>OCTAVE (Operationally Critical Threat, Asset, and Vulnerability Evaluation)</strong></summary>
                  <li>Focuses on organisational risk and asset-driven threat identification. Has a number of variations such as OCTAVE-S, OCTAVE Allegro, and OCTAVE FORTE.</li>
                  <ul>
                    <li>Components</li>
                      <ul>
                        <li>Assets</li>
                          <ul>
                            <li>Information</li>
                            <li>Infrastructure</li>
                            <li>People</li>
                          </ul>
                        <li>Threats</li>
                          <ul>
                            <li>External</li>
                            <li>Internal</li>
                          </ul>
                        <li>Current Practices</li>
                        <li>Organisation Vulnerabilities</li>
                        <li>Security Requirements</li>
                      </ul>
                    <li>Phases</li>
                      <ul>
                        <li>Build Asset-Based Threat Profiles (Organisation View)</li>
                        <li>Identify Threat Scenarios (Technological View)</li>
                        <li>Evaluate Risks (Strategy and Plan Development)</li>
                      </ul>
                  </ul>
                  <li>Consideration: Some find it too complex and time-consuming for practical use, while others believe it lacks sufficient guidance for implementation.</li>
                  <li>Reference: <a href="https://www.sei.cmu.edu/library/octave-related-assets/" target="_blank" rel="noopener noreferrer">OCTAVE Overview</a></li>
                </details>
                <details>
                  <summary><strong>Trike</strong></summary>
                  <li>Uses requirements-based modeling and risk management concepts to drive threat identification and analysis.</li>
                  <ul>
                    <li>Requirements Model</li>
                    <ul>
                      <li>Actors</li>
                      <li>Assets</li>
                      <li>Intended actions</li>
                      <li>Rules</li>
                      <li>Actor / Asset Action Matrix (CRUD mapping)</li>
                    </ul>
                    <li>Implemenation Model</li>
                    <ul>
                      <li>Intended Actions vs Supporting Operations and the State Machine </li>
                      <li>Data Flow Diagrams (DFDs)</li>
                      <li>Use Flows</li>
                    </ul>
                    <li>Threat Model</li>
                    <ul>
                      <li>Threat Generation</li>
                      <li>Attacks, Attack Trees, and the Attack Graph</li>
                      <li>Weaknesses</li>
                      <li>Vulnerabilities</li>
                      <li>Mitigations</li>
                      <li>Attack Libraries</li>
                    </ul>
                    <li>Risk Model</li>
                    <ul>
                      <li>Asset Values, Role Risks, Asset-Action Risks, and Threat Exposures</li>
                      <li>Weakness Probabilities and Mitigations</li>
                      <li>Vulnerability Probabilities and Exposures</li>
                      <li>Threat Risks</li>
                      <li>Using the Risk Model</li>
                    </ul>
                  </ul>
                  <li>Consideration: Development appears to be abandoned.</li>
                  <li>Reference: <a href="https://trike.sourceforge.net/home.shtml" target="_blank" rel="noopener noreferrer">Trike Framework</a></li>
                </details>
                <details>
                  <summary><strong>VAST (Visual, Agile, and Simple Threat)</strong></summary>
                  <li>Focuses on integrating threat modeling into agile development processes, using visual techniques to communicate threats effectively. Vendor owned framework and tooling.</li>
                  <ul>
                    <li>Based on four pillars</li>
                    <ul>
                      <li>Scalable</li>
                      <li>Automated</li>
                      <li>Integrated</li>
                      <li>Collaborative</li>
                    </ul>
                  </ul>
                  <li>Consideration: Vendor lock-in may be a concern.</li>
                  <li>Reference: <a href="https://threatmodeler.com/innovation-lab/vast/" target="_blank" rel="noopener noreferrer">ThreatModeler VAST</a></li>
                </details>
                <details>
                  <summary><strong>Attack Trees</strong></summary>
                  <li>Visual representation of potential attack paths, useful for understanding complex threats and their dependencies.</li>
                  <li>Creation of an attack tree involves some variation of the following steps:</li>
                  <ul>
                    <li>Identify the goal of the attacker, this becomes the root node of the tree.</li>
                    <li>Break down the goal into sub-goals and potential attack vectors, creating child nodes.</li>
                    <li>Continue this process recursively, adding nodes for each sub-goal and attack vector.</li>
                    <li>For each node in the attack tree, add attack techniques, strategies, or vulnerabilities that an attacker can utilise or exploit.</li>
                    <li>Analyse the tree to identify the likelihood and impact of each attack path</li>
                    <li>Identify potential mitigations for each attack path.</li>
                  </ul>
                  <li>Consideration: Requires significant expertise to create and analyze effectively, and not in common use today.</li>
                  <li>Reference: <a href="https://www.schneier.com/academic/archives/1999/12/attack_trees.html" target="_blank" rel="noopener noreferrer">Attack Trees</a></li>
                </details>
                <details>
                  <summary><strong>MITRE ATT&CK</strong></summary>
                  <li>A knowledge base of adversary tactics and techniques based on real-world observations, useful for threat modeling and incident response.</li>
                  <li>Reference: <a href="https://attack.mitre.org/">MITRE ATT&CK</a></li>
                </details>
                <details>
                  <summary><strong>CVE-CWE</strong></summary>
                  <li>A mapping of Common Vulnerabilities and Exposures (CVE) to Common Weakness Enumerations (CWE), helping teams understand and address security weaknesses.</li>
                  <li>Reference: <a href="https://www.cve.org/">CVE</a></li>
                  <li>Reference: <a href="https://cwe.mitre.org/">CVE-CWE Mapping</a></li>
                </details>
                <details>
                  <summary><strong>CWSS</strong></summary>
                  <li>Cybersecurity Weakness and Strengths (CWSS) is a framework for assessing and improving an organisation's security posture.</li>
                  <li>Reference: <a href="https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-framework/online-learning-center/cybersecurity-weakness-and-strengths-cwss">CWSS</a></li>
                </details>
              </ul>
              </details>
              <details>
                <summary><strong>Threat Modeling by Domain:</strong></summary>
              <ul>    
                <li><strong>Agile:</strong> Integrating threat modeling into agile development practices, focusing on iterative threat identification and mitigation throughout the development process.</li>
                <li><strong>DevSecOps:</strong> Embedding threat modeling into DevSecOps practices, ensuring security is considered at every stage of the software development lifecycle, from design to deployment.</li>
                <li><strong>Cloud Security:</strong> Adapting threat modeling techniques for cloud environments, focusing on shared responsibility models, multi-tenancy, and cloud-specific threats.</li>
                <li><strong>AI/ML Security:</strong> Considering the specific threats and vulnerabilities associated with artificial intelligence and machine learning systems, such as adversarial attacks, data poisoning, and model inversion.</li>
                <li><strong>IoT/OT Security:</strong> Addressing the challenges of threat modeling for Internet of Things (IoT) and Operational Technology (OT) environments, including device vulnerabilities, network security, and data privacy.</li>
                <li><strong>Network Security:</strong> Addressing the challenges of threat modeling for networked systems, including perimeter defenses, intrusion detection, and incident response.</li>
                <li><strong>Identity Security:</strong> Addressing the challenges of identity management and authentication, including identity theft, credential stuffing, and access control.</li>
                <li><strong>Privacy by Design:</strong> Integrating privacy considerations into threat modeling, ensuring that data protection and user privacy are prioritized throughout the development process.</li>
                <li><strong>Blockchain Security:</strong> Focusing on the unique security challenges of blockchain technology, including smart contract vulnerabilities, consensus attacks, and privacy concerns.</li>
                <li><strong>Application Security:</strong> Focusing on the security of software applications throughout their lifecycle, including secure coding practices, vulnerability management, and application testing.</li>
                <li><strong>Zero Trust Architecture:</strong> Applying threat modeling principles to zero trust environments, emphasizing continuous verification, least privilege access, and micro-segmentation.</li>
                <li><strong>Secure Software Development Lifecycle (SSDLC):</strong> Embedding threat modeling into the SSDLC, ensuring security is a core component of the software development process from requirements gathering to deployment and maintenance.</li>
              </ul>
              </details>
              <details>
                <summary><strong>Threat Modeling Tools:</strong></summary>
              <ul>
                <li><strong>OWASP Threat Dragon:</strong> Free, open-source tool for creating threat model diagrams and managing threats.</li>
                <ul>
                  <li>Open-source</li>
                  <li>Supports DFDs and STRIDE, LINDDUN, CIA, DIE, PLOT4ai</li>
                  <li>Reference: <a href="https://owasp.org/www-project-threat-dragon/">OWASP Threat Dragon</a></li>
                </ul>
                <li><strong>OWASP pytm:</strong> Pythonic threat modeling tool that allows for the creation of threat models using a code-based approach.</li>
                <ul>
                  <li>Open-source</li>
                  <li>Supports DFDs and STRIDE</li>
                  <li>Reference: <a href="https://owasp.org/www-project-pytm/">OWASP pytm</a></li>
                </ul>
                <li><strong>CAIRIS (Computer Aided Integration of Requirements and Information Security):</strong> Open-source tool for risk management and threat modeling, supporting various frameworks.</li>
                <ul>
                  <li>Open-source</li>
                  <li>Supports multiple threat modeling frameworks</li>
                  <li>Reference: <a href="https://cairis.org/">CAIRIS</a></li>
                </ul>
                <li><strong>Microsoft Threat Modeling Tool:</strong> Visual tool for STRIDE-based modeling, especially for DFDs.</li>
                <ul>
                  <li>Free</li>
                  <li>Supports DFDs and STRIDE</li>
                  <li>Reference: <a href="https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool">Microsoft Threat Modeling Tool</a></li>
                </ul>
                <li><strong>Threat Modelling Tool:</strong> A tool for creating and managing threat models throughout the software development lifecycle.</li>
                <ul>
                  <li>Free</li>
                  <li>Supports DFDs and STRIDE</li>
                  <li>Reference: <a href="https://threat-modeling.com/">Threat Modelling Tool</a></li>
                </ul>
                <li><strong>Attack Surface Analyzer:</strong> Tool for analyzing the attack surface of applications and identifying potential vulnerabilities.</li>
                <ul>
                  <li>Free</li>
                  <li>Reference: <a href="https://github.com/microsoft/attacksurfaceanalyzer">Attack Surface Analyzer</a></li>
                </ul>
                <li><strong>Attack Tree:</strong> A diagrammatic method for representing and analyzing the security of a system by modeling potential attacks.</li>
                <ul>
                  <li>Commercial / Some free Attack Trees</li>
                  <li>Supports attack trees</li>
                  <li>Reference: <a href="https://attacktree.online/">Attack Tree</a></li>
                </ul>
                <li><strong>SecuriCAD:</strong> Model-based security analysis and simulation tool.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://www.bitcyber.com.sg/foreseeti-securicad/">SecuriCAD</a></li>
                </ul>
                <li><strong>Varonis:</strong> Data security platform that provides threat detection and response capabilities.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://www.varonis.com/">Varonis</a></li>
                </ul>
                <li><strong>IriusRisk:</strong> Automated threat modeling and risk management.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://www.iriusrisk.com/">IriusRisk</a></li>
                </ul>
                <li><strong>SD Elements:</strong> Security requirements management tool that integrates with threat modeling.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://www.securitycompass.com/sdelements/">SD Elements</a></li>
                </ul>
                <li><strong>ThreatModeler:</strong> Enterprise tool for collaborative, automated threat modeling.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://threatmodeler.com/">ThreatModeler</a></li>
                </ul>
                <li><strong>Aria Advanced Threat Detection and Response (ADR):</strong> Comprehensive solution for advanced threat detection and response.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://www.ariacybersecurity.com/cybersecurity-products/aria-sds-advanced-detection-and-response/#">Aria ADR</a></li>
                </ul>
                <li><strong>Tutamen:</strong> Threat modeling tool focused on privacy and data protection.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://www.tutamantic.com/">Tutamen</a></li>
                </ul>
                <li><strong>Cisco Vulnerability Management:</strong> Comprehensive solution for identifying and managing vulnerabilities across the enterprise.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://www.cisco.com/c/en/us/products/security/vulnerability-management/index.html">Cisco Vulnerability Management</a></li>
                </ul>
                <li><strong>Exabeam:</strong> Security information and event management (SIEM) platform that provides advanced threat detection and response capabilities.</li>
                <ul>
                  <li>Commercial</li>
                  <li>Reference: <a href="https://www.exabeam.com/">Exabeam</a></li>
                </ul>
                <li><strong>draw.io:</strong> Diagramming tool that can be used for creating threat model diagrams with <strong>threat modeling Libraries</strong>.</li>
                <ul>
                  <li>Open-source</li>
                  <li>Supports DFDs</li>
                  <li>Reference: <a href="https://github.com/michenriksen/drawio-threatmodeling">draw.io Threat Modeling Libraries</a></li>
                </ul>
                <li><strong>Threagile:</strong> Tool for integrating threat modeling into agile development processes.</li>
                <ul>
                  <li>Open-source</li>
                  <li>Supports DFDs</li>
                  <li>Reference: <a href="https://threagile.io/">Threagile</a></li>
                </ul>
                <li><strong>AI-driven Threat Modeling-as-a-Code (TaaC-AI):</strong> Tool for automating threat modeling using AI techniques.</li>
                <ul>
                  <li>Open-source</li>
                  <li>Supports STRIDE</li>
                  <li>Reference: <a href="https://github.com/yevh/TaaC-AI">TaaC-AI</a></li>
                </ul>
                <li><strong>threat-composer:</strong> Tool for composing and visualizing threat models, AWS centric.</li>
                <ul>
                  <li>Open-source</li>
                  <li>Supports DFDs and STRIDE</li>
                  <li>Reference: <a href="https://github.com/awslabs/threat-composer/">threat-composer</a></li>
                </ul>
                <li><strong>ThreatSpec:</strong> A language for specifying threats in a structured way, allowing for automated analysis and integration with development workflows.</li>
                <ul>
                  <li>Open-source</li>
                  <li>Reference: <a href="https://threatspec.org/">ThreatSpec</a></li>
              </ul>
              </ul>
              </details>
              <details>
              <summary><strong>Threat Modeling Best Practices:</strong></summary>
              <ul>
                <li>Start simple, focus on the most critical assets and threats first.</li>
                <li>Involve cross-functional teams (developers, security, operations) in the threat modeling process.</li>
                <li>Use visual aids like data flow diagrams (DFDs) to clarify system architecture and data flows.</li>
                <li>Regularly review and update threat models as systems evolve or new threats emerge.</li>
                <li>Prioritize threats based on risk assessment and business impact.</li>
                <li>Integrate threat modeling into the software development lifecycle (SDLC) for continuous improvement.</li>
                <li>Document findings and decisions to maintain a clear record of the threat modeling process.</li>
              </ul>
              </details>
              <p>
                Selection of frameworks and tools should be based on your organisation's maturity, regulatory requirements, and the specific context of your systems and business processes.
              </p>

              <h3 role="doc-subtitle" style={{marginTop: '2em'}}>⚠️ Important Considerations</h3>
              <p>
                  Threat modeling is not a one-time activity but an ongoing process that should be revisited regularly as systems change and new threats emerge. 
                  It is essential to integrate threat modeling into the software development lifecycle (SDLC) and ensure that it is a collaborative effort involving all relevant stakeholders.
              </p>
              <p>
                  The effectiveness of threat modeling depends on the quality of the information gathered, the expertise of the team involved, and the commitment to addressing identified threats. 
                  It is important to foster a culture of security awareness and continuous improvement within the organisation.   
              </p>
              <p>
                  Threat modeling is a critical component of a comprehensive security strategy and should be used in conjunction with other security practices such as secure coding, vulnerability management, and incident response planning.
              </p>
              <p>
                  By proactively identifying and addressing potential threats, organisations can significantly reduce their risk exposure and enhance the overall security posture of their systems.
              </p>
          </div>
          )}
        </div>

        <p>
            <strong>Note:</strong> This form is a simplified version of a threat modeling process and may not cover all aspects of a comprehensive threat model. 
            It is recommended to use this form in conjunction with other security practices and frameworks. Subject to your organisation's specific requirements and context, also consider exploring Threat Modeling as a Service (TMaaS) offerings.
        </p>
        <p><b>Disclaimer:</b> The information provided here is for general informational purposes only and will require adaptation for specific businesses and maturity capabilities and is not intended as legal advice. 
          Please consult with a qualified legal professional for specific legal advice tailored to your situation.</p>
        <BackToTopButton />
        <hr />

        {/* SVG Modal */}
        {showSvgModal && (
          <div 
            className="tm-svg-modal-overlay" 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
            onClick={closeSvgModal}
          >
            <div 
              className="tm-svg-modal-content"
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                maxWidth: '90vw',
                maxHeight: '90vh',
                position: 'relative',
                overflow: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                borderBottom: '1px solid #dee2e6',
                paddingBottom: '10px'
              }}>
                <h3 style={{ margin: 0, color: '#003366' }}>Data Flow Diagram (DFD) Sample</h3>
                <button 
                  onClick={closeSvgModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '5px',
                    color: '#666'
                  }}
                  title="Close"
                >
                  ×
                </button>
              </div>

              {/* Zoom Controls */}
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginBottom: '20px',
                justifyContent: 'center'
              }}>
                <button 
                  onClick={zoomOut}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  title="Zoom Out"
                >
                  −
                </button>
                <button 
                  onClick={resetZoom}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  title="Reset Zoom"
                >
                  {Math.round(svgZoom * 100)}%
                </button>
                <button 
                  onClick={zoomIn}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  title="Zoom In"
                >
                  +
                </button>
              </div>

              {/* SVG Container */}
              <div style={{ 
                textAlign: 'center',
                overflow: 'auto',
                maxHeight: '60vh'
              }}>
                <svg 
                  width={300 * svgZoom} 
                  height={120 * svgZoom}
                  style={{ 
                    transform: `scale(${svgZoom})`,
                    transformOrigin: 'center',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                  }}
                >            
                  {/* Data Store */}
                  {/* Top border */}
                  <line x1="10" y1="45" x2="70" y2="45" stroke="#333" strokeWidth="2" />
                  {/* Bottom border */}
                  <line x1="10" y1="75" x2="70" y2="75" stroke="#333" strokeWidth="2" />
                  {/* Fill the rectangle area */}
                  <rect x="10" y="45" width="60" height="30" fill="#fff" stroke="none" />
                  <text x="40" y="65" fontSize="12" textAnchor="middle" fill="#000" >Data Store</text>

                  {/* Data Flow Arrow */}
                  <line x1="70" y1="60" x2="120" y2="60" stroke="#d0021b" strokeWidth="1" />
                  <polygon points="120,60 115,55 115,65" fill="#d0021b" />

                  {/* Process */}
                  <circle cx="145" cy="60" r="25" fill="#dfefca" stroke="#444" strokeWidth="0.5" />
                  <text x="145" y="65" fontSize="12" textAnchor="middle" fill="#000">Process</text>

                  {/* Data Flow Arrow */}
                  <line x1="170" y1="60" x2="220" y2="60" stroke="#d0021b" strokeWidth="1" />
                  <polygon points="220,60 215,55 215,65" fill="#d0021b" />

                  {/* External Entity */}
                  <rect x="220" y="40" width="40" height="40" fill="#f6caca" stroke="#444" strokeWidth="0.5" />
                  <text x="240" y="35" fontSize="12" textAnchor="middle">Entity</text>

                  {/* Trust Boundary */}
                  <line x1="195" y1="20" x2="195" y2="90" stroke="#9013fe" strokeWidth="2" strokeDasharray="6,4" />
                  <text x="195" y="100" fontSize="12" textAnchor="middle" fill="#9013fe">Trust Boundary</text>
                </svg>
              </div>

              {/* Legend */}
              <div style={{ 
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#003366' }}>DFD Elements:</h4>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li><strong>Data Store:</strong> Open-ended rectangles for data storage</li>
                  <li><strong>Process:</strong> Circles/ovals for data transformation</li>
                  <li><strong>External Entity:</strong> Squares/rectangles for external actors</li>
                  <li><strong>Data Flow:</strong> Arrows showing data movement</li>
                  <li><strong>Trust Boundary:</strong> Dashed lines between security domains</li>
                </ul>
              </div>
            </div>
          </div>
        )}
    </details>
  );
};

export default TMIntro;
