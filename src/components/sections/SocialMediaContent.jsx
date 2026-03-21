import React from 'react';
import { Github, Linkedin, Instagram, MessageCircle, Mail } from 'lucide-react';

const SocialMediaContent = () => (
    <div style={{ padding: '30px', background: 'white', height: '100%', overflowY: 'auto', textAlign: 'center' }}>
      <h2 style={{ color: '#245edb', marginBottom: '30px' }}>Connect With Me</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <a href="https://github.com/Sachin-Diwakar" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '120px' }}>
          <Github size={48} />
          <strong style={{ marginTop: '10px' }}>GitHub</strong>
        </a>
        <a href="https://www.linkedin.com/in/sachin-diwakar-711204266/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#0077b5', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '120px' }}>
          <Linkedin size={48} />
          <strong style={{ marginTop: '10px' }}>LinkedIn</strong>
        </a>
        <a href="https://www.instagram.com/sachindiwakar1802/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#e4405f', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '120px' }}>
          <Instagram size={48} />
          <strong style={{ marginTop: '10px' }}>Instagram</strong>
        </a>
        <a href="https://wa.me/918700000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#25D366', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '120px' }}>
          <MessageCircle size={48} />
          <strong style={{ marginTop: '10px' }}>WhatsApp</strong>
        </a>
        <a href="mailto:sachindiwakar1802@gmail.com" style={{ textDecoration: 'none', color: '#ea4335', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '120px' }}>
          <Mail size={48} />
          <strong style={{ marginTop: '10px' }}>Email</strong>
        </a>
      </div>
    </div>
);

export default SocialMediaContent;
