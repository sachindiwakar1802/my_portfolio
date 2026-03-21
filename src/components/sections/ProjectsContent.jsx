import React, { useState } from 'react';
import { FolderCode, Code, Cpu, Database, Server, Search, Folder, Plus, Trash2 } from 'lucide-react';

import { API_URL } from '../../config';

const DEFAULTS = [
  { _id: 'd1', name: "AI Code Generator", date: "2024-03-10", size: "React, Node, GenAI", icon: 'Code', description: 'Generates code from natural language prompts.' },
  { _id: 'd2', name: "Voice-Controlled Wheelchair", date: "2023-11-20", size: "Embedded C, IoT", icon: 'Cpu', description: 'Voice-driven mobility assistant.' },
  { _id: 'd3', name: "Automated ETL Pipeline", date: "2024-01-15", size: "Python, SQL", icon: 'Database', description: 'Automated multi-source data pipeline.' },
  { _id: 'd4', name: "Real-time Sensor API", date: "2023-08-05", size: "FastAPI, STM32", icon: 'Server', description: 'Live data acquisition and serving.' },
];

const ProjectsContent = ({ onBack, isAdmin, projects: externalProjects, setProjects: setExternalProjects }) => {
  // Fall back to defaults if no external projects provided
  const projects = externalProjects && externalProjects.length > 0 ? externalProjects : DEFAULTS;
  const setProjects = setExternalProjects || (() => {});

  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', date: '', size: '', icon: 'Code', url: '', description: '' });

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProject, date: new Date().toLocaleDateString() })
    });
    const saved = await res.json();
    setProjects([saved, ...projects.filter(p => !p._id?.startsWith('d'))]);
    setNewProject({ name: '', date: '', size: '', icon: 'Code', url: '', description: '' });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (id?.startsWith('d')) return; // Can't delete defaults
    if (!window.confirm("Delete this project?")) return;
    await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p._id !== id));
  };

  const getIcon = (name) => {
    const icons = { Code, Cpu, Database, Server, Folder, Search };
    const Icon = icons[name] || Code;
    return <Icon size={24} />;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <div className="explorer-toolbar" style={{ display: 'flex', padding: '5px', background: '#ece9d8', borderBottom: '1px solid #ccc', gap: '10px' }}>
         <div className="toolbar-btn" style={{ fontSize: '11px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onBack}>
            <span style={{ color: 'green', fontWeight: 'bold' }}>←</span> Back
         </div>
      </div>
      
      {isAdmin && (
         <div style={{ padding: '10px', background: '#ece9d8', borderBottom: '1px solid #999', display: 'flex', gap: '10px' }}>
            <button className="xp-button" onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Plus size={14} /> Add Project</button>
         </div>
      )}

      <div className="explorer-address" style={{ padding: '5px 10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', fontSize: '12px' }}>
         <strong>Address:</strong> C:\Users\Kapil\My Projects
      </div>
      
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h2 style={{ color: '#245edb', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}><FolderCode size={24} /> Featured Projects</h2>
        
        {showForm && isAdmin && (
          <form onSubmit={handleAdd} className="achievement-form" style={{ marginBottom: '20px' }}>
            <input placeholder="Project Name" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input placeholder="Technologies (e.g., React, Node)" value={newProject.size} onChange={e => setNewProject({...newProject, size: e.target.value})} style={{ flex: 1 }} />
              <select value={newProject.icon} onChange={e => setNewProject({...newProject, icon: e.target.value})} style={{ padding: '2px' }}>
                <option value="Code">Code Icon</option>
                <option value="Cpu">CPU Icon</option>
                <option value="Database">Database Icon</option>
                <option value="Server">Server Icon</option>
              </select>
            </div>
            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} rows={3} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="xp-button" style={{ background: '#388e3c', color: 'white' }}>Save Project</button>
              <button type="button" className="xp-button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={p._id || i} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', display: 'flex', alignItems: 'flex-start', gap: '15px', cursor: 'pointer', transition: 'background 0.2s', background: 'white', position: 'relative' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f8ff'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
              <div style={{ padding: '10px', background: '#eef4ff', borderRadius: '8px', color: '#245edb' }}>
                {getIcon(p.icon)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{p.name}</h4>
                  {isAdmin && <Trash2 size={14} style={{ cursor: 'pointer', color: '#d32f2f' }} onClick={(e) => { e.stopPropagation(); handleDelete(p._id); }} />}
                </div>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>{p.date || 'Recent'}</div>
                <div style={{ fontSize: '12px', background: '#eee', padding: '2px 6px', borderRadius: '10px', display: 'inline-block', marginBottom: '8px' }}>{p.size}</div>
                <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .explorer-toolbar { display: flex; padding: 5px; background: #ece9d8; border-bottom: 1px solid #ccc; gap: 10px; }
        .toolbar-btn { font-size: 11px; padding: 3px 8px; border: 1px solid transparent; cursor: pointer; display: flex; alignItems: center; gap: 5px; }
        .toolbar-btn:hover { border: 1px solid #999; background: #fff; }
        .project-card:hover { border-color: #245edb !important; }
      `}</style>
    </div>
  );
};

export default ProjectsContent;
