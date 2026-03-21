import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { API_URL } from '../../config';

const PersonalContent = ({ journals, setJournals, isAdmin, onBack }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleCloudinaryUpload = () => {
    if (!window.cloudinary) return;
    const myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'demo', 
      uploadPreset: 'ml_default'
    }, (error, result) => { 
      if (!error && result && result.event === "success") { 
        setNewImage(result.info.secure_url);
      }
    });
    myWidget.open();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle) return;
    
    const res = await fetch(`${API_URL}/journals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent, image: newImage })
    });
    const saved = await res.json();
    setJournals([saved, ...journals]);
    setNewTitle('');
    setNewContent('');
    setNewImage('');
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    await fetch(`${API_URL}/journals/${id}`, { method: 'DELETE' });
    setJournals(journals.filter(j => j._id !== id));
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#ece9d8' }}>
      <div className="explorer-toolbar" style={{ display: 'flex', padding: '5px', background: '#ece9d8', borderBottom: '1px solid #ccc', gap: '10px' }}>
         <div className="toolbar-btn" style={{ fontSize: '11px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onBack}>
            <span style={{ color: 'green', fontWeight: 'bold' }}>←</span> Back
         </div>
      </div>
      
      {isAdmin && (
         <div style={{ padding: '10px', background: '#ece9d8', borderBottom: '1px solid #999', display: 'flex', gap: '10px' }}>
            <button className="xp-button" onClick={() => setShowForm(!showForm)}><Plus size={14} /> Add Entry</button>
         </div>
      )}

      <div style={{ flex: 1, padding: '20px', background: 'white', overflowY: 'auto' }}>
        <h1 style={{ color: '#245edb', borderBottom: '2px solid #245edb', paddingBottom: '10px', margin: '0 0 20px 0' }}>My Journal</h1>
        
        {showForm && isAdmin && (
          <form onSubmit={handleAdd} className="achievement-form" style={{ marginBottom: '20px' }}>
            <input placeholder="Title (e.g., My Coding Journey)" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
            <textarea placeholder="Write your thoughts..." value={newContent} onChange={e => setNewContent(e.target.value)} rows={4} />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input placeholder="Image URL (optional)" value={newImage} onChange={e => setNewImage(e.target.value)} style={{ flex: 1 }} />
                <button type="button" className="xp-button" onClick={handleCloudinaryUpload} style={{ background: '#245edb', color: 'white' }}>Upload Cloudinary</button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="xp-button" style={{ background: '#388e3c', color: 'white' }}>Save Entry</button>
              <button type="button" className="xp-button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {journals.map(j => (
            <div key={j._id} style={{ border: '1px solid #ddd', padding: '15px', background: '#f9f9f9', borderRadius: '5px', display: 'flex', gap: '20px' }}>
              {j.image && <img src={j.image} alt={j.title} style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '3px', border: '1px solid #ccc' }} />}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ color: '#245edb', margin: '0 0 5px 0' }}>{j.title}</h3>
                  {isAdmin && <Trash2 size={16} style={{ cursor: 'pointer', color: '#d32f2f' }} onClick={() => handleDelete(j._id)} />}
                </div>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '10px' }}>{j.date}</div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333', margin: 0 }}>{j.content}</p>
              </div>
            </div>
          ))}
          {journals.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>No journal entries yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalContent;
