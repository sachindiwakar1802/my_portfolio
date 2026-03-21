import React from 'react';
import { Mail, Linkedin, Github, Briefcase, Cpu, Award } from 'lucide-react';
import profileImg from '../../assets/profile.png';

const AboutContent = () => (
  <div className="about-container">
    <div className="window-sidebar about-sidebar">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid #fff' }}>
          <img src={profileImg} alt="Kapil" width="100%" />
        </div>
        <h3 style={{ marginTop: '10px' }}>Kapil Diwakar</h3>
        <p style={{ fontSize: '12px', opacity: 0.9 }}>Software Engineer</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '5px', marginBottom: '10px' }}>Contact & Links</h4>
        <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
           <a href="mailto:hello@kapildiwakar.com" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14}/> Contact</a>
           <a href="https://linkedin.com/in/kapil-diwakar" target="_blank" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><Linkedin size={14}/> LinkedIn</a>
           <a href="https://github.com/kapildiwakar" target="_blank" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><Github size={14}/> GitHub</a>
        </div>
      </div>

      <div>
        <h4 style={{ borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '5px', marginBottom: '10px' }}>Top Skills</h4>
        <ul style={{ fontSize: '12px', paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
           <li>Node.js, Express, FastAPI</li>
           <li>React, JS, HTML/CSS</li>
           <li>MongoDB, MySQL</li>
           <li>Data Engineering & ETL</li>
        </ul>
      </div>
    </div>
    
    <div style={{ flex: 1, padding: '30px', overflowY: 'auto', color: '#333' }}>
      <h1 style={{ fontSize: '28px', color: '#245edb', borderBottom: '2px solid #245edb', paddingBottom: '10px', marginBottom: '20px' }}>Professional Profile</h1>
      
      <p style={{ lineHeight: '1.6', fontSize: '14px', marginBottom: '20px' }}>
        I am a <strong>full-stack developer</strong> and <strong>data-focused engineer</strong> with a background in Electronics & Communication Engineering. I specialize in building robust backend systems, dynamic frontends, and automated data processing pipelines.
      </p>

      <h3 style={{ color: '#245edb', display: 'flex', alignItems: 'center', gap: '10px', margin: '25px 0 15px' }}><Briefcase size={20} /> Experience</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h4 style={{ margin: 0, fontSize: '16px' }}>Research Intern - IIT Delhi</h4>
          <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>📍 Delhi, India</span>
        </div>
        <ul style={{ fontSize: '13px', marginTop: '10px', paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>Developed real-time data pipelines and sensor data acquisition systems.</li>
          <li>Integrated hardware and software using STM32 microcontrollers and embedded systems.</li>
        </ul>
      </div>

      <h3 style={{ color: '#245edb', display: 'flex', alignItems: 'center', gap: '10px', margin: '25px 0 15px' }}><Cpu size={20} /> Technical Arsenal</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '13px' }}>
        <div>
          <strong>Backend & APIs:</strong><br/>Node.js, Express, FastAPI, REST integrations
        </div>
        <div>
          <strong>Frontend:</strong><br/>React, HTML, CSS, JavaScript
        </div>
        <div>
          <strong>Data & DB:</strong><br/>MongoDB, MySQL, ETL Pipelines, Web Scraping (Python)
        </div>
        <div>
          <strong>Core CS:</strong><br/>DSA, OOP, DBMS, OS, Computer Networks, Gen AI Basics
        </div>
      </div>

      <h3 style={{ color: '#245edb', display: 'flex', alignItems: 'center', gap: '10px', margin: '25px 0 15px' }}><Award size={20} /> Leadership</h3>
      <p style={{ fontSize: '13px', lineHeight: '1.5' }}>
        <strong>President of Mental Health Club:</strong> Led a team to organize events and workshops promoting mental well-being, managing end-to-end event execution and cross-functional teams.
      </p>
    </div>
  </div>
);

export default AboutContent;
