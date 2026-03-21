import React from 'react';

const ResumeContent = ({ fuel }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    {fuel < 100 ? (
      <div style={{ padding: '40px', background: '#f5f5f5', border: '2px dashed #ccc', borderRadius: '8px' }}>
        <h3 style={{ color: '#d32f2f' }}>Fuel Tank Empty!</h3>
        <p style={{ marginTop: '10px' }}>Please explore the portfolio to fill the tank (interact for 100% fuel) to unlock the resume download.</p>
        <div style={{ marginTop: '20px', width: '200px', height: '20px', background: '#ddd', borderRadius: '10px', margin: '20px auto', overflow: 'hidden' }}>
          <div style={{ width: `${fuel}%`, height: '100%', background: 'linear-gradient(to right, #ff3d00, #ffea00, #00e676)' }}></div>
        </div>
        <p style={{ fontSize: '12px' }}>Current Fuel: {Math.round(fuel)}%</p>
      </div>
    ) : (
      <div className="resume-viewer" style={{ background: 'white', padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'left', boxShadow: '0 0 10px rgba(0,0,0,0.1)', color: '#333', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ borderBottom: '2px solid #245edb', paddingBottom: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#245edb' }}>KAPIL DIWAKAR</h1>
            <p style={{ margin: '5px 0' }}>Software Engineer | Full Stack Developer</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px' }}>
            <p>hello@kapildiwakar.com</p>
            <p>+91 8700XXXXXX</p>
            <p>Delhi, India</p>
          </div>
        </div>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#245edb', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>EXPERIENCE</h3>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Research Intern</span>
              <span>Jun 2023 – Dec 2023</span>
            </div>
            <div style={{ fontStyle: 'italic' }}>IIT Delhi</div>
            <ul style={{ fontSize: '13px', marginTop: '5px' }}>
              <li>Developed real-time data pipelines and sensor data acquisition systems.</li>
              <li>Integrated hardware and software using STM32 microcontrollers and embedded systems.</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#245edb', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>PROJECTS</h3>
          <div style={{ marginBottom: '10px' }}>
            <strong>AI Code Generator</strong> | React, Node, GenAI
            <p style={{ fontSize: '13px', margin: '2px 0' }}>Built a system that generates code snippets based on natural language prompts.</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Automated ETL Pipeline</strong> | Python, SQL
            <p style={{ fontSize: '13px', margin: '2px 0' }}>Streamlined data processing from multiple sources into a centralized database.</p>
          </div>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#245edb', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>SKILLS</h3>
          <p style={{ fontSize: '13px' }}>
            <strong>Languages:</strong> JavaScript (ES6+), Python, C++, SQL, HTML/CSS<br/>
            <strong>Frameworks:</strong> React, Node.js, Express, FastAPI, Flask<br/>
            <strong>Tools:</strong> Git, Docker, Cloudinary, MongoDB, MySQL, STM32
          </p>
        </section>

        <div style={{ marginTop: '30px', textAlign: 'center' }} className="no-print">
           <button className="xp-button" onClick={() => window.print()}>Print / Save PDF</button>
        </div>
      </div>
    )}
    <style>{`
      .xp-button {
        padding: 5px 15px;
        background: #eee;
        border: 1px solid #999;
        box-shadow: 1px 1px 0 #fff inset;
        cursor: pointer;
      }
      .xp-button:active { background: #ddd; box-shadow: none; }
      @media print {
        .no-print { display: none !important; }
        .resume-viewer { box-shadow: none !important; padding: 0 !important; }
      }
    `}</style>
  </div>
);

export default ResumeContent;
