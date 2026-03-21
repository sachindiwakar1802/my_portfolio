import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { API_URL } from '../../config';

const AchievementsContent = ({ achievements, setAchievements, isAdmin, onBack }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleCloudinaryUpload = () => {
    if (!window.cloudinary) {
      alert("Cloudinary script not loaded");
      return;
    }
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
    
    const res = await fetch(`${API_URL}/achievements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, description: newDesc, image: newImage })
    });
    const saved = await res.json();
    setAchievements([saved, ...achievements]);
    setNewTitle('');
    setNewDesc('');
    setNewImage('');
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;
    await fetch(`${API_URL}/achievements/${id}`, { method: 'DELETE' });
    setAchievements(achievements.filter(a => a._id !== id));
  };

  return (
    <div style={{ height: '100%', background: 'white', display: 'flex', flexDirection: 'column' }}>
      <div className="explorer-toolbar" style={{ display: 'flex', padding: '5px', background: '#ece9d8', borderBottom: '1px solid #ccc', gap: '10px' }}>
         <div className="toolbar-btn" style={{ fontSize: '11px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onBack}>
            <span style={{ color: 'green', fontWeight: 'bold' }}>←</span> Back
         </div>
      </div>
       {isAdmin && (
         <div style={{ padding: '10px', background: '#ece9d8', borderBottom: '1px solid #999', display: 'flex', gap: '10px' }}>
            <button className="xp-button" onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Plus size={14} /> Add New</button>
         </div>
       )}
       
       <div style={{ overflowY: 'auto', flex: 1 }} className="window-content">
          <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#245edb', borderBottom: '2px solid #245edb', paddingBottom: '10px', margin: '0 0 20px 0' }}>My Achievements</h1>
            
            {showForm && isAdmin && (
              <form onSubmit={handleAdd} className="achievement-form" style={{ marginBottom: '20px' }}>
                <input placeholder="Title (e.g., Won Hackathon)" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                <textarea placeholder="Description of your achievement..." value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={3} />
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input placeholder="Image URL (e.g., link to your pic)" value={newImage} onChange={e => setNewImage(e.target.value)} style={{ flex: 1 }} />
                  <button type="button" className="xp-button" onClick={handleCloudinaryUpload} style={{ background: '#245edb', color: 'white' }}>Upload Cloudinary</button>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="xp-button" style={{ background: '#388e3c', color: 'white' }}>Save Achievement</button>
                  <button type="button" className="xp-button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            )}

            <div className="achievement-list">
              {achievements.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>No achievements recorded yet.</p>}
              {achievements.map(a => (
                <div key={a._id} className="achievement-item">
                  <img src={a.image} alt={a.title} className="achievement-image" onError={(e) => e.target.src = "https://via.placeholder.com/100?text=Achievement"} />
                  <div className="achievement-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4>{a.title}</h4>
                      {isAdmin && <Trash2 size={16} style={{ cursor: 'pointer', color: '#d32f2f' }} onClick={() => handleDelete(a._id)} />}
                    </div>
                    <p>{a.description}</p>
                    <div className="achievement-date">{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
       </div>
    </div>
  );
};

export default AchievementsContent;
